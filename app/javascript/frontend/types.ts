export interface PageQuery {
  page?: number
  items?: number
  q?: {
    [key: string]: string | number
  }
}
