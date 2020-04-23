import $ from 'jquery'
import SimpleMDE from 'simplemde'
import 'simplemde/debug/simplemde.css'
import marked from 'marked'
import { renderMarkdown } from '../showdown'
import './style.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.markdown-field').each(function() {
    new SimpleMDE({
      element: this,
      status: false,
      previewRender: function(plainText, preview) {
        setTimeout(function() {
            preview.innerHTML = renderMarkdown(plainText, {})
        }, 250)
        return "Loading..."
      }
    })
  })
})
