class Svc::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to :json

protected
  def kaminari_headers(pagy)
    response.headers['X-Pagination-Total-Count'] = pagy.total_count
    response.headers['X-Pagination-Limit'] = pagy.limit_value || 0
    response.headers['X-Pagination-Offset'] = (pagy.current_page - 1) * pagy.limit_value
  end
end
