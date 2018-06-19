class ProjectsController < ApplicationController
  load_and_authorize_resource
  layout "frontend", only: [:index, :new, :edit]
  def index
    @projects = @projects.page(params[:page])
  end

  def new
  end

  def create
    @project.save
    respond_with @project, location: ok_url_or_default(Project)
  end

  def edit
  end

  def update
    @project.update(project_params)
    @project.change_member_role
    respond_with @project, location: ok_url_or_default(Project)
  end

  def show
    @members = @project.members.page(params[:page])
  end

  def destroy
    @project.delete
    respond_with @project, location: ok_url_or_default(Project)
  end

  def remove_member
    @user = User.find(params[:user_id])
    @project.remove_member(@user)
    respond_with @project, location: ok_url_or_default([@project, :members])
  end

protected

  def project_params
    params.fetch(:project, {}).permit(:name, member_ids: [])
  end
end
