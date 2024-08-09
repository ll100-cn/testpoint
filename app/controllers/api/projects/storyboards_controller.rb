class Api::Projects::StoryboardsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @storyboards = @storyboards.ranked
  end

  def show
  end

  def create
    @storyboard.save
    respond_with @storyboard
  end

  def update
    @storyboard.update(storyboard_params)
    respond_with @storyboard
  end

  def destroy
    @storyboard.archive
    respond_with @storyboard
  end
protected
  def storyboard_params
    params.permit(:title, :description, :main_axle)
  end
end