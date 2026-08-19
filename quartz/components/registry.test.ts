import test, { describe, afterEach } from "node:test"
import assert from "node:assert"
import { ComponentRegistry } from "./registry"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const StubA = (() => null) as unknown as QuartzComponent
const StubB = (() => null) as unknown as QuartzComponent
StubA.displayName = "StubA"
StubB.displayName = "StubB"

const StubConstructor = ((opts?: any) => {
  const c = (() => null) as unknown as QuartzComponent
  c.displayName = opts?.name ?? "stub"
  return c
}) as unknown as QuartzComponentConstructor

let registry: ComponentRegistry | null = null

afterEach(() => {
  registry?.clear()
  registry = null
})

describe("register and get", () => {
  test("registers a component and retrieves it by name", () => {
    registry = new ComponentRegistry()
    registry.register("foo", StubA, "source")

    const result = registry.get("foo")
    assert.strictEqual(result?.component, StubA)
    assert.strictEqual(result?.source, "source")
  })

  test("returns undefined for unregistered names", () => {
    registry = new ComponentRegistry()
    const result = registry.get("nonexistent")
    assert.strictEqual(result, undefined)
  })

  test("overwrites component from different source", () => {
    registry = new ComponentRegistry()
    registry.register("foo", StubA, "src1")
    registry.register("foo", StubB, "src2")

    const result = registry.get("foo")
    assert.strictEqual(result?.component, StubB)
  })
})

describe("instantiate", () => {
  test("returns a component instance from a constructor", () => {
    registry = new ComponentRegistry()
    const instance = registry.instantiate(StubConstructor)
    assert.ok(instance)
    assert.strictEqual(typeof instance, "function")
  })

  test("caches instances by constructor + options", () => {
    registry = new ComponentRegistry()
    const first = registry.instantiate(StubConstructor)
    const second = registry.instantiate(StubConstructor)
    assert.strictEqual(first, second)
  })

  test("different options produce different instances", () => {
    registry = new ComponentRegistry()
    const first = registry.instantiate(StubConstructor, { a: 1 })
    const second = registry.instantiate(StubConstructor, { a: 2 })
    assert.notStrictEqual(first, second)
  })

  test("undefined options and no-arg call produce same cache key", () => {
    registry = new ComponentRegistry()
    const first = registry.instantiate(StubConstructor)
    const second = registry.instantiate(StubConstructor, undefined)
    assert.strictEqual(first, second)
  })
})

describe("getAllComponents", () => {
  test("deduplicates components registered under multiple names", () => {
    registry = new ComponentRegistry()
    registry.register("foo", StubConstructor, "source")
    registry.register("bar", StubConstructor, "source")

    const result = registry.getAllComponents()
    assert.strictEqual(result.length, 1)
  })

  test("reuses cached instance from prior instantiate call", () => {
    registry = new ComponentRegistry()
    registry.register("x", StubConstructor, "source")
    const instance = registry.instantiate(StubConstructor, { opt: 1 })

    const result = registry.getAllComponents()
    assert.strictEqual(result[0], instance)
  })

  test("skips components that fail to instantiate", () => {
    registry = new ComponentRegistry()
    const ThrowingConstructor = (() => {
      throw new Error("boom")
    }) as unknown as QuartzComponentConstructor

    registry.register("bad", ThrowingConstructor, "source")
    const result = registry.getAllComponents()
    assert.deepStrictEqual(result, [])
  })
})

describe("setOptionOverrides and cache invalidation", () => {
  test("stores and retrieves option overrides", () => {
    registry = new ComponentRegistry()
    registry.setOptionOverrides("plugin", { key: "val" })
    assert.deepStrictEqual(registry.getOptionOverrides("plugin"), { key: "val" })
  })

  test("merges with existing overrides", () => {
    registry = new ComponentRegistry()
    registry.setOptionOverrides("plugin", { a: 1 })
    registry.setOptionOverrides("plugin", { b: 2 })
    assert.deepStrictEqual(registry.getOptionOverrides("plugin"), { a: 1, b: 2 })
  })

  test("clears instance cache when overrides change", () => {
    registry = new ComponentRegistry()
    const first = registry.instantiate(StubConstructor, { name: "cached" })
    registry.setOptionOverrides("anything", { trigger: true })
    const second = registry.instantiate(StubConstructor, { name: "cached" })
    assert.notStrictEqual(first, second)
  })

  test("ignores empty or undefined overrides", () => {
    registry = new ComponentRegistry()
    registry.setOptionOverrides("plugin", {})
    assert.strictEqual(registry.getOptionOverrides("plugin"), undefined)
    registry.setOptionOverrides("plugin", undefined)
    assert.strictEqual(registry.getOptionOverrides("plugin"), undefined)
  })
})
