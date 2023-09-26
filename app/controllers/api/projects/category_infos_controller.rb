class Api::Projects::CategoryInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :category, through: :project, parent: false

  def index
    @categories = @categories.page(params[:page])
    kaminari_headers(@categories)
  end

  def create
    @category.save
    respond_with @category
  end

  def show
  end

  def update
    @category.update(category_params)
    respond_with @category
  end

  def destroy
    @category.destroy
    respond_with @category
  end

protected
  def category_params
    params.permit(:name, :description, :color)
  end
end
