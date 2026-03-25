import { reactive } from 'vue'

export default class SelectdropOptionExtractor {
  parents: Map<string | null, string[]>

  constructor(parents: Map<string | null, string[]>) {
    this.parents = parents
  }

  observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type != "childList") {
        continue
      }

      for (const node of mutation.removedNodes) {
        if (node instanceof Element) {
          const children = this.queryOptions(node)

          for (const child of this.queryOptions(node)) {
            this.removeOption(child)
          }

          this.removeOption(node)
        }
      }

      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          const children = this.queryOptions(node)

          this.addOption(node)

          for (const child of this.queryOptions(node)) {
            this.addOption(child)
          }
        }
      }
    }
  })

  isOption(element: Element) {
    return element.getAttribute("data-id") != null
  }

  queryOptions(element: Element) {
    return element.querySelectorAll("[data-id]")
  }

  fetchId(element: Element | null) {
    return element?.getAttribute("data-id")
  }

  fetchParentId(element: Element) {
    return element.parentElement?.getAttribute('data-id') ?? null
  }

  removeOption(element: Element) {
    if (!this.isOption(element)) {
      return
    }

    const id = this.fetchId(element)!
    const parent_id = this.fetchParentId(element)
    this.parents.delete(id)
    const sub_ids = this.parents.get(parent_id) ?? []
    this.parents.set(parent_id, sub_ids.filter(it => it != id))
  }

  addOption(element: Element) {
    if (!this.isOption(element)) {
      return
    }

    const id = this.fetchId(element)!
    const parent_id = this.fetchParentId(element)

    if (!this.parents.has(parent_id)) {
      this.parents.set(parent_id, [])
    }

    const prev_id = this.fetchId(element.previousElementSibling)
    const next_id = this.fetchId(element.nextElementSibling)
    const sub_ids = this.parents.get(parent_id)!

    if (prev_id) {
      const index = sub_ids.indexOf(prev_id)
      sub_ids.splice(index + 1, 0, id)
    } else if (next_id) {
      const index = sub_ids.indexOf(next_id)
      sub_ids.splice(index, 0, id)
    } else {
      sub_ids.push(id)
    }
  }
}
