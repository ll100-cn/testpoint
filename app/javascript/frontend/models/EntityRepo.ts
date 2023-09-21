export class EntityIndex<K, T extends { id: any }> {
  lookup: (entity: T) => K
  data = new Map<K, T[]>

  constructor(lookup: (entity: T) => K) {
    this.lookup = lookup
  }

  add(entity: T) {
    const key = this.lookup(entity)
    if (!this.data.has(key)) {
      this.data.set(key, [])
    }

    const list = this.data.get(key)
    const index = list.findIndex(it => it.id == entity.id)
    if (index < 0) {
      list.push(entity)
    } else {
      list[index] = entity
    }
  }

  findAll(key: K) {
    return this.data.get(key) ?? []
  }

  find(key: K) {
    return this.findAll(key)[0]
  }
}

export class EntityRepo<T extends { id: any }> {
  data: T[] = []
  id = new EntityIndex<number, T>(it => it.id)

  setup(data: T[]) {
    this.data = data

    for (const entity of data) {
      this.id.add(entity)
      this.buildIndex(entity)
    }

    return this
  }

  find(id: number): T | null {
    return this.id.findAll(id)[0]
  }

  keys(): number[] {
    return Array.from(this.id.data.keys())
  }

  values(): T[] {
    return this.data
  }

  valuesAt(ids: number[]): T[] {
    return ids.map(id => this.find(id)).filter(Boolean)
  }

  buildIndex(entity: T) {}
}