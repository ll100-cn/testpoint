class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  respond_to :json

  def current_ability
    super.tap { |a| a.apply_api_permissions(current_user) }
  end
end