import $ from 'jquery'
import _ from 'lodash'
import showdown from 'showdown'

const checkboxRegex = /^\s*(?:\*|-|\+)\s+(\[(?:x| )?\])\s+/gm

function checkboxExtension(options) {
  const checkbox = {
    type: 'lang',
    filter: function (text, converter) {
      return replaceMarkdownTaskList(text, function(mark, position, checked) {
        const attrs = []
        if (checked) {
          attrs.push("checked")
        }

        if (options.readonly) {
          attrs.push("disabled")
        }

        return `<input type="checkbox" ${attrs.join(' ')} data-position="${position}">`
      })
    }
  }
  return checkbox
}

export function replaceMarkdownTaskList(markdown, callback) {
  let position = 0
  return markdown.replace(checkboxRegex, function(match, mark) {
    position++
    const checked = (mark == "[x]")
    const newMark = callback(mark, position, checked)
    return match.replace(mark, newMark)
  })
}

export function renderMarkdown(markdown, options = {}) {
  const checkboxOptions = options.checkbox || {}
  _.unset(options, "checkbox")
  const converter = new showdown.Converter({ extensions: [checkboxExtension(checkboxOptions)], ...options })
  return converter.makeHtml(markdown)
}

export default {}
