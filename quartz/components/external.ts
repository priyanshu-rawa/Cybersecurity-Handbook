import { componentRegistry } from "./registry"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

export function External<Options extends object | undefined>(
  name: string,
  options?: Options,
): QuartzComponent {
  const registered = componentRegistry.get(name)
  if (!registered) {
    throw new Error(
      `External component "${name}" not found. ` +
        `Make sure the plugin is installed and components are loaded before layouts are evaluated.`,
    )
  }

  const { component } = registered

  if (typeof component === "function") {
    return (component as QuartzComponentConstructor<Options>)(options as Options)
  }

  return component as QuartzComponent
}
