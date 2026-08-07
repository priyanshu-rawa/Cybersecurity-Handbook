import { QuartzTransformerPlugin } from '@quartz-community/types';
export { QuartzTransformerPlugin, StaticResources } from '@quartz-community/types';
import { ThemeOptions, ThemeMeta, ThemeData } from './types.js';
export { AspectCSS, AspectKey, ThemeModule } from './types.js';

/**
 * QuartzTheme — Transformer plugin that injects Obsidian theme CSS into Quartz sites.
 *
 * This is a pure transformer: no component needed. CSS is injected via externalResources()
 * and Quartz's built-in Darkmode() component handles light/dark switching via
 * :root.dark / :root.light CSS class toggles.
 */

/**
 * QuartzTheme transformer plugin.
 *
 * @example
 * ```ts
 * // Basic usage
 * QuartzTheme({ theme: "tokyo-night", mode: "both" })
 *
 * // With variation
 * QuartzTheme({ theme: "catppuccin", variation: "frappe", mode: "both" })
 *
 * // Mix-and-match aspects
 * QuartzTheme({
 *   theme: "tokyo-night",
 *   mode: "both",
 *   aspects: {
 *     callouts: "anuppuccin",
 *     tables: "minimal",
 *     code: false,
 *   },
 * })
 * ```
 */
declare const QuartzTheme: QuartzTransformerPlugin<Partial<ThemeOptions>>;

declare function resolveThemeId(theme: string, variation?: string): string;
declare function loadTheme(themeId: string): ThemeData;
declare function getThemeMeta(themeId: string): ThemeMeta | undefined;
declare function getAvailableThemes(): string[];
declare function registerTheme(id: string, meta: ThemeMeta, loader: () => Promise<{
    theme: ThemeData;
}>): void;

declare const CALLOUT_ICON_URIS: Record<string, string>;
declare const CALLOUT_ALIASES: Record<string, string>;
declare const CHECKBOX_ICON_URIS: Record<string, string>;

declare function generateCalloutIconCSS(): string;
declare function resolveCalloutIcon(calloutType: string): string | undefined;

declare function generateCheckboxIconCSS(): string;
declare function resolveCheckboxIcon(taskChar: string): string | undefined;

export { CALLOUT_ALIASES, CALLOUT_ICON_URIS as CALLOUT_ICON_MAP, CHECKBOX_ICON_URIS as CHECKBOX_ICON_MAP, QuartzTheme, QuartzTheme as QuartzThemes, ThemeData, ThemeMeta, ThemeOptions, QuartzTheme as default, generateCalloutIconCSS, generateCheckboxIconCSS, getAvailableThemes, getThemeMeta, loadTheme, QuartzTheme as quartzThemes, registerTheme, resolveCalloutIcon, resolveCheckboxIcon, resolveThemeId, QuartzTheme as transformer };
