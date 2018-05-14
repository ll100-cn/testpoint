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
                // 创建元素
                btnContainer = fp._createElement('div', 'flatpickr-confirm ' + 'visible ' + config.theme + 'Theme')
                btnClear = fp._createElement('div', 'flatpickr-btn ' + config.theme + 'Theme', config.clearText)
                btnToday = fp._createElement('div', 'flatpickr-btn ' + config.theme + 'Theme', config.todayText)

                // 功能实现
                btnToday.addEventListener('click', function () {
                    fp.setDate(fp.now)
                })

                btnClear.addEventListener('click', function () {
                    fp.input.value = ''
                    fp.close()
                })

                // add to calendarContainer
                btnContainer.appendChild(btnClear)
                btnContainer.appendChild(btnToday)
                fp.calendarContainer.appendChild(btnContainer)
            },
            onChange: function onChange (_, dateStr) {
                var showCondition = fp.config.enableTime || fp.config.mode === 'multiple'
                if (dateStr && !fp.config.inline && showCondition) {
                    // 判断confirm是不是存在，存在则appendchild
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

$(function() {

    $("#plan_start_time").flatpickr({
        enableTime: true,
        plugins: [ new SelectTodayPlugin(), new confirmDatePlugin() ]
    });

    $("#plan_end_time").flatpickr({
        enableTime: true,
        plugins: [ new SelectTodayPlugin(), new confirmDatePlugin() ]
    });
})
