import { ProcessedContent } from "../plugins/vfile"
import { FullSlug } from "./path"

/**
 * A slug collision: two or more source files that produce the same FullSlug
 * after slugifyFilePath. The `winner` is the file whose HTML output and trie
 * data represent this slug in the final build (see fileTrie.ts and the
 * emitter's last-write-wins semantics in plugins/emitters/helpers.ts).
 *
 * `files` is in the order the files appear in the parsed content array
 * (glob order), which is deterministic. `winner` is always the last entry.
 */
export interface SlugCollision {
  slug: FullSlug
  files: Array<{ relativePath: string; filePath: string }>
  winner: { relativePath: string; filePath: string }
}

export function detectSlugCollisions(content: ProcessedContent[]): SlugCollision[] {
  const bySlug = new Map<FullSlug, Array<{ relativePath: string; filePath: string }>>()

  for (const [, file] of content) {
    const slug = file.data.slug
    if (!slug) continue
    const entry = {
      relativePath: (file.data.relativePath ?? "") as string,
      filePath: (file.data.filePath ?? "") as string,
    }
    const existing = bySlug.get(slug)
    if (existing) {
      existing.push(entry)
    } else {
      bySlug.set(slug, [entry])
    }
  }

  const collisions: SlugCollision[] = []
  for (const [slug, files] of bySlug) {
    if (files.length < 2) continue
    collisions.push({
      slug,
      files,
      winner: files[files.length - 1]!,
    })
  }

  return collisions
}

/**
 * Format a list of collisions as a single human-readable warning block.
 * Returns an empty string when there are no collisions so callers can
 * unconditionally log the result.
 */
export function formatCollisionWarning(collisions: SlugCollision[]): string {
  if (collisions.length === 0) return ""

  const lines: string[] = []
  const header =
    collisions.length === 1
      ? `Warning: 1 slug collision detected.`
      : `Warning: ${collisions.length} slug collisions detected.`
  lines.push(header)
  lines.push(
    `Multiple source files produced the same URL slug. The last-processed file wins; the others are shadowed and their content will not appear in the output.`,
  )
  lines.push("")

  for (const collision of collisions) {
    lines.push(`  slug \`${collision.slug}\``)
    for (const file of collision.files) {
      const marker = file === collision.winner ? "(used for this URL)" : "(shadowed)"
      const path = file.relativePath || file.filePath || "(unknown source)"
      lines.push(`    - ${path} ${marker}`)
    }
    lines.push("")
  }

  lines.push(
    `To resolve, rename or delete all but one file per collided slug. This may include files using the Obsidian "Folder Notes" convention (\`folder/folder.md\`) that collide with an existing \`folder/index.md\`.`,
  )

  return lines.join("\n")
}
