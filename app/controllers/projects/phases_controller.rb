class Projects::PhasesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan

  def new
    @phase.set_default_value
  end

  def create
    @phase.assign_attributes(phase_params)
    @phase.submit
    respond_with @phase, location: -> { ok_url_or_default [ @project, @plan, { phase_index: @phase.index } ] }
  end

protected
  def phase_params
    params.fetch(:phase, {}).permit(:title, :release_revision)
  end
end
