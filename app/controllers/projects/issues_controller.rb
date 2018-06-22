class Projects::IssuesController < BaseProjectController
  before_action { @navbar = "Issues" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  load_and_authorize_resource :task
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
    respond_with @issue, location: ok_url_or_default([@project, @task.plan])
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
