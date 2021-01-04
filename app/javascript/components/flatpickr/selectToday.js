import $ from 'jquery'
import flatpickr from 'flatpickr'

if (flatpickr.l10ns.zh) {
  Object.assign(flatpickr.l10ns.zh, {
    todayText: '今天',
    clearText: '清空'
  })
}

if (flatpickr.l10ns.en) {
  Object.assign(flatpickr.l10ns.en, {
    todayText: 'Today',
    clearText: 'Clear'
  })
}

Object.assign(flatpickr.l10ns.default, {
  todayText: 'Today',
  clearText: 'Clear'
})

export default function selectToday(pluginConfig) {
  const config = { ...{ theme: 'light' }, ...pluginConfig }
  return function(fp) {
    if (fp.config.noCalendar || fp.isMobile) return {}
    return {
      onReady: function onReady() {
        const $btnContainer = $('<div>', { class: `flatpickr-btn-container ${config.theme}Theme` })
        const $btnClear = $('<div>', { class: 'flatpickr-btn' }).text(this.l10n.clearText)
        const $btnToday = $('<div>', { class: 'flatpickr-btn' }).text(this.l10n.todayText)

        $btnContainer.appendTo(fp.calendarContainer)
        $btnContainer.append($btnClear, $btnToday)

        $btnClear.click(function() {
          fp.clear()
          fp.close()
        })

        $btnToday.click(function() {
          fp.setDate(fp.now)
        })

        const plugins = fp.config.plugins
        if (plugins.toString().includes('flatpickr-confirm')) {
          const btnConfirm  = $(fp.calendarContainer).find('.flatpickr-confirm').get(0)
          if (btnConfirm) {
            $btnContainer.append(btnConfirm)
          } else {
            throw new Error('confirmDatePlugin should be put after this plugin')
          }
        }
      }
    }
  }
}
