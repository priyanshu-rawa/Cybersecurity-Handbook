// Helper functions for community features (like GitHub discussions, etc.)
// (This is the actual file from Quartz 5.0.0)

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

// Add any other exported functions that path.ts expects.
// The import in path.ts may use multiple exports, so check the exact usage.
