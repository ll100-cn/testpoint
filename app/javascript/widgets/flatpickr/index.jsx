import $ from 'jquery'
import flatpickr from 'flatpickr'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'


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
        return Object.assign({
            onReady: function onReady () {
                btnContainer = fp._createElement('div', 'flatpickr-selectdate ')
                btnClear = fp._createElement('div', 'flatpickr-btn ' + config.theme + 'Theme', config.clearText)
                btnToday = fp._createElement('div', 'flatpickr-btn ' + config.theme + 'Theme', config.todayText)

                btnToday.addEventListener('click', function () {
                    fp.setDate(fp.now)
                })

                btnClear.addEventListener('click', function () {
                    fp.input.value = ''
                    fp.close()
                })

                btnContainer.appendChild(btnClear)
                btnContainer.appendChild(btnToday)
                fp.calendarContainer.appendChild(btnContainer)
            },
            onChange: function onChange (_, dateStr) {
                var showCondition = fp.config.enableTime || fp.config.mode === 'multiple'
                if (dateStr && !fp.config.inline && showCondition) {
                    var nodes = fp.calendarContainer.childNodes
                    console.log(nodes)
                    for (var i = 0; i < nodes.length ; i++) {
                        if (nodes[i].className === 'flatpickr-confirm lightTheme visible') {
                            console.log(nodes[i])
                            var btnConfirm = nodes[i]
                            btnConfirm.classList.remove('flatpickr-confirm')
                            btnConfirm.classList.add('flatpickr-btn')
                            btnContainer.appendChild(btnConfirm)
                        }
                    }
                }
            }
        })
    }
}

$(document).on('turbolinks:load', function() {
    $("#plan_start_at").flatpickr({
        enableTime: true,
        plugins: [ new SelectTodayPlugin(), new confirmDatePlugin() ]
    });
});