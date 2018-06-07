import $ from 'jquery'
import SimpleMDE from 'simplemde'
import 'simplemde/debug/simplemde.css'

$(document).on('content:loaded', function(event) {
  // $('.markdown-field').each(function() {
  //   new SimpleMDE({
  //     element: this,
  //     status: false,
  //     previewRender: function(plainText, preview) {
  //       return customMarkdownParser(plainText)
  //       //   preview.innerHTML =
  //       // const url = $(this).data('preview-url')
  //       // const content = plainText
  //       // $.ajax({
  //       //   url,
  //       //   method: 'POST',
  //       //   data: { content },
  //       // }).done(function(data) {
  //       //   preview.innerHTML = data
  //       // })
  //       // return 'Loading...'
  //     }
  //   })
  // })
  var simplemde = new SimpleMDE({ element: document.getElementById("markdown-field") });
  $('#preview-tab').click(function() {
    $('#comment-preview').html(simplemde.markdown(simplemde.value()))
  })
})
