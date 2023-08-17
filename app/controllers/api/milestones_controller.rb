class Api::MilestonesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @milestones = @milestones.ranked
  end

  def create
    @milestone.save
    respond_with @milestone
  end

  def show
  end

  def update
    @milestone.update(milestone_params)
    respond_with @milestone
  end

  def destroy
    @milestone.destroy
    respond_with @milestone
  end

  def archive
    @milestone.archive
    respond_with @milestone
  end

protected
  def milestone_params
    params.permit(:title, :description, :published_at)
  end
end