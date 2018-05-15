import $ from 'jquery'
import flatpickr from 'flatpickr'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'
import 'flatpickr/dist/l10n'
import 'widgets/flatpickr/style'
import 'widgets/flatpickr/en'
import 'widgets/flatpickr/zh'


var defaultConfig = {
    todayText: 'today',
    clearText: 'clear',
    theme: 'light'
}


function SelectTodayPlugin (pluginConfig) {
    var config = Object.assign({}, defaultConfig, pluginConfig)
    return function (fp) {
        if (fp.config.noCalendar || fp.isMobile) return {}
        return {
            onReady: function onReady () {

                var $btnContainer = $("<div>", { "class": "flatpickr-btn-container " + config.theme + 'Theme'})
                var $btnClear = $("<div>", { "class": "flatpickr-btn"})
                var $btnToday = $("<div>", { "class": "flatpickr-btn"})
                $btnClear.text(config.clearText)
                $btnToday.text(config.todayText)

                var locale = fp.config.locale
                if (locale !== 'en' && locale.weekAbbreviation === '周') {
                    $btnClear.text(ZHCONFIG.clearText)
                    $btnToday.text(ZHCONFIG.todayText)
                }

                $btnContainer.appendTo(fp.calendarContainer)
                $btnClear.appendTo($btnContainer)
                $btnToday.appendTo($btnContainer)

                $btnClear.click(function () {
                    fp.input.value = ''
                    fp.close()
                })

                $btnToday.click(function () {
                    fp.setDate(fp.now)
                })

                var $plugins = fp.config.plugins
                if ($plugins.toString().includes('flatpickr-confirm')) {
                    var $nodes = fp.calendarContainer.childNodes
                    var addConfirm = false
                    $nodes.forEach(function (node) {
                        if ($.inArray("flatpickr-confirm", node.classList) > -1 ) {
                            var $btnConfirm = $(node)
                            $btnConfirm.addClass('flatpickr-btn')
                            $btnConfirm.appendTo($btnContainer)
                            addConfirm = true
                        }
                    })
                    if ( !addConfirm ) {
                        alert("confirmDatePlugin should be put after this plugin")
                    }
                }

            }
        }
    }
}

$(document).on('turbolinks:load', function() {
    $(".timepicker").each(function() {

        var flatpickr_locale = flatpickr.l10ns.zh
        var locale = $(this).data('locale')
        if (locale === 'en') {
            flatpickr_locale = flatpickr.l10ns.en
        }

        $(this).flatpickr({
            enableTime: true,
            locale: flatpickr_locale,
            plugins: [ new SelectTodayPlugin(), new confirmDatePlugin() ]
        })
    })
})


