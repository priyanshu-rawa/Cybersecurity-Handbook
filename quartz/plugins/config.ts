import {
  QuartzTransformerPluginInstance,
  QuartzFilterPluginInstance,
  QuartzEmitterPluginInstance,
  PageTypePluginEntry,
} from "./types"
import { LoadedPlugin } from "./loader/types"

export interface PluginConfiguration {
  transformers: (QuartzTransformerPluginInstance | LoadedPlugin)[]
  filters: (QuartzFilterPluginInstance | LoadedPlugin)[]
  emitters: (QuartzEmitterPluginInstance | LoadedPlugin)[]
  pageTypes?: (PageTypePluginEntry | LoadedPlugin)[]
}

export function isLoadedPlugin(plugin: unknown): plugin is LoadedPlugin {
  return (
    typeof plugin === "object" &&
    plugin !== null &&
    "plugin" in plugin &&
    "manifest" in plugin &&
    "type" in plugin &&
    typeof (plugin as LoadedPlugin).plugin === "function"
  )
}

export function getPluginInstance<T extends object | undefined>(
  plugin:
    | QuartzTransformerPluginInstance
    | QuartzFilterPluginInstance
    | QuartzEmitterPluginInstance
    | PageTypePluginEntry
    | LoadedPlugin,
  options?: T,
):
  | QuartzTransformerPluginInstance
  | QuartzFilterPluginInstance
  | QuartzEmitterPluginInstance
  | PageTypePluginEntry {
  if (isLoadedPlugin(plugin)) {
    const factory = plugin.plugin as (
      opts?: T,
    ) =>
      | QuartzTransformerPluginInstance
      | QuartzFilterPluginInstance
      | QuartzEmitterPluginInstance
      | PageTypePluginEntry
    return factory(options)
  }
  return plugin
}
