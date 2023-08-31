class Api::CategoryInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :category, through: :project, parent: false

  def index
    @categories = @categories.page(params[:page])
    kaminari_headers(@categories)
  end
end
