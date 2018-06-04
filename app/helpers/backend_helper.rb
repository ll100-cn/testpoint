module BackendHelper
  def backend_search_form_for(*args, &block)
    options = {
        # wrapper: 'inline_form',
        # wrapper_mappings: {
        #   boolean: :inline_boolean
        # },
        html: { class: "form-inline backend-search-form" }
    }.deep_merge(args.extract_options!)
    options[:defaults] = backend_search_form_defaults.deep_merge(options[:defaults] || {})

    apply_bootstrap_inline_form_options!(options)

    search_form_for(*args, options, &block)
  end

  def backend_search_form_defaults
    {
        label_html: { class: "" },
        # content_html: { class: "col-sm-10" }
        # hint_wrapper_html:  { class: "col-sm-4" },
        # error_wrapper_html: { class: "col-sm-4" }
        required: false,
    }
  end

  def edit_link(*args, &block)
    options = args.extract_options!
    args.unshift(%(<i class="fa fa-pencil-alt"></i> #{t('links.edit', scope: :views)}).html_safe) if block.nil?
    link_to(*args, options, &block)
  end

  def new_link(*args, &block)
    options = args.extract_options!
    args.unshift(%(<i class="fa fa-edit"></i> #{i18n('links.new', model: options[:model], scope: :views)}).html_safe) if block.nil?
    link_to(*args, options, &block)
  end

  def delete_link(*args, &block)
    options = args.extract_options!
    options[:method] ||= "delete"
    options[:data] ||= {}
    options[:data][:confirm] ||= t('links.delete_confirm', scope: :views)
    args.unshift(%(<i class="fa fa-times"></i> #{t('links.delete', scope: :views)}).html_safe) if block.nil?
    link_to(*args, options, &block)
  end

  def return_button(default_url, *args, &block)
    options = args.extract_options!
    options[:class] ||= "btn btn-outline-secondary"
    args.unshift(ok_url_or_default(default_url))
    args.unshift(t('links.return', scope: :views).html_safe) if block.nil?
    link_to(*args, options, &block)
  end

  def indent(prefix, content)
    (content || "").gsub(/^/, prefix).html_safe
  end

  def content_color(text)
    hex = Digest::MD5.hexdigest(text)[0, 6]
    "##{hex}"
  end

  def foreground_color(hex)
    color = Sass::Script::Value::Color.from_hex(hex)
    color.lightness > 68 ? "#444" : "#FFF"
  end

  def color_css(text)
    background_color = content_color(text)
    foreground_color = foreground_color(background_color)
    "background-color: #{background_color}; color: #{foreground_color};"
  end

  class SearchLink < Ransack::Helpers::FormHelper::SortLink
    attr_writer :search_params

    def search_params
      @search_params ||= super
    end

    def sort_params
      @search.sorts
    end
  end

  def search_url(search, attributes = {})
    s = SearchLink.new(search, {}, [], params)
    s.search_params = s.search_params.merge(attributes)

    url_for(s.url_options)
  end

  class SearchLabel < Hashie::Dash
    property :dom_id
    property :name
    property :tmpl
    property :defaults
    property :context
    property :layout

    def to_label(options = {})
      html_options = defaults.dup
      html_options[:class] = [html_options[:class], options.delete(:class)].compact.join(" ").presence
      html_options = html_options.deep_merge(options)
      html_options[:id] = dom_id
      html_options[:data] ||= {}
      html_options[:data][:tmpl] = tmpl
      context.link_to(name, "javascript:void(0)", html_options)
    end
  end

  def search_item(dom_id, name, options = {}, &block)
    tmpl = render(layout: "backend/shared/search_item_input", locals: { dom_id: dom_id }, &block)
    SearchLabel.new(name: name, tmpl: tmpl, dom_id: dom_id, defaults: options, context: self)
  end

  def current_url(attributes = {})
    options = params.permit!.to_h.deep_merge(attributes)
    url_for(options)
  end
end