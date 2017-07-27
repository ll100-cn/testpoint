require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery with: :exception

protected
  def ok_url_or_default(default)
    params[:ok_url] || default
  end
  helper_method :ok_url_or_default
end
