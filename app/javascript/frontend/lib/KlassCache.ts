// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
export class KlassCache<T> {
  caches = new Map<any, Map<string, any>>()

  clear() {
    this.caches.clear()
  }

  sweepAll(klass: new (...args: any[]) => T) {
    this.caches.delete(klass)
  }

  sweep<K extends new (...args: any[]) => T>(klass: K, ...args: ConstructorParameters<K>) {
    if (!this.caches.has(klass)) {
      return
    }

    const cache = this.caches.get(klass)!
    const key = JSON.stringify(args)
    cache.delete(key)
  }

  instance<K extends new (...args: any[]) => InstanceType<K>>(Klass: K, ...args: ConstructorParameters<K>): InstanceType<K> {
    if (!this.caches.has(Klass)) {
      this.caches.set(Klass, new Map())
    }

    const cache = this.caches.get(Klass)!
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key) as InstanceType<K>
    } else {
      const value = new Klass(...args)
      cache.set(key, value)
      return value
    }
  }

  build<K extends new (...args: any[]) => InstanceType<K>>(klass: any, builder: (...args: ConstructorParameters<K>) => T, ...args: ConstructorParameters<K>): T {
    if (!this.caches.has(klass)) {
      this.caches.set(klass, new Map())
    }

    const cache = this.caches.get(klass)!
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    } else {
      const request = builder(...args)
      cache.set(key, request)
      return request
    }
  }
}
