class Projects::ComponentsController < BaseProjectController
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  def new
    @component.parent_id = params[:parent_id].presence
  end

  def create
    @component.save
    respond_with @component, location: ok_url_or_default([@project, TestCase])
  end

  def edit
  end

  def update
    @component.update(component_params)
    respond_with @component, location: ok_url_or_default([@project, TestCase])
  end

  def destroy
    @component.archive
    respond_with @component, location: ok_url_or_default([@project, TestCase])
  end

protected
  def component_params
    params.fetch(:component, {}).permit(:name, :parent_id)
  end
end
