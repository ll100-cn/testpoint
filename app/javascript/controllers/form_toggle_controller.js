import { Controller } from "stimulus"
import $ from 'jquery'
import _ from 'lodash'

export default class extends Controller {
  static targets = [ "container", "form" ]

  initialize() {
    this.change = this.change.bind(this)
  }

  connect() {
    if (this.hasFormTarget) {
      this.$form = $(this.formTarget) 
    } else {
      this.$form = $(this.containerTarget).closest("form")
    }
  
    this.$form.on("change", this.change)
    this.$form.trigger("change")
  }

  disconnect() {
    this.$form.off("change", this.change)
  }

  change(event) {
    const valueArray = $(event.currentTarget).serializeArray()
    const valuesMapping = _.reduce(valueArray, function(result, item) {
      result[item.name] = result[item.name] || []
      result[item.name].push(item.value)
      return result
    }, {})

    for (const container of this.containerTargets) {
      const name = $(container).data("for-name")
      const values = _.flatten([ $(container).data("for-value"), $(container).data("for-values") ])
      const targetValues = _.invokeMap(values, 'toString')

      const formValues = valuesMapping[name] || []
      if (_.intersection(formValues, targetValues).length > 0) {
        this.enableContainer(container)
      } else {
        this.disableContainer(container)
      }
    }
  }

  enableContainer(element) {
    $(element).show()
    $(element).find(":input").each(function() {
      const originalDisabled = $(this).data("originalDisabled")

      if (originalDisabled !== undefined) {
        this.disabled = originalDisabled
        $(this).removeData("originalDisabled")
        $(this).trigger("disabled")
      }
    })
  }

  disableContainer(element) {
    $(element).hide()
    $(element).find(":input").each(function() {
      const originalDisabled = $(this).data("originalDisabled")

      if (originalDisabled === undefined) {
        $(this).data("originalDisabled", this.disabled)
      }

      this.disabled = true
      $(this).trigger("disabled")
    })
  }
}
