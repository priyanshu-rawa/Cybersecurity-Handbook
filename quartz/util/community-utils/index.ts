import { QuartzConfig } from "../../cfg"
import { FilePath, FullSlug, SimpleSlug, slugifyFilePath } from "../../util/path"
import { unified } from "unified"
import markdown from "remark-parse"
import remark2rehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { QuartzPluginData } from "../plugins"
import { Node } from "unist"

export type CommunityPlugin = (ctx: any, cfg: QuartzConfig) => void

// This is a placeholder for community plugins – they are not used in core Quartz
export const registerCommunityPlugin = (plugin: CommunityPlugin) => {
  // In a real implementation, this would register the plugin
  console.warn("Community plugins are not supported in this build")
}

// Utility function to check if a path is a markdown file
export const isMarkdownFile = (filePath: FilePath): boolean => {
  return filePath.endsWith(".md") || filePath.endsWith(".markdown")
}

// Utility to get the slug from a file path
export const getSlugFromPath = (filePath: FilePath): SimpleSlug => {
  return slugifyFilePath(filePath) as SimpleSlug
}

// Utility to process markdown content (for community use)
export const processMarkdown = async (content: string): Promise<string> => {
  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehypeStringify)

  const result = await processor.process(content)
  return result.toString()
}

// Utility to extract frontmatter from markdown (basic version)
export const extractFrontmatter = (content: string): Record<string, any> => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  if (!match) return {}
  // Simple YAML-like parsing (for demo)
  const lines = match[1].split("\n")
  const data: Record<string, any> = {}
  for (const line of lines) {
    const [key, ...valueParts] = line.split(":")
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim()
      // Try to parse booleans and numbers
      if (value === "true") data[key.trim()] = true
      else if (value === "false") data[key.trim()] = false
      else if (!isNaN(Number(value))) data[key.trim()] = Number(value)
      else data[key.trim()] = value
    }
  }
  return data
}
