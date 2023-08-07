export class EntityRepo<T> {
  data: T[] = []
  mapping = new Map<number, T>()
  _keys: number[] = []

  constructor(data: T[]) {
    this.data = data

    for (const entity of data) {
      const id = (entity as any).id
      this._keys.push(id)
      this.mapping.set(id, entity)
    }
  }

  find(id: number): T | null {
    return this.mapping.get(id) || null
  }

  keys(): number[] {
    return this._keys
  }

  values(): T[] {
    return Array.from(this.mapping.values())
  }

  valuesAt(ids: number[]): T[] {
    return ids.map(id => this.find(id)).filter(Boolean)
  }
}