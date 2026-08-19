/**
 * Community utilities for Quartz
 * Provides helper functions for GitHub discussions and community features
 */

export function getGitHubDiscussionURL(
  title: string,
  repo: string,
  labels?: string[],
): string {
  const base = `https://github.com/${repo}/discussions/new`
  const params = new URLSearchParams({
    title,
    labels: labels?.join(",") ?? "",
  })
  return `${base}?${params.toString()}`
}

// Add any other exports that might be needed by path.ts
// Common exports include:
// - getGitHubIssueURL
// - getGitHubSponsorURL
// - formatCommunityLink
// etc.