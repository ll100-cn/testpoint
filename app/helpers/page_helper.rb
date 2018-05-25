module PageHelper
  def ok_url_tag
    hidden_field_tag "ok_url", params[:ok_url] if params[:ok_url].present?
  end

  def new_button(model, url, options = {})
    label = t("views.action.new", model_name: h(model))
    link_to label, url, { class: "btn btn-primary" }.merge(options)
  end

  def edit_link(url, options = {})
    label = t("views.action.edit")
    link_to label, url, options
  end

  def destroy_link(url, options = {})
    label = t("views.action.destroy")
    link_to label, url, { method: :delete, data: { confirm: "Are you sure?" } }.merge(options)
  end

  def cancel_link(default_url, options = {})
    label = t("views.action.cancel")
    link_to label, ok_url_or_default(default_url), options
  end

  def cancel_button(default_url, options = {})
    cancel_link(default_url, { class: "btn btn-secondary" }.merge(options))
  end

  def task_state_style(state)
    case state
    when "pass"
      "success"
    when "failure"
      "danger"
    end
  end

  def issue_state_class_name(state, type = "")
    mappings = { "open" => "info", "closed" => "primary", "solved" => "success" }
    type.present? ? "#{type} #{type}-#{mappings[state]}" : mappings[type]
  end

  def action_label(action)
    t("views.action.#{action}")
  end
end
