class IssuesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  load_and_authorize_resource :task

  before_action { @navbar = "Issues" }
  before_action :set_tasks, only: [:new, :create]

  def index
    @q = @project.issues.ransack(params[:q])
    @issues = @q.result.with_labels.page(params[:page])
  end

  def new
    @issue.title ||= @issue.default_title
  end

  def create
    @issue.creator = current_user
    @issue.save
<<<<<<< 26e97bcced77583c0ffc1a5dc9ce253a43709a5d
    respond_with @issue, location: ok_url_or_default([@task.plan])
=======
    respond_with @component, location: ok_url_or_default([@project, @task.plan])
>>>>>>> add project
  end

  def show
  end

  def edit
  end

  def update
    @issue.update(issue_params)
    respond_with @issue, location: ok_url_or_default(action: :show)
  end

protected

  def issue_params
    params.fetch(:issue, {}).permit(:title, :content, :state, :milestone_id, :assignee_id, label_ids: [])
  end

  def set_tasks
    @issue.tasks = [@task]
  end
end
