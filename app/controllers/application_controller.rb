require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery with: :exception

  before_action :adjust_format_for_xhr_html

protected
  def adjust_format_for_xhr_html
    request.format = :xhrml if request.format.to_sym == :html && (request.xhr? || params[:xhr])
  end

  def ok_url_or_default(default)
    params[:ok_url] || default
  end
  helper_method :ok_url_or_default
end
