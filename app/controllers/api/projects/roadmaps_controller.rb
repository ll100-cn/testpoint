class Api::Projects::RoadmapsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @roadmaps
  end

  def create
    @roadmap.submit
    respond_with @roadmap
  end

  def update
    @roadmap.update(roadmap_params)
    respond_with @roadmap
  end
protected
  def roadmap_params
    params.permit(:title)
  end
end
