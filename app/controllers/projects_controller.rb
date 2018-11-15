class ProjectsController < BaseProjectController
  load_and_authorize_resource

  def index
    @projects = @projects.page(params[:page])
  end

  def new
  end

  def create
    @project.assign_attributes(members_attributes: [ { role: "owner", project: @project, user: current_user } ])
    @project.save
    respond_with @project, location: ok_url_or_default(Project)
  end

  def edit
  end

  def update
    @project.update(project_params)
    respond_with @project, location: ok_url_or_default(Project)
  end

  def show
    @users = @project.members.page(params[:page])
    redirect_to project_issues_path(@project)
  end

  def destroy
    @project.delete
    respond_with @project, location: ok_url_or_default(Project)
  end

protected
  def project_params
    params.fetch(:project, {}).permit(:name, user_ids: [])
  end

  def current_project
    @project unless @project&.new_record?
  end
end
