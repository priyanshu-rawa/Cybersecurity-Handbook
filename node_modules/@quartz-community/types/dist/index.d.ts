import * as hast from 'hast';
import { Root as Root$1 } from 'hast';
import { Root } from 'mdast';
import { VFile, Data } from 'vfile';
import { PluggableList } from 'unified';

type FilePath = string & {
    _brand: "FilePath";
};
type FullSlug = string & {
    _brand: "FullSlug";
};
type SimpleSlug = string & {
    _brand: "SimpleSlug";
};
declare function joinSegments(...segments: string[]): FilePath;
type JSResource = {
    loadTime: "beforeDOMReady" | "afterDOMReady";
    moduleType?: "module";
    spaPreserve?: boolean;
    src: string;
    contentType: "external";
} | {
    loadTime: "beforeDOMReady" | "afterDOMReady";
    moduleType?: "module";
    spaPreserve?: boolean;
    script: string;
    contentType: "inline";
};
type CSSResource = {
    content: string;
    inline?: boolean;
    spaPreserve?: boolean;
};
interface StaticResources {
    css: CSSResource[];
    js: JSResource[];
    additionalHead: any[];
}
/**
 * Flat configuration object that components receive as `cfg` prop.
 * This matches Quartz's `GlobalConfiguration` — the resolved config
 * passed to components at render time (i.e. `ctx.cfg.configuration`).
 */
interface GlobalConfiguration {
    pageTitle?: string;
    pageTitleSuffix?: string;
    enableSPA?: boolean;
    enablePopovers?: boolean;
    analytics?: unknown;
    ignorePatterns?: string[];
    defaultDateType?: string;
    baseUrl?: string;
    theme?: unknown;
    locale?: string;
}
/**
 * Full Quartz config with nested `configuration` property.
 * This is what `BuildCtx.cfg` holds — used in plugin hooks
 * (transformers, filters, emitters), NOT in component props.
 */
interface QuartzConfig {
    configuration: GlobalConfiguration;
    plugins?: unknown;
    externalPlugins?: unknown;
}
interface Argv {
    directory: string;
    verbose: boolean;
    output: string;
    serve: boolean;
    watch: boolean;
    port: number;
    wsPort: number;
    remoteDevHost?: string;
    concurrency?: number;
}
interface BuildCtx {
    buildId: string;
    argv: Argv;
    cfg: QuartzConfig;
    allSlugs: FullSlug[];
    allFiles: FilePath[];
    incremental: boolean;
}
type QuartzPluginData = Data;
type MarkdownContent = [Root, VFile];
type ProcessedContent = [Root$1, VFile];
type QuartzComponentProps = {
    ctx: unknown;
    externalResources: StaticResources;
    fileData: QuartzPluginData & Record<string, unknown>;
    cfg: GlobalConfiguration;
    children: unknown;
    tree: unknown;
    allFiles: (QuartzPluginData & Record<string, unknown>)[];
    displayClass?: "mobile-only" | "desktop-only";
    [key: string]: unknown;
};
type QuartzComponent = ((props: QuartzComponentProps) => unknown) & {
    css?: string | string[] | undefined;
    beforeDOMLoaded?: string | string[] | undefined;
    afterDOMLoaded?: string | string[] | undefined;
};
type QuartzComponentConstructor<Options extends object | undefined = undefined> = (opts?: Options) => QuartzComponent;
type StringResource = string | string[];
type OptionType = object | undefined;
type ExternalResourcesFn = (ctx: BuildCtx) => Partial<StaticResources> | undefined;

interface PluginTypes {
    transformers: QuartzTransformerPluginInstance[];
    filters: QuartzFilterPluginInstance[];
    emitters: QuartzEmitterPluginInstance[];
    pageTypes: QuartzPageTypePluginInstance[];
}
type QuartzTransformerPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzTransformerPluginInstance;
type QuartzTransformerPluginInstance = {
    name: string;
    textTransform?: (ctx: BuildCtx, src: string) => string;
    markdownPlugins?: (ctx: BuildCtx) => PluggableList;
    htmlPlugins?: (ctx: BuildCtx) => PluggableList;
    externalResources?: ExternalResourcesFn;
};
type QuartzFilterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzFilterPluginInstance;
type QuartzFilterPluginInstance = {
    name: string;
    shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean;
};
type ChangeEvent = {
    type: "add" | "change" | "delete";
    path: FilePath;
    file?: VFile;
};
type QuartzEmitterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzEmitterPluginInstance;
type QuartzEmitterPluginInstance = {
    name: string;
    emit: (ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources) => Promise<FilePath[]> | AsyncGenerator<FilePath>;
    partialEmit?: (ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources, changeEvents: ChangeEvent[]) => Promise<FilePath[]> | AsyncGenerator<FilePath> | null;
    getQuartzComponents?: (ctx: BuildCtx) => QuartzComponent[];
    externalResources?: ExternalResourcesFn;
};
/**
 * Matcher function: determines if a source file belongs to a page type.
 * Returns true if the page type should own this file.
 */
type PageMatcher = (args: {
    slug: FullSlug;
    fileData: QuartzPluginData & Record<string, unknown>;
    cfg: GlobalConfiguration;
}) => boolean;
/**
 * Virtual page descriptor for page types that generate pages
 * from aggregated data (e.g., tag indexes, folder listings).
 */
interface VirtualPage {
    slug: FullSlug;
    title: string;
    data: Partial<QuartzPluginData> & Record<string, unknown>;
}
/**
 * Generator function: produces virtual pages from all processed content.
 * Used by page types that don't match source files but instead create
 * synthetic pages (e.g., one page per tag, one page per folder).
 */
type PageGenerator = (args: {
    content: ProcessedContent[];
    cfg: GlobalConfiguration;
    ctx: BuildCtx;
}) => VirtualPage[];
/** A function that mutates a HAST tree at render time, when allFiles is available. */
type TreeTransform = (root: Root$1, slug: FullSlug, componentData: QuartzComponentProps) => void;
/**
 * A PageType plugin definition.
 *
 * PageTypes are a declarative abstraction over page-rendering emitters.
 * Each PageType declares which files it owns (via `match`), optionally
 * generates virtual pages (via `generate`), and provides a body component
 * and layout reference for rendering.
 */
type QuartzPageTypePlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzPageTypePluginInstance;
type QuartzPageTypePluginInstance = {
    name: string;
    /** Higher priority wins when multiple page types match the same file. Default: 0. */
    priority?: number;
    /** File extensions this page type handles (e.g. [".canvas"]). Files with these extensions are excluded from the default asset emitter and processed by generate() instead. */
    fileExtensions?: string[];
    /** Determines which source files this page type owns. */
    match: PageMatcher;
    /** Produces virtual pages from aggregated content data. */
    generate?: PageGenerator;
    /** Layout key — references a key in `layout.byPageType`. */
    layout: string;
    /** Optional page frame name (e.g. "default", "full-width", "canvas"). Defaults to "default". */
    frame?: string;
    /** The body component constructor for this page type. */
    body: QuartzComponentConstructor;
    /** Optional render-time HAST tree transforms (e.g. resolving inline codeblocks). */
    treeTransforms?: (ctx: BuildCtx) => TreeTransform[];
};
/**
 * Props passed to a PageFrame's render function.
 * Contains the resolved layout components and the shared component data.
 */
interface PageFrameProps {
    /** Component data shared across all components on the page */
    componentData: QuartzComponentProps;
    /** The Head component (rendered in <head>) — NOT used by frames, included for completeness */
    head: QuartzComponent;
    /** Header slot components (rendered inside <header>) */
    header: QuartzComponent[];
    /** Components rendered before the page body */
    beforeBody: QuartzComponent[];
    /** The page body component (Content) */
    pageBody: QuartzComponent;
    /** Components rendered after the page body */
    afterBody: QuartzComponent[];
    /** Left sidebar components */
    left: QuartzComponent[];
    /** Right sidebar components */
    right: QuartzComponent[];
    /** Footer component */
    footer: QuartzComponent;
}
/**
 * A PageFrame defines the inner HTML structure of a page inside the
 * `<div id="quartz-root">` shell. Different frames can produce completely
 * different layouts (e.g. with/without sidebars, horizontal scroll, etc.)
 * while the outer shell (html, head, body, quartz-root) remains stable
 * for SPA navigation.
 *
 * The `render` function returns `unknown` to avoid coupling to a specific
 * JSX runtime (Preact, React, etc.). Quartz core casts this to JSX.Element.
 */
interface PageFrame {
    /** Unique name for this frame (e.g. "default", "full-width", "canvas") */
    name: string;
    /** Render the inner page structure. Returns a JSX tree to be placed inside Body > #quartz-body. */
    render: (props: PageFrameProps) => unknown;
    /** Optional CSS string to include when this frame is active */
    css?: string;
}
type HTMLAttributes = Record<string, string | number | boolean | undefined>;
type EventHandler = (event: Event) => void;
type CleanupFunction = () => void;
type ClassValue = string | number | boolean | undefined | null | ClassValue[];
type ContentDetails = {
    slug: FullSlug;
    filePath: FilePath;
    title: string;
    links: string[];
    tags: string[];
    content: string;
    richContent?: string;
    date?: Date;
    description?: string;
};
type ContentIndex = Record<FullSlug, ContentDetails>;
type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number;
type ThemeKey = "lightMode" | "darkMode";
type ValidDateType = "created" | "modified" | "published";
declare module "vfile" {
    interface DataMap {
        slug: FullSlug;
        filePath: FilePath;
        relativePath: FilePath;
        description: string;
        text: string;
        links: SimpleSlug[];
        toc: {
            depth: number;
            text: string;
            slug: string;
        }[];
        collapseToc: boolean;
        blocks: Record<string, hast.Element>;
        htmlAst: hast.Root;
        hasMermaidDiagram: boolean | undefined;
        frontmatter: {
            [key: string]: unknown;
        } & {
            title: string;
        } & Partial<{
            tags: string[];
            aliases: string[];
            modified: string;
            created: string;
            published: string;
            description: string;
            socialDescription: string;
            publish: boolean | string;
            draft: boolean | string;
            lang: string;
            enableToc: string;
            cssclasses: string[];
            socialImage: string;
            comments: boolean | string;
        }>;
        dates: {
            created: Date;
            modified: Date;
            published: Date;
        };
        defaultDateType?: ValidDateType;
    }
}

export { type Argv, type BuildCtx, type CSSResource, type ChangeEvent, type ClassValue, type CleanupFunction, type ContentDetails, type ContentIndex, type EventHandler, type ExternalResourcesFn, type FilePath, type FullSlug, type GlobalConfiguration, type HTMLAttributes, type JSResource, type MarkdownContent, type PageFrame, type PageFrameProps, type PageGenerator, type PageMatcher, type PluginTypes, type ProcessedContent, type QuartzComponent, type QuartzComponentConstructor, type QuartzComponentProps, type QuartzConfig, type QuartzEmitterPlugin, type QuartzEmitterPluginInstance, type QuartzFilterPlugin, type QuartzFilterPluginInstance, type QuartzPageTypePlugin, type QuartzPageTypePluginInstance, type QuartzPluginData, type QuartzTransformerPlugin, type QuartzTransformerPluginInstance, type SimpleSlug, type SortFn, type StaticResources, type StringResource, type ThemeKey, type TreeTransform, type ValidDateType, type VirtualPage, joinSegments };
