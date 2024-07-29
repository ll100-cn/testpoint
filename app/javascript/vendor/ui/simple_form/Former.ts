import { reactive } from "vue"
import Validator from "./Validator"

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export default class Former<T extends object> {
  form: T
  loading: boolean = false
  validator: Validator
  usedKeys: string[] = []

  doPerform?: (...args: any[]) => Promise<void>

  constructor(form: T) {
    this.form = form
    this.validator = new Validator()
  }

  key(path: NestedKeyOf<T>) {
    this.usedKeys.push(path)
    return path
  }

  async perform(...args: any[]) {
    this.loading = true
    this.validator.clear()

    try {
      await this.doPerform?.(...args)
    } catch(e) {
      if (!this.validator.processError(e)) {
        throw e
      }
    } finally {
      this.loading = false
    }
  }

  static build<T extends object>(form: T) {
    return reactive(new this(form))
  }
}
