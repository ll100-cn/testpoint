module ApplicationHelper
  def human(model, attribute_name = nil)
    if attribute_name
      model.human_attribute_name(attribute_name)
    else
      model.model_name.human
    end
  end
  alias h human

  def page_i18n(key, options = {})
    i18n_lookup(key, :"views.page", options)
  end

  def action_label(key, options = {})
    i18n_lookup(key, :"views.action", options)
  end

  def i18n_lookup(key, namespace, options = {})
    lookups = []
    lookups << :"#{params[:controller]}.#{params[:action]}.#{key}"
    lookups << :"#{params[:controller]}.defaults.#{key}"
    lookups << :"defaults.#{key}"
    I18n.t(lookups.shift, { scope: namespace, default: lookups }.merge(options))
  end
end
