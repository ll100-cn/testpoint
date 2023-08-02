require 'kramdown'
module PageHelper
  extend ActiveSupport::Concern
  def ok_url_tag
    hidden_field_tag "ok_url", params[:ok_url] if params[:ok_url].present?
  end

  def new_link(models, options = {})
    build_link(models, :new, options)
  end

  def edit_link(models, options = {})
    build_link(models, :edit, options)
  end

  def destroy_link(models, options = {})
    default_opts = { method: :delete, data: { confirm: "确定删除？" } }
    build_link(models, :destroy, merge_options(default_opts, options))
  end

  def cancel_link(url, options = {})
    label = action_i18n(:cancel)
    link_to label, url, options
  end

  def new_button(models, options = {})
    default_opts = { class: "btn btn-primary" }
    new_link(models, merge_options(default_opts, options))
  end

  def edit_button(models, options = {})
    default_opts = { class: "btn btn-primary" }
    edit_link(models, merge_options(default_opts, options))
  end

  def destroy_button(models, options = {})
    default_opts = { class: "btn btn-danger" }
    destroy_link(models, merge_options(default_opts, options))
  end

  def cancel_button(url, options = {})
    default_opts = { class: "btn btn-secondary" }
    cancel_link(url, merge_options(default_opts, options))
  end

  def category_tag(label, *args, &block)
    options = args.extract_options!
    options[:class] = options[:class]
    options[:style] = "background-color: #{label&.color || '#212529'}; #{options[:style]}"
    content_tag(:span, *args, options, &block)
  end

  def category_badge_tag(label, *args, &block)
    category_tag(label, *args, { class: "badge text-white" }, &block)
  end

  def category_button_tag(label, *args, &block)
    category_tag(label, *args, { class: "btn btn-sm text-white" }, &block)
  end

  def create_or_edit_time_in_words(model)
    if model.last_edited_at
      if model.last_edited_at < 10.minutes.ago
        "修改于 #{l(model.last_edited_at, format: :long)}"
      else
        "#{time_ago_in_words(model.last_edited_at)}前修改"
      end
    elsif model.created_at < 10.minutes.ago
      "添加于 #{l(model.created_at, format: :long)}"
    else
      "#{time_ago_in_words(model.created_at)}前添加"
    end
  end

  # Set brwoser title in head
  def title(value)
    content_for :title, value
    value
  end

  def issue_state(issue_state, options = {})
    return if issue_state.nil?

    color = {
      "pending" => "bg-danger",
      "waiting" => "bg-warning",
      "confirmed" => "bg-warning",
      "processing" => "bg-info",
      "processed" => "bg-success",
      "deploying" => "bg-success",
      "resolved" => "bg-secondary",
      "archived" => "bg-light text-body",
      "closed" => "bg-light text-body"
    }[issue_state]
    text = issue_state.is_a?(String) ? Issue.state.find_value(issue_state)&.text : issue_state&.text
    text = "已关闭" if issue_state == "closed"

    helper_tooltip_text = {
      "pending" => "该问题尚未确认，等待测试人员确认后开始处理",
      "waiting" => "暂时无法确认问题，需要报告人提供更多信息",
      "confirmed" => "已确认存在该问题，准备分配给开发人员处理",
      "processing" => "开发人员已知晓，正在处理",
      "processed" => "开发人员已初步解决该问题，等待测试并发布程序",
      "deploying" => "测试显示该问题已修复，即将发布到正式服务器",
      "resolved" => "程序问题已修复，等待报告人确认后将归档该工单",
      "archived" => "问题已全部处理完毕，无需再做任何操作",
      "closed" => "问题无效或重复，不作处理"
    }[issue_state]

    css_class = options[:class].presence
    content_tag :span, text, class: "#{css_class} #{color}", data: { bs_toggle: "tooltip", bs_placement: "top" }, title: helper_tooltip_text
  end

  def badge_issue_state(issue_state)
    issue_state(issue_state, class: "badge")
  end

  def button_issue_state(issue_state)
    issue_state(issue_state, class: "btn btn-sm text-light")
  end

  def issue_filter(code, data)
    conds = Issue.filter_states_options[code][:conds]
    data.filter do |(key, _)|
      conds.any? { |statements| Issue.cond_match?(statements, key) }
    end
  end

  def issue_filter_state_count(code, data)
    result = issue_filter(code, data)
    result.values.sum
  end

protected
  def build_link(models, action, options)
    url_prefix = [:new, :edit].include?(action) ? action : nil
    if models.is_a? Array
      model = models[-1]
    else
      model = models
    end

    if model.is_a? Symbol
      model = model.to_s.classify.constantize
    end

    label = action_i18n(action, model_name: h(model))
    url = [url_prefix, *models]
    link_to label, url, options
  end

  def merge_options(old_options, new_options)
    old_options.merge(new_options) do |key, old, new|
      result = if key == :class
                 [old, new].join(" ")
               elsif key == :data
                 old.merge(new)
               end
      result
    end
  end
end
