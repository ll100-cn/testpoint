module PageHelper
  def ok_url_tag
    hidden_field_tag "ok_url", params[:ok_url] if params[:ok_url].present?
  end

  def new_button(model, url, options = {})
    label = action_i18n(:new, model_name: h(model))
    link_to label, url, { class: "btn btn-primary" }.merge(options)
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

  def label_with_color(label)
    content_tag :span, class: "btn text-white", style: "background-color:" + label.color do
      safe_join([label.name], ' ')
    end
  end

  def issue_label(label)
    content_tag :span, class: "badge mt-1 text-white", style: "background-color:" + label.color do
      safe_join([label.name], ' ')
    end
  end

  def task_state_class_name(state)
    case state
    when "pass"
      "text-success"
    when "failure"
      "text-danger"
    end
  end

  def issue_state_class_name(state, type = "")
    mappings = { "open" => "info", "closed" => "secondary", "solved" => "success" }
    type.present? ? "#{type} #{type}-#{mappings[state]}" : mappings[type]
  end
end
