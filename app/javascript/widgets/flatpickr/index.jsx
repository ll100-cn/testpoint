import $ from 'jquery'

import 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/l10n'

import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'

import selectTodayPlugin from  './selectToday'
import './selectToday.scss'

$(document).on('turbolinks:load', function() {
    $(".datetime-picker").each(function() {
        $(this).flatpickr({
            enableTime: true,
            wrap: true,
            plugins: [ new selectTodayPlugin(), new confirmDatePlugin() ]
        })
    })
})