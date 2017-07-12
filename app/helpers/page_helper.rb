module PageHelper
  def human(model, attribute_name = nil)
    if attribute_name
      model.human_attribute_name(attribute_name)
    else
      model.model_name.human
    end
  end
  alias h human

  def new_button(model, url, options = {})
    label = t("views.page.new", model_name: h(model))
    link_to label, url, { class: "btn btn-primary" }.merge(options)
  end

  def edit_link(url, options = {})
    label = t("view.page.edit")
    link_to label, url, options
  end

  def show_link(url, options = {})
    label = t("view.page.show")
    link_to label, url, options
  end
end
