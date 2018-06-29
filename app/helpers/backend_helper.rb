module BackendHelper
  def backend_search_form_for(*args, &block)
    options = {
      html: { class: "form-inline backend-search-form" }
    }.deep_merge(args.extract_options!)
    options[:defaults] = backend_search_form_defaults.deep_merge(options[:defaults] || {})

    apply_bootstrap_inline_form_options!(options)

    search_form_for(*args, options, &block)
  end

  def backend_search_form_defaults
    {
      label_html: { class: "" },
      required: false
    }
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

  def current_url(attributes = {})
    options = params.permit!.to_h.deep_merge(attributes)
    url_for(options)
  end
end
