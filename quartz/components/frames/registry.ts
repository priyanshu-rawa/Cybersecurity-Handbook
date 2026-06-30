import { PageFrame } from "./types"

export interface RegisteredFrame {
  frame: PageFrame
  source: string
}

class FrameRegistry {
  private frames = new Map<string, RegisteredFrame>()

  register(name: string, frame: PageFrame, source: string): void {
    const existing = this.frames.get(name)
    if (existing && existing.source !== source) {
      console.warn(
        `Page frame "${name}" from ${source} is overwriting frame from ${existing.source}`,
      )
    }
    this.frames.set(name, { frame, source })
  }

  get(name: string): RegisteredFrame | undefined {
    return this.frames.get(name)
  }

  getAll(): Map<string, RegisteredFrame> {
    return new Map(this.frames)
  }

  has(name: string): boolean {
    return this.frames.has(name)
  }
}

export const frameRegistry = new FrameRegistry()
