import { QuartzComponentProps } from "../../components/types"

export type ConditionPredicate = (props: QuartzComponentProps) => boolean

const builtinConditions: Record<string, ConditionPredicate> = {
  "not-index": (props) => props.fileData.slug !== "index",
  "has-tags": (props) => {
    const tags = props.fileData.frontmatter?.tags
    return Array.isArray(tags) && tags.length > 0
  },
  "has-backlinks": (props) => {
    const backlinks = (props.fileData as Record<string, unknown>).backlinks
    return Array.isArray(backlinks) && backlinks.length > 0
  },
  "has-toc": (props) => {
    const toc = (props.fileData as Record<string, unknown>).toc
    return Array.isArray(toc) && toc.length > 0
  },
}

const customConditions = new Map<string, ConditionPredicate>()

export function registerCondition(name: string, predicate: ConditionPredicate): void {
  customConditions.set(name, predicate)
}

export function getCondition(name: string): ConditionPredicate | undefined {
  return customConditions.get(name) ?? builtinConditions[name]
}

export function getAllConditionNames(): string[] {
  return [...Object.keys(builtinConditions), ...customConditions.keys()]
}
