import $ from 'jquery'
import _ from 'lodash'
import showdown from 'showdown'

const checkboxRegex = /^\s*(?:\*|-|\+)\s+(\[(?:x| )?\])\s+/gm

function checkboxExtension(options) {
  const checkbox = {
    type: 'lang',
    filter: function (text, converter) {
      const re = checkboxRegex
      const inputReplacer = function(match, mark) {
        const attrs = []
        if (mark == "[x]") {
          attrs.push("checked")
        }

        if (options.readonly) {
          attrs.push("disabled")
        }

        attrs.push(`data-action="change-&gt;markdown#toggleCheckbox"`)

        return match.replace(mark, `<input type="checkbox" ${attrs.join(' ')}>`)
      }
      return text.replace(re, inputReplacer)
    }
  }
  return checkbox
}

const renderMarkdown = function(markdown, options) {
  const checkboxOptions = options.checkbox || {}
  _.unset(options, "checkbox")
  const converter = new showdown.Converter({ extensions: [checkboxExtension(checkboxOptions)], ...options })
  return converter.makeHtml(markdown)
}

$(document).on('content:loaded', function(event) {
  $(event.target).find('.markdown-area').each(function() {
    const options = $(this).data() || {}
    this.innerHTML = renderMarkdown(this.innerHTML, options)
  })
})

export default {renderMarkdown, checkboxRegex}
