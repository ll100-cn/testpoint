class Api::Projects::PhasesController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :plan, through: :project
  load_and_authorize_resource through: :plan

  def create
    @phase.assign_attributes(phase_params)
    @phase.submit
    respond_with @phase
  end

protected
  def phase_params
    params.permit(:title, :release_revision)
  end
end
