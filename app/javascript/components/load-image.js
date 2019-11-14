import $ from 'jquery'

$.fn.loadImage = function(file) {
  const reader = new FileReader()
  reader.onload = event => {
    $(this).attr('src', event.target.result)
  }
  reader.readAsDataURL(file)
}
