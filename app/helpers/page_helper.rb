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

  def show_link(url, options = {})
    label = t("views.action.show")
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

  def task_state_text(task)
    class_name = case task.state
                 when "pass"
                   "text-success"
                 when "failure"
                   "text-danger"
                 end

    content_tag :span, task.state_text, class: class_name
  end
end
