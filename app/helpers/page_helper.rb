require 'kramdown'
module PageHelper
  extend ActiveSupport::Concern
  def ok_url_tag
    hidden_field_tag "ok_url", params[:ok_url] if params[:ok_url].present?
  end

  def new_link(models, options={})
    build_link(models, :new, options)
  end

  def edit_link(models, options={})
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

  def new_button(models, options={})
    default_opts =  { class: "btn btn-primary" }
    new_link(models, merge_options(default_opts, options))
  end

  def edit_button(models, options={})
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



  def label_badge_tag(label, *args, &block)
    options = args.extract_options!
    options[:class] = "badge text-white #{options[:class]}"
    options[:style] = "background-color: #{label&.color || '#6c757d'}; #{options[:style]}"
    content_tag(:span, *args, options, &block)
  end

  def create_or_edit_time_in_words(model)
    if model.last_edited_at
      if model.last_edited_at < 10.minutes.ago
        "修改于 #{l(model.last_edited_at, format: :long)}"
      else
        "#{time_ago_in_words(model.last_edited_at)}前修改"
      end
    else
      if model.created_at < 10.minutes.ago
        "添加于 #{l(model.created_at, format: :long)}"
      else
        "#{time_ago_in_words(model.created_at)}前添加"
      end
    end
  end

  # Set brwoser title in head
  def title(value)
    content_for :title, value
    value
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
