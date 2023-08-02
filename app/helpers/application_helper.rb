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
    i18n_lookup(key, "views.page", options)
  end

  def action_i18n(key, options = {})
    i18n_lookup(key, "views.action", options)
  end

  def i18n_lookup(key, namespace, options = {})
    lookups = []
    lookups << :"#{params[:controller]}.#{params[:action]}.#{key}"
    lookups << :"#{params[:controller]}.defaults.#{key}"
    lookups << :"defaults.#{key}"
    I18n.t(lookups.shift, { scope: namespace, default: lookups }.merge(options))
  end

  def request_for_ok_url
    {}.tap do |result|
      result[:ok_url] = request.fullpath if request.get?
    end
  end

  def apply_ok_url(args)
    options = args.extract_options!
    options[:ok_url] = request.fullpath if request.get?
    url_for(args + [ options ])
  end

  def relay_ok_url(args)
    options = args.extract_options!
    options[:ok_url] = params[:ok_url] if params[:ok_url]
    url_for(args + [ options ])
  end

  def calc_color_hex(content)
    hex = "#" + Digest::MD5.hexdigest(content.to_s)[0, 6]
    color = RGB::Color.from_rgb_hex(hex)
    color.l = 0.1 + 0.4 * color.l
    color.to_rgb_hex
  end

  def current_url(attributes = {})
    options = request.query_parameters.deep_merge(attributes)
    url_for(options)
  end

  def sort_folders(folders)
    mapping = folders.group_by(&:parent_id)
    traverse = ->(hash, key, result) {
      (hash[key] || []).each do |child|
        result << child
        traverse.(hash, child.id, result)
      end
      result
    }
    traverse.(mapping, nil, [])
  end

  def ok_url_reload_script_tag
    if (ok_url = params[:ok_url])
      content_tag :script do
        "location.href = #{ok_url.to_json};".html_safe
      end
    else
      content_tag :script, "location.reload(false)"
    end
  end

end
