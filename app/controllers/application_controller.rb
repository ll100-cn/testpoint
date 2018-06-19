require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  before_action :adjust_format_for_xhr_html
  before_action :set_raven_context

  layout :layout_by_resource

protected
  def adjust_format_for_xhr_html
    request.format = :xhrml if request.format.to_sym == :html && (request.xhr? || params[:xhr])
  end

  def ok_url_or_default(default)
    params[:ok_url] || default
  end
  helper_method :ok_url_or_default

  def set_raven_context
    Raven.user_context(id: current_user&.id)
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def layout_by_resource
    devise_controller? ? 'frontend' : 'application'
  end
end
