class ApplicationResponder < ActionController::Responder
  include Responders::FlashResponder
  include Responders::HttpCacheResponder

  # Redirects resources to the collection path (index action) instead
  # of the resource path (show action) for POST/PUT/DELETE requests.
  # include Responders::CollectionResponder
  def to_xhrml
    if get? || !has_errors? || response_overridden?
      to_html
    else
      render action: default_action, status: :unprocessable_entity
    end
  end

  def json_resource_errors
    {
      errors: resource.errors,
      error_messages: resource.errors.full_messages,
      names: resource.errors.attribute_names.index_with do |key|
        (key == :base) ? nil : resource.class.human_attribute_name(key)
      end
    }
  end
end
