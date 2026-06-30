import test, { describe } from "node:test"
import assert from "node:assert"
import { detectSlugCollisions, formatCollisionWarning } from "./slugCollisions"
import { ProcessedContent } from "../plugins/vfile"
import { FilePath, FullSlug } from "./path"

function makeContent(
  entries: Array<{ slug: string; relativePath?: string; filePath?: string }>,
): ProcessedContent[] {
  return entries.map((e) => {
    const vfile = {
      data: {
        slug: e.slug as FullSlug,
        relativePath: (e.relativePath ?? `${e.slug}.md`) as FilePath,
        filePath: (e.filePath ?? `/vault/${e.relativePath ?? `${e.slug}.md`}`) as FilePath,
      },
    }
    return [{ type: "root", children: [] }, vfile] as unknown as ProcessedContent
  })
}

describe("detectSlugCollisions", () => {
  test("returns empty array when there are no collisions", () => {
    const content = makeContent([{ slug: "alice" }, { slug: "bob" }, { slug: "characters/index" }])
    assert.deepStrictEqual(detectSlugCollisions(content), [])
  })

  test("returns empty array for empty input", () => {
    assert.deepStrictEqual(detectSlugCollisions([]), [])
  })

  test("detects a two-file collision with winner = last file", () => {
    const content = makeContent([
      { slug: "foo/index", relativePath: "foo/foo.md" },
      { slug: "foo/index", relativePath: "foo/index.md" },
    ])
    const collisions = detectSlugCollisions(content)
    assert.strictEqual(collisions.length, 1)
    assert.strictEqual(collisions[0]!.slug, "foo/index")
    assert.strictEqual(collisions[0]!.files.length, 2)
    assert.strictEqual(collisions[0]!.winner.relativePath, "foo/index.md")
    assert.strictEqual(collisions[0]!.files[0]!.relativePath, "foo/foo.md")
    assert.strictEqual(collisions[0]!.files[1]!.relativePath, "foo/index.md")
  })

  test("detects a three-file collision with all files listed, winner = last", () => {
    const content = makeContent([
      { slug: "bar/index", relativePath: "bar/_index.md" },
      { slug: "bar/index", relativePath: "bar/bar.md" },
      { slug: "bar/index", relativePath: "bar/index.md" },
    ])
    const collisions = detectSlugCollisions(content)
    assert.strictEqual(collisions.length, 1)
    assert.strictEqual(collisions[0]!.files.length, 3)
    assert.strictEqual(collisions[0]!.winner.relativePath, "bar/index.md")
  })

  test("detects multiple separate collisions", () => {
    const content = makeContent([
      { slug: "a/index", relativePath: "a/a.md" },
      { slug: "a/index", relativePath: "a/index.md" },
      { slug: "b/index", relativePath: "b/b.md" },
      { slug: "b/index", relativePath: "b/index.md" },
      { slug: "unique" },
    ])
    const collisions = detectSlugCollisions(content)
    assert.strictEqual(collisions.length, 2)
    const slugs = collisions.map((c) => c.slug).sort()
    assert.deepStrictEqual(slugs, ["a/index", "b/index"])
  })

  test("ignores entries without a slug", () => {
    const content: ProcessedContent[] = [
      ...makeContent([{ slug: "alice" }]),
      [
        { type: "root", children: [] },
        { data: { slug: undefined, relativePath: "broken.md" } },
      ] as unknown as ProcessedContent,
    ]
    assert.deepStrictEqual(detectSlugCollisions(content), [])
  })

  test("winner annotation matches fileTrie last-insert-wins semantics", () => {
    // Glob order is alphabetical: foo/foo.md sorts before foo/index.md.
    // Both the fileTrie and this detector must agree that the second file wins.
    const content = makeContent([
      { slug: "foo/index", relativePath: "foo/foo.md" },
      { slug: "foo/index", relativePath: "foo/index.md" },
    ])
    const collisions = detectSlugCollisions(content)
    assert.strictEqual(collisions[0]!.winner.relativePath, "foo/index.md")
  })
})

describe("formatCollisionWarning", () => {
  test("returns empty string for empty input", () => {
    assert.strictEqual(formatCollisionWarning([]), "")
  })

  test("formats single collision with winner and shadowed markers", () => {
    const content = makeContent([
      { slug: "foo/index", relativePath: "foo/foo.md" },
      { slug: "foo/index", relativePath: "foo/index.md" },
    ])
    const collisions = detectSlugCollisions(content)
    const output = formatCollisionWarning(collisions)
    assert.match(output, /1 slug collision detected/)
    assert.match(output, /foo\/index/)
    assert.match(output, /foo\/foo\.md .*\(shadowed\)/)
    assert.match(output, /foo\/index\.md .*\(used for this URL\)/)
  })

  test("formats multiple collisions with count in header", () => {
    const content = makeContent([
      { slug: "a/index", relativePath: "a/a.md" },
      { slug: "a/index", relativePath: "a/index.md" },
      { slug: "b/index", relativePath: "b/b.md" },
      { slug: "b/index", relativePath: "b/index.md" },
    ])
    const collisions = detectSlugCollisions(content)
    const output = formatCollisionWarning(collisions)
    assert.match(output, /2 slug collisions detected/)
    assert.match(output, /a\/index/)
    assert.match(output, /b\/index/)
  })

  test("output mentions Folder Notes convention as a common cause", () => {
    const content = makeContent([
      { slug: "foo/index", relativePath: "foo/foo.md" },
      { slug: "foo/index", relativePath: "foo/index.md" },
    ])
    const output = formatCollisionWarning(detectSlugCollisions(content))
    assert.match(output, /Folder Notes/)
  })

  test("falls back to filePath when relativePath is missing", () => {
    const content = makeContent([
      { slug: "x/index", relativePath: "", filePath: "/vault/x/x.md" },
      { slug: "x/index", relativePath: "", filePath: "/vault/x/index.md" },
    ])
    const output = formatCollisionWarning(detectSlugCollisions(content))
    assert.match(output, /\/vault\/x\/x\.md/)
    assert.match(output, /\/vault\/x\/index\.md/)
  })
})
