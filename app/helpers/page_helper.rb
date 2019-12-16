require 'kramdown'
module PageHelper
  extend ActiveSupport::Concern
  def ok_url_tag
    hidden_field_tag "ok_url", params[:ok_url] if params[:ok_url].present?
  end

  def new_button(model, url, options = {})
    label = action_i18n(:new, model_name: h(model))
    link_to label, url, { class: "btn btn-primary btn-sm" }.merge(options)
  end

  def new_link(model, url, options = {})
    label = action_i18n(:new, model_name: h(model))
    link_to label, url, options
  end

  def edit_link(url, options = {})
    label = action_i18n(:edit)
    link_to label, url, options
  end

  def destroy_link(url, options = {})
    label = action_i18n(:destroy)
    link_to label, url, { method: :delete, data: { confirm: "Are you sure?" } }.merge(options)
  end

  def cancel_link(default_url, options = {})
    label = action_i18n(:cancel)
    link_to label, ok_url_or_default(default_url), options
  end

  def cancel_button(default_url, options = {})
    cancel_link(default_url, { class: "btn btn-secondary" }.merge(options))
  end

  def label_tag(label, *args, &block)
    options = args.extract_options!
    options[:class] = "badge text-white #{options[:class]}"
    options[:style] = "background-color: #{label&.color || '#6c757d'}; #{options[:style]}"
    content_tag(:span, *args, options, &block)
  end

  def task_state_class_name(state)
    case state
    when "pass"
      "text-success"
    when "failure"
      "text-danger"
    end
  end

  def markdown_to_html(markdown, math_engine = "mathjax_node_png")
    return "" if markdown.blank?
    Kramdown::Document.new(
      markdown.strip,
      auto_ids: false,
      math_engine: math_engine,
      smart_quotes: %w[apos apos quot quot]
    ).to_html.html_safe
  end

  def create_or_edit_time_in_words(model)
    if model.last_edited_at
      "#{time_ago_in_words(model.last_edited_at)}前修改"
    else
      "#{time_ago_in_words(model.created_at)}前创建"
    end
  end

  def title(value)
    content_for :title, value
    value
  end
end
