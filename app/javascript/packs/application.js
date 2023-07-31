/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
// require("@rails/ujs").start()
// require("@rails/activestorage").start()
// require("channels")

import $ from 'jquery'
window.$ = $

import 'jquery-ujs'

// Theme
// import '../keen'
import '../bootstrap-ext'

import '../components/fontawesome'
import '../components/turbolinks'
import '../components/xhrml'
import '../components/modal'
import '../components/flatpickr'
import '../components/select2'
import '../components/easymde'
import '../components/showdown'
import '../components/stimulus'
import '../components/clipboard'
import '../components/load-image'
import '../components/rails-nested-form'
import '../components/tooltip'
import '../components/fancybox'
import '../components/treeview'
import '../components/auto-submit'
import '../components/bootstrap-select'
import '../components/chart'

import '../frontend/old'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)
