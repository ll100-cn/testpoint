import $ from 'jquery'
import _ from 'lodash'
import showdown from 'showdown'

const checkboxRegex = /^\s*(?:\*|-|\+)\s+(\[(?:x|-| )?\])\s+/gm

function checkboxExtension(options: any) {
  const checkbox = {
    type: 'lang',
    filter: function(text: string, converter: any) {
      return replaceMarkdownTaskList(text, function(mark: string, position: number, checked: boolean | 'indeterminate') {
        const attrs = []

        if (checked == 'indeterminate') {
          attrs.push("data-indeterminate")
        } else if (checked == true) {
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

export function replaceMarkdownTaskList(markdown: string, callback: (mark: string, position: number, checked: boolean | 'indeterminate') => string) {
  let position = 0
  return markdown.replace(checkboxRegex, function(match: string, mark: string) {
    position++
    let checked: boolean | 'indeterminate' = false
    if (mark == "[x]") {
      checked = true
    } else if (mark == "[-]") {
      checked = 'indeterminate'
    }
    const newMark = callback(mark, position, checked)
    return match.replace(mark, newMark)
  })
}

export function renderMarkdown(markdown: string, options: any = {}) {
  const checkboxOptions = options.checkbox || {}
  _.unset(options, "checkbox")
  _.merge(options, { "simpleLineBreaks": true })
  const converter = new showdown.Converter({ extensions: [ checkboxExtension(checkboxOptions) ], ...options })
  converter.setFlavor('github')
  return converter.makeHtml(markdown)
}

export default {}
