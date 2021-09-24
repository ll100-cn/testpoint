class Projects::CategoriesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @categories = @categories.page(params[:page])
  end

  def new
    @category.color = "#ace0ef"
  end

  def create
    @category.save
    respond_with @category, location: ok_url_or_default(action: :index)
  end

  def show
  end

  def edit
  end

  def update
    @category.update(category_params)
    respond_with @category, location: ok_url_or_default(action: :index)
  end

  def destroy
    @category.destroy
    respond_with @category, location: ok_url_or_default(action: :index)
  end

protected
  def category_params
    params.fetch(:category, {}).permit(:name, :description, :color)
  end
end
