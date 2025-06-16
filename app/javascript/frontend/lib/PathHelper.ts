export class PathInfo {
  action: string
  id?: string
  collection: string

  constructor(collection: string, action: string, id?: string) {
    this.collection = collection
    this.action = action
    this.id = id
  }

  get parent() {
    const path = this.collection.split('/').slice(0, -1).join("/")
    return PathInfo.parseMember(path, 'show')
  }

  get resource() {
    return `${this.collection}/${this.id}`
  }

  static parseMember(path: string, action: string) {
    if (path.endsWith('/')) {
      path = path.slice(0, -1)
    }

    const segments = path.split('/')
    if (segments[segments.length - 1] == action) {
      return new PathInfo(
        segments.slice(0, -2).join('/'),
        action,
        segments[segments.length - 2],
      )
    } else {
      return new PathInfo(
        segments.slice(0, -1).join('/'),
        action,
        segments[segments.length - 1]
      )
    }
  }
}

export default {
  parseCollection(path: string, action: string) {
    if (path.endsWith('/')) {
      path = path.slice(0, -1)
    }

    const segments = path.split('/')
    if (segments[segments.length - 1] == action) {
      return new PathInfo(
        segments.slice(0, -1).join('/'),
        action
      )
    } else {
      return new PathInfo(
        segments.join('/'),
        action
      )
    }
  },
  parseMember(path: string, action: string) {
    return PathInfo.parseMember(path, action)
  }
}