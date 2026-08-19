import pify from 'pify';

function compareStrings(a, b) {
  // https://stackoverflow.com/a/40355107/2168416
  return -(a < b) || +(a > b)
}

function dirname(path) {
  const last = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  if (last === -1) return '.'
  if (last === 0) return '/'
  return path.slice(0, last)
}

/**
 * Recursively creates the directory at `filepath`, creating any missing parent
 * directories along the way. This is a portable replacement for
 * `fs.mkdir(path, { recursive: true })`: recursive `mkdir` is NOT part of
 * isomorphic-git's required `fs` contract (see docs/fs.md — `mkdir` is only
 * `mkdir(path[, mode])`) and is unimplemented by some backends such as
 * lightning-fs, so we build it here on top of a single-level `mkdir(path)`
 * primitive only — mirroring how `rmRecursive` provides `rm({ recursive: true })`.
 *
 * It takes the raw single-level `mkdir` *function* (typically `fs._mkdir`)
 * rather than the FileSystem wrapper, to stay decoupled from that type.
 *
 * `EEXIST` is treated as success, so two callers concurrently creating the same
 * directory (e.g. several reflog writes into `.git/logs/refs/*` during a stash)
 * don't fail each other. On backends whose layers are only eventually
 * consistent — e.g. an async copy-on-write overlay — a just-created parent may
 * not yet be visible when its child is created, so `mkdir` can throw a
 * transient `ENOENT`; those are retried a bounded number of times rather than
 * surfaced as a spurious failure.
 *
 * @param {(filepath: string) => Promise<unknown>} mkdir - Creates a single directory (non-recursive).
 * @param {string} filepath - The directory to create.
 * @param {number} [retries=10] - Max transient-ENOENT retries after the parent exists.
 * @returns {Promise<void>}
 */
async function mkdirp(mkdir, filepath, retries = 10) {
  try {
    await mkdir(filepath);
  } catch (err) {
    // Some fs implementations signal success by yielding a null error.
    if (err === null) return
    // The directory already exists — that's fine.
    if (err.code === 'EEXIST') return
    // Anything other than a missing parent is a real error.
    if (err.code !== 'ENOENT') throw err
    const parent = dirname(filepath);
    // Stop if we've walked past the filesystem root.
    if (parent === '.' || parent === '/' || parent === filepath) throw err
    // Create the missing parent(s) first, honoring the same retry budget.
    await mkdirp(mkdir, parent, retries);
    // Then (re)create this directory. On an eventually-consistent backend the
    // parent may not be visible immediately after its mkdir resolves, so a
    // repeated ENOENT here is transient — retry a bounded number of times,
    // yielding between attempts so the pending write can settle.
    for (let attempt = 0; ; attempt++) {
      try {
        await mkdir(filepath);
        return
      } catch (err2) {
        if (err2 === null || err2.code === 'EEXIST') return
        if (err2.code === 'ENOENT' && attempt < retries) {
          // Give the backend a turn of the event loop to become consistent.
          await new Promise(resolve => setTimeout(resolve, 0));
          continue
        }
        throw err2
      }
    }
  }
}

/*!
 * This code for `path.join` is directly copied from @zenfs/core/path for bundle size improvements.
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright (c) James Prevett and other ZenFS contributors.
 *
 * Windows support added:
 *   - Backslashes are normalised to forward slashes before processing.
 *   - Drive-letter prefixes (e.g. "C:") are detected and preserved through
 *     normalisation, so absolute Windows paths are handled correctly.
 *   - An absolute argument passed to join() resets the accumulated path,
 *     matching Node behaviour and handling worktree gitdir paths properly.
 *
 * Limitation: UNC paths (e.g. \\server\share) are not supported. The leading
 *   backslashes are normalised to forward slashes and then collapsed by
 *   normalizeString, losing the UNC root. Git on Windows works with
 *   drive-letter paths, so this is not expected to be a practical issue.
 */

function normalizeString(path, aar) {
  let res = '';
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = '\x00';
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) char = path[i];
    else if (char === '/') break
    else char = '/';

    if (char === '/') {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (dots === 2) {
        if (
          res.length < 2 ||
          lastSegmentLength !== 2 ||
          res.at(-1) !== '.' ||
          res.at(-2) !== '.'
        ) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex === -1) {
              res = '';
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
            }
            lastSlash = i;
            dots = 0;
            continue
          } else if (res.length !== 0) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue
          }
        }
        if (aar) {
          res += res.length > 0 ? '/..' : '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (char === '.' && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res
}

// Returns the Windows drive prefix ("C:") if present, otherwise null.
function getWindowsDrivePrefix(path) {
  if (path.length >= 2 && /^[a-zA-Z]:/.test(path)) {
    return path.slice(0, 2) // e.g. "C:"
  }
  return null
}

function normalize(path) {
  if (!path.length) return '.'

  // Normalise backslashes to forward slashes before any other processing.
  path = path.replace(/\\/g, '/');

  const drivePrefix = getWindowsDrivePrefix(path);
  // isAbsolute: Unix root ('/foo') OR Windows drive+slash ('C:/foo').
  const isAbsolute =
    path[0] === '/' || (drivePrefix !== null && path[2] === '/');
  const trailingSeparator = path.at(-1) === '/';

  // Strip the drive prefix before feeding into normalizeString so that the
  // core algorithm only ever sees a plain POSIX-style string.
  const pathBody = drivePrefix ? path.slice(2) : path;

  let normalized = normalizeString(pathBody, !isAbsolute);

  if (!normalized.length) {
    const root = drivePrefix
      ? isAbsolute
        ? drivePrefix + '/'
        : drivePrefix
      : isAbsolute
        ? '/'
        : '.';
    return trailingSeparator && !isAbsolute ? root + '/' : root
  }
  if (trailingSeparator) normalized += '/';

  if (drivePrefix) {
    return isAbsolute
      ? `${drivePrefix}/${normalized}`
      : `${drivePrefix}${normalized}`
  }
  return isAbsolute ? `/${normalized}` : normalized
}

function join(...args) {
  if (args.length === 0) return '.'
  let joined;
  for (let i = 0; i < args.length; ++i) {
    // Normalise separators before processing.
    const arg = args[i].replace(/\\/g, '/');
    if (arg.length === 0) continue

    // A Windows drive-letter path (e.g. "C:/worktrees/foo") cannot be
    // meaningfully appended to any base, so it resets the accumulator.
    // Unix absolute paths (leading '/') are NOT reset here — that would be
    // path.resolve() semantics; path.join('foo', '/bar') must yield 'foo/bar'.
    if (/^[a-zA-Z]:\//.test(arg)) {
      joined = arg;
    } else {
      if (joined === undefined) joined = arg;
      else joined += '/' + arg;
    }
  }
  if (joined === undefined) return '.'
  return normalize(joined)
}

/**
 * Removes the directory at the specified filepath recursively. Used internally to replicate the behavior of
 * fs.promises.rm({ recursive: true, force: true }) from Node.js 14 and above when not available. If the provided
 * filepath resolves to a file, it will be removed.
 *
 * @param {import('../models/FileSystem.js').FileSystem} fs
 * @param {string} filepath - The file or directory to remove.
 */
async function rmRecursive(fs, filepath) {
  const entries = await fs.readdir(filepath);
  if (entries == null) {
    await fs.rm(filepath);
  } else if (entries.length) {
    await Promise.all(
      entries.map(entry => {
        const subpath = join(filepath, entry);
        return fs.lstat(subpath).then(stat => {
          if (!stat) return
          return stat.isDirectory() ? rmRecursive(fs, subpath) : fs.rm(subpath)
        })
      })
    ).then(() => fs.rmdir(filepath));
  } else {
    await fs.rmdir(filepath);
  }
}

function isPromiseLike(obj) {
  return isObject(obj) && isFunction(obj.then) && isFunction(obj.catch)
}

function isObject(obj) {
  return obj && typeof obj === 'object'
}

function isFunction(obj) {
  return typeof obj === 'function'
}

function isPromiseFs(fs) {
  const test = targetFs => {
    try {
      // If readFile returns a promise then we can probably assume the other
      // commands do as well
      return targetFs.readFile().catch(e => e)
    } catch (e) {
      return e
    }
  };
  return isPromiseLike(test(fs))
}

// List of commands all filesystems are expected to provide. `rm` is not
// included since it may not exist and must be handled as a special case
// Likewise with `cp`.
const commands = [
  'readFile',
  'writeFile',
  'mkdir',
  'rmdir',
  'unlink',
  'stat',
  'lstat',
  'readdir',
  'readlink',
  'symlink',
];

function bindFs(target, fs) {
  if (isPromiseFs(fs)) {
    for (const command of commands) {
      target[`_${command}`] = fs[command].bind(fs);
    }
  } else {
    for (const command of commands) {
      target[`_${command}`] = pify(fs[command].bind(fs));
    }
  }

  // Handle the special cases of `rm` and `cp`
  if (isPromiseFs(fs)) {
    if (fs.cp) target._cp = fs.cp.bind(fs);
    if (fs.rm) target._rm = fs.rm.bind(fs);
    else if (fs.rmdir.length > 1) target._rm = fs.rmdir.bind(fs);
    else target._rm = rmRecursive.bind(null, target);
  } else {
    if (fs.cp) target._cp = pify(fs.cp.bind(fs));
    if (fs.rm) target._rm = pify(fs.rm.bind(fs));
    else if (fs.rmdir.length > 2) target._rm = pify(fs.rmdir.bind(fs));
    else target._rm = rmRecursive.bind(null, target);
  }
}

/**
 * A wrapper class for file system operations, providing a consistent API for both promise-based
 * and callback-based file systems. It includes utility methods for common file system tasks.
 */
class FileSystem {
  /**
   * Creates an instance of FileSystem.
   *
   * @param {Object} fs - A file system implementation to wrap.
   */
  constructor(fs) {
    if (typeof fs._original_unwrapped_fs !== 'undefined') return fs

    const promises = Object.getOwnPropertyDescriptor(fs, 'promises');
    if (promises && promises.enumerable) {
      bindFs(this, fs.promises);
    } else {
      bindFs(this, fs);
    }
    this._original_unwrapped_fs = fs;
  }

  /**
   * Return true if a file exists, false if it doesn't exist.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filepath - The path to the file.
   * @param {Object} [options] - Additional options.
   * @returns {Promise<boolean>} - `true` if the file exists, `false` otherwise.
   */
  async exists(filepath, options = {}) {
    try {
      await this._stat(filepath);
      return true
    } catch (err) {
      if (
        err.code === 'ENOENT' ||
        err.code === 'ENOTDIR' ||
        (err.code || '').includes('ENS')
      ) {
        return false
      } else {
        console.log('Unhandled error in "FileSystem.exists()" function', err);
        throw err
      }
    }
  }

  /**
   * Return the contents of a file if it exists, otherwise returns null.
   *
   * @param {string} filepath - The path to the file.
   * @param {Object} [options] - Options for reading the file.
   * @returns {Promise<Buffer|string|null>} - The file contents, or `null` if the file doesn't exist.
   */
  async read(filepath, options = {}) {
    try {
      let buffer = await this._readFile(filepath, options);
      if (options.autocrlf === 'true') {
        try {
          buffer = new TextDecoder('utf8', { fatal: true }).decode(buffer);
          buffer = buffer.replace(/\r\n/g, '\n');
          buffer = new TextEncoder().encode(buffer);
        } catch (error) {
          // non utf8 file
        }
      }
      // Convert plain ArrayBuffers to Buffers
      if (typeof buffer !== 'string') {
        buffer = Buffer.from(buffer);
      }
      return buffer
    } catch (err) {
      return null
    }
  }

  /**
   * Write a file (creating missing directories if need be) without throwing errors.
   *
   * @param {string} filepath - The path to the file.
   * @param {Buffer|Uint8Array|string} contents - The data to write.
   * @param {Object|string} [options] - Options for writing the file.
   * @returns {Promise<void>}
   */
  async write(filepath, contents, options = {}) {
    try {
      await this._writeFile(filepath, contents, options);
    } catch (err) {
      // Hmm. Let's try mkdirp and try again.
      await this.mkdir(dirname(filepath));
      await this._writeFile(filepath, contents, options);
    }
  }

  /**
   * Make a directory (or series of nested directories) without throwing an error if it already exists.
   *
   * @param {string} filepath - The path to the directory.
   * @returns {Promise<void>}
   */
  async mkdir(filepath) {
    // Recursively create the directory, using only single-level `_mkdir` so we
    // don't depend on `{ recursive: true }` (which isn't part of the required
    // `fs` contract — see docs/fs.md — and is unimplemented by some backends
    // e.g. lightning-fs). The helper tolerates EEXIST and the transient ENOENT
    // that eventually-consistent backends throw when a freshly created parent
    // isn't visible yet, which is what made concurrent reflog writes into
    // `.git/logs/refs/*` fail intermittently.
    await mkdirp(this._mkdir, filepath);
  }

  /**
   * Delete a file without throwing an error if it is already deleted.
   *
   * @param {string} filepath - The path to the file.
   * @returns {Promise<void>}
   */
  async rm(filepath) {
    try {
      await this._unlink(filepath);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
    }
  }

  /**
   * Delete a directory without throwing an error if it is already deleted.
   *
   * @param {string} filepath - The path to the directory.
   * @param {Object} [opts] - Options for deleting the directory.
   * @returns {Promise<void>}
   */
  async rmdir(filepath, opts) {
    try {
      if (opts && opts.recursive) {
        await this._rm(filepath, opts);
      } else {
        await this._rmdir(filepath);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
    }
  }

  /**
   * Read a directory without throwing an error is the directory doesn't exist
   *
   * @param {string} filepath - The path to the directory.
   * @returns {Promise<string[]|null>} - An array of file names, or `null` if the path is not a directory.
   */
  async readdir(filepath) {
    try {
      const names = await this._readdir(filepath);
      // Ordering is not guaranteed, and system specific (Windows vs Unix)
      // so we must sort them ourselves.
      names.sort(compareStrings);
      return names
    } catch (err) {
      if (err.code === 'ENOTDIR') return null
      return []
    }
  }

  /**
   * Return a flat list of all the files nested inside a directory
   *
   * Based on an elegant concurrent recursive solution from SO
   * https://stackoverflow.com/a/45130990/2168416
   *
   * @param {string} dir - The directory to read.
   * @returns {Promise<string[]>} - A flat list of all files in the directory.
   */
  async readdirDeep(dir) {
    const subdirs = await this._readdir(dir);
    const files = await Promise.all(
      subdirs.map(async subdir => {
        const res = dir + '/' + subdir;
        return (await this._stat(res)).isDirectory()
          ? this.readdirDeep(res)
          : res
      })
    );
    return files.reduce((a, f) => a.concat(f), [])
  }

  /**
   * Return the Stats of a file/symlink if it exists, otherwise returns null.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filename - The path to the file or symlink.
   * @returns {Promise<Object|null>} - The stats object, or `null` if the file doesn't exist.
   */
  async lstat(filename) {
    try {
      const stats = await this._lstat(filename);
      return stats
    } catch (err) {
      if (err.code === 'ENOENT' || (err.code || '').includes('ENS')) {
        return null
      }
      throw err
    }
  }

  /**
   * Reads the contents of a symlink if it exists, otherwise returns null.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filename - The path to the symlink.
   * @param {Object} [opts={ encoding: 'buffer' }] - Options for reading the symlink.
   * @returns {Promise<Buffer|null>} - The symlink target, or `null` if it doesn't exist.
   */
  async readlink(filename, opts = { encoding: 'buffer' }) {
    // Note: FileSystem.readlink returns a buffer by default
    // so we can dump it into GitObject.write just like any other file.
    try {
      const link = await this._readlink(filename, opts);
      return Buffer.isBuffer(link) ? link : Buffer.from(link)
    } catch (err) {
      if (err.code === 'ENOENT' || (err.code || '').includes('ENS')) {
        return null
      }
      throw err
    }
  }

  /**
   * Write the contents of buffer to a symlink.
   *
   * @param {string} filename - The path to the symlink.
   * @param {Buffer} buffer - The symlink target.
   * @returns {Promise<void>}
   */
  async writelink(filename, buffer) {
    return this._symlink(buffer.toString('utf8'), filename)
  }
}

export { FileSystem };
