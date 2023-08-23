class Api::PhaseController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
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
