class Api::Projects::RequirementsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :storyboard, through: :project
  load_and_authorize_resource through: :storyboard

  def index
    @requirements
  end

  def create
    @requirement.project = @project
    @requirement.save
    respond_with @requirement
  end

  def update
    @requirement.update(requirement_params)
    respond_with @requirement
  end

  def destroy
    @requirement.destroy
    respond_with @requirement
  end
protected
  def requirement_params
    params.permit(:title, :description, :roles, platform_ids: [], upstream_ids: [], label_ids: [], label_descriptions: {})
  end
end
