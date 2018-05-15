import $ from 'jquery'
import flatpickr from 'flatpickr'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'
import 'flatpickr/dist/l10n'
import 'widgets/flatpickr/style'
// import { English } from 'flatpickr/dist/l10n/default'
// import { Thailand }  from 'flatpickr/dist/l10n/th'
import { Russian }  from 'flatpickr/dist/l10n/ru'


var defaultConfig = {
    todayText: 'today',
    clearText: 'clear',
    theme: 'light'
}

function SelectTodayPlugin (pluginConfig) {
    var config = Object.assign({}, defaultConfig, pluginConfig)
    var btnContainer
    var btnToday
    var btnClear
    return function (fp) {
        if (fp.config.noCalendar || fp.isMobile) return {}
        return {
            onReady: function onReady () {

                console.log(fp.config)

                btnContainer = fp._createElement('div', 'flatpickr-btn-container ' + config.theme + 'Theme')
                btnClear = fp._createElement('div', 'flatpickr-btn', config.clearText)
                btnToday = fp._createElement('div', 'flatpickr-btn', config.todayText)

                btnContainer.appendChild(btnClear)
                btnContainer.appendChild(btnToday)
                fp.calendarContainer.appendChild(btnContainer)


                btnToday.addEventListener('click', function () {
                    fp.setDate(fp.now)
                })

                btnClear.addEventListener('click', function () {
                    fp.input.value = ''
                    fp.close()
                })

                var plugins = fp.config.plugins
                if (plugins.toString().indexOf('flatpickr-confirm')) {
                    var nodes = fp.calendarContainer.childNodes
                    for ( var i = 0; i < nodes.length ; i++) {
                        if (nodes[i].className === 'flatpickr-confirm  lightTheme') {
                            var btnConfirm = nodes[i]
                            btnConfirm.classList.add('flatpickr-btn')
                            btnContainer.appendChild(btnConfirm)
                        }
                    }
                    if ( btnContainer.children.length === 2 ) {
                        alert("confirmDatePlugin should be put after this plugin")
                    }
                }
            }
        }
    }
}

$(document).on('turbolinks:load', function() {
    $(".timepicker").each(function() {
        $(this).flatpickr({
            enableTime: true,
            locale: Russian,
            plugins: [ new SelectTodayPlugin(), new confirmDatePlugin() ]
        })
    })
})
