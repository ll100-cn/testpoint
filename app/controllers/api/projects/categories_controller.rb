class Api::Projects::CategoriesController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @categories
  end
end
