import { QuartzConfig } from "../../cfg"
import { FilePath, FullSlug, SimpleSlug, slugifyFilePath } from "../../util/path"

export type CommunityPlugin = (ctx: any, cfg: QuartzConfig) => void

export const registerCommunityPlugin = (plugin: CommunityPlugin) => {
  console.warn("Community plugins are not supported in this build")
}

export const isMarkdownFile = (filePath: FilePath): boolean => {
  return filePath.endsWith(".md") || filePath.endsWith(".markdown")
}

export const getSlugFromPath = (filePath: FilePath): SimpleSlug => {
  return slugifyFilePath(filePath) as SimpleSlug
}

// Simplified versions (no external dependencies)
export const processMarkdown = async (content: string): Promise<string> => {
  return content // just return as is
}

export const extractFrontmatter = (content: string): Record<string, any> => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  if (!match) return {}
  const lines = match[1].split("\n")
  const data: Record<string, any> = {}
  for (const line of lines) {
    const [key, ...valueParts] = line.split(":")
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim()
      data[key.trim()] = value
    }
  }
  return data
}
