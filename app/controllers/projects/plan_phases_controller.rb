class Projects::PlanPhasesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan

  def new
  end

  def create
    @task.save
    respond_with @task, location: -> { ok_url_or_default [ @project, @plan ] }
  end

  def edit
  end

  def update
    @task.save
    respond_with @task, location: -> { ok_url_or_default [ @project, @plan ] }
  end

protected
  def plan_phase_params
    params.fetch(:plan_phase, {}).permit(:title, :app_version)
  end
end
