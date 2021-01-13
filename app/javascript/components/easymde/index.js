import $ from 'jquery'
import EasyMDE from 'easymde'
import 'easymde/src/css/easymde.css'
import 'codemirror/lib/codemirror.css'
import marked from 'marked'
import { renderMarkdown } from '../showdown'
import './style.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.markdown-field').each(function() {
    new EasyMDE({
      element: this,
      status: false,
      previewRender: function(plainText, preview) {
        setTimeout(function() {
            preview.innerHTML = renderMarkdown(plainText, {})
        }, 250)
        return "Loading..."
      },
      autoDownloadFontAwesome: false
    })
  })
})
