class Api::V2::Projects::CategoriesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @categories
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
