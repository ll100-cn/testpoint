require "application_responder"
require 'custom_cancan_controller_resource'
require 'allow_graph_addons'

class ApplicationController < ActionController::Base
  include AllowGraphAddons

  self.responder = ApplicationResponder
  respond_to :html

  before_action :set_raven_context

  rescue_from CanCan::AccessDenied do |exception|
    if current_user
      render plain: "AccessDenied", status: :forbidden
    else
      render plain: "Unauthorized", status: :unauthorized
    end
  end

protected
  def ok_url_or_default(default)
    params[:ok_url] || default
  end
  helper_method :ok_url_or_default

  def set_raven_context
    Raven.user_context(id: current_user&.id)
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def current_member
    nil
  end
  helper_method :current_member

  def current_ability
    @current_ability ||= Ability.new(current_user)
  end

  class << self
    def cancan_resource_class
      CustomCancanControllerResource
    end
  end
end
