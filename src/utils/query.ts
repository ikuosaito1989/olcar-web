export const queryUtil = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toArrayQuery: (query: any): string[] => {
    return Array.isArray(query) ? (query as string[]) : query ? [query] : []
  },
}
