const BASE_TITLE = 'Martin Polley'

export const createPageTitle = (pageName: string) => {
  return pageName ? `${pageName} | ${BASE_TITLE}` : BASE_TITLE
}
