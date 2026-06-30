import { PageMatcher } from "../types"

export const match = {
  ext: (extension: string): PageMatcher => {
    const normalized = extension.startsWith(".") ? extension : `.${extension}`
    return ({ slug }) => slug.endsWith(normalized) || !slug.includes(".")
  },

  slugPrefix: (prefix: string): PageMatcher => {
    return ({ slug }) => slug.startsWith(prefix)
  },

  frontmatter: (key: string, predicate: (value: unknown) => boolean): PageMatcher => {
    return ({ fileData }) => {
      const fm = fileData.frontmatter as Record<string, unknown> | undefined
      return fm ? predicate(fm[key]) : false
    }
  },

  and: (...matchers: PageMatcher[]): PageMatcher => {
    return (args) => matchers.every((m) => m(args))
  },

  or: (...matchers: PageMatcher[]): PageMatcher => {
    return (args) => matchers.some((m) => m(args))
  },

  not: (matcher: PageMatcher): PageMatcher => {
    return (args) => !matcher(args)
  },

  all: (): PageMatcher => {
    return () => true
  },

  none: (): PageMatcher => {
    return () => false
  },
}
