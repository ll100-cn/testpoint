class ProjectsController < BaseProjectController
  before_action -> { @user = current_user }
  load_and_authorize_resource through: :user

  def index
    @projects = @projects.available.page(params[:page]).order(:created_at)
  end

  def new
  end

  def create
    @project.assign_attributes(members_attributes: [ { role: "owner", project: @project, user: current_user } ])
    if @project.save
      @project.issue_templates.create(name: "DEFAULT")
    end
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
    cookies[:last_login_project] = @project.id
    redirect_to project_issues_path(@project)
  end

  def archive
    @project.archive
    respond_with @project, location: ok_url_or_default(Project)
  end

  def subscribe
    @user.subscribe(@project)
    respond_with @project, location: ok_url_or_default(Project)
  end

  def unsubscribe
    @user.unsubscribe(@project)
    respond_with @project, location: ok_url_or_default(Project)
  end

  def vue
  end

protected
  def project_params
    params.fetch(:project, {}).permit(:name, user_ids: [])
  end
end
