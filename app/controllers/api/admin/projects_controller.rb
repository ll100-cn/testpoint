class Api::Admin::ProjectsController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource

  def index
    @projects_scope = @user.projects
    @projects_scope = @projects_scope.ransack(params[:q]).result
    @projects = @projects_scope.page(params[:page])

    kaminari_headers(@projects)
  end

  def show
  end

  def create
    @project.save
    respond_with @project
  end

  def update
    @project.update(project_params)
    respond_with @project
  end

  def destroy
    @project.archive
    respond_with @project
  end

protected

  def project_params
    params.permit(:name)
  end
end
