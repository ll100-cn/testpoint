// SNIP: 9d6557d3936d0c8700fdedde9eec3026 | xhrml.jsx
// CHANGELOG:
//  - 2019-12-16 新增自动判断是否 replace container, 不建议使用 replace
//  - 2019-11-25 支持 target 嵌套
//  - 2018-07-04 添加 replace 属性, 决定是否替换容器
//  - 2018-05-25 优化代码风格
//  - 2018-05-25 添加 fields-container 属性, 支持提交追加字段
//  - 2017-03-11 添加数据载入完成后, 触发 content:loading 事件
//  - 2017-01-24 优化使用 jQuery 发送事件, 而不是原生代码
//  - 2016-08-04 添加数据载入完成后, 触发 content:loaded 事件
//  - 2016-05-16 独立成 javascript 组件
//  - 2015-04-19 后台引入 xhrml


import $ from 'jquery'

function findContainer(element, container, target) {
  let $container = null
  if (container.match(/^#/)) {
    $container = $(container)
  } else {
    $container = $(element).closest(container)
  }

  if (target) {
    return $container.find(target)
  } else {
    return $container
  }
}

function findContent(data, container, target) {
  if (!target) {
    return $(data)
  } else if ($(data).is(container)) {
    return $(data).find(target)
  } else {
    return $(data).find(container).find(target)
  }
}

function replaceContent($element, data, container, target) {
  const $container = findContainer($element, container, target)
  const $data = findContent(data, container, target)
  let replacement = false
  replacement = replacement || $element.data('replace')
  replacement = replacement || ($data.is(container) && !target)
  replacement = replacement || target

  if (replacement) {
    $container.replaceWith($data)
    return $data
  } else {
    $container.html($data)
    return $container
  }
}

function handleResponse($element, data) {
  if (!$element.data('xhrml')) { return }
  $element.removeData('xhrml')
  $element.data('type', 'xhrml')

  const selector = $element.data("target")
  const [ container, target ] = selector.replace(" ", "|||").split("|||")
  const $container = replaceContent($element, data, container, target)
  $container.trigger('xhrml:success')
  $container.trigger('content:loading')
  $container.trigger('content:loaded')
}

function handleRequest($element) {
  if ($element.data('type') !== 'xhrml') { return }

  if (!$element.data('raw-params')) {
    const params = $element.data('params') || ''
    $element.data('raw-params', params)
  }

  const fieldsContainer = $element.data('fields-container')

  if (fieldsContainer) {
    const $fieldsContainer = findContainer($element, fieldsContainer)
    const fields = []
    $fieldsContainer.find(':input').each(function() {
      const name = $(this).data('param-name') || this.name
      if (name) {
        const value = $(this).val()
        fields.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
      }
    })

    const rawParams = $element.data('raw-params')
    const params = rawParams.split('&').concat(fields).join('&')
    $element.data('params', params)
  }

  $element.data('type', 'html')
  $element.data('xhrml', true)
}

$(function() {
  $(document).on({
    'ajax:before'(event) {
      const $element = $(event.target)
      handleRequest($element)
    },
    'ajax:success'(event, data) {
      const $element = $(event.target)
      handleResponse($element, data)
    },
    'ajax:error'(event, xhr) {
      const $element = $(event.target)
      handleResponse($element, xhr.responseText)
    }
  })
})


$(document).on('ajax:aborted:file', function(event) {
  const $form = $(event.target)
  $(event.target).ajaxSubmit({
    beforeSerialize($f) {
      $f.trigger('ajax:before')
    },
    success(data) {
      $form.trigger('ajax:success', data)
    },
    error(xhr) {
      $form.trigger('ajax:error', xhr)
    }
  })

  return false
})
