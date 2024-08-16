class Api::Admin::ProjectsController < Api::BaseController
  before_action -> { authorize! :manage, :admin }
  load_and_authorize_resource

  def index
    @projects_scope = @projects
    @projects_scope = @projects_scope.ransack(params[:q]).result
    @projects = @projects_scope.page(params[:page]).per(params[:limit])

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
    params.permit(:name, :trello_list_id, :trello_api_key, :trello_api_token, :webhook_url)
  end
end
