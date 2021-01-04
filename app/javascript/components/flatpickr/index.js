// SNIP: bfe35f2a82ce60cffe2a474c16205b16 | flatpickr.js
// FILES: ./**
// CHANGELOG:
//  - 2018-07-30 支持 监听 disabled 事件, 来启停插件
//  - 2018-05-24 添加 "今天" 和 "清空" 按钮
//  - 2017-06-22 解决 Turbolinks 返回后, 无法使用问题
//  - 2017-05-12 初始化版本

import $ from 'jquery'

import 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/l10n'

import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'

import './style.scss'
import SelectTodayPlugin from './selectToday'
import './selectToday.scss'

const initFlatpickr = function(root) {
  const $elements = $(root).find('.flatpickr')
  $elements.each(function() {
    $(this).find('.input').remove()
    $(this).flatpickr({
      plugins: [new SelectTodayPlugin(), new ConfirmDatePlugin({ showAlways: true })]
    })

    $(this).on('disabled', function(event) {
      if (event.target === this) {
        return
      }

      /* eslint no-underscore-dangle: ["error", { "allow": ["_flatpickr", "_input"] }] */
      const flatpickr = this._flatpickr
      flatpickr._input.disabled = this.disabled
    })
  })
}

$(document).on('content:loaded', function(event) {
  initFlatpickr(event.target)
})
