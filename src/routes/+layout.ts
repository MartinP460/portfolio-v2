export const prerender = true

export function load({ url }) {
  return {
    path: url.pathname
  }
}
