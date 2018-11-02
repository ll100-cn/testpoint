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
    if params[:related_task]
      @task = Task.find(params[:related_task])
    end

    if params[:filter] == "created"
      @issues = @issues.created_issues(current_user)
    end

    if params[:filter] == "assigned"
      @issues = @issues.assigned_issues(current_user)
    end
  end

  def new
    @issue.title ||= @issue.default_title
    @issue.content ||= @issue.default_content
  end

  def create
    @issue.creator = current_user
    @issue.save
    @task.update(issue_id: @issue.id)
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
    params.fetch(:issue, {}).permit(:title, :content, :state, :milestone_id, :assignee_id,
                                    label_ids: [], issue_attachments_attributes: [:id, :attachment_id, :_destroy])
  end

  def set_tasks
    @issue.tasks = [@task]
  end
end
