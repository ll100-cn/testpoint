class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  respond_to :json

  def current_ability
    super.tap { |a| a.apply_api_permissions(current_user) }
  end

  def current_member
    @current_member ||= @project&.members&.where(user_id: current_user)&.take
  end

protected
  def kaminari_headers(pagy)
    response.headers['X-Pagination-Total-Count'] = pagy.total_pages
    response.headers['X-Pagination-Limit'] = pagy.limit_value || 0
    response.headers['X-Pagination-Offset'] = (pagy.current_page - 1) * pagy.limit_value
  end
end
