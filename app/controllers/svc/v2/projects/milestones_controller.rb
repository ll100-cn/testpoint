class Svc::V2::Projects::MilestonesController < Svc::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @milestones = @milestones.ranked

    if params[:filter] == 'available'
      @milestones = @milestones.available
    end
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

  def active
    @milestone.active
    respond_with @milestone
  end

  protected

  def milestone_params
    params.permit(:title, :description, :published_at)
  end
end
