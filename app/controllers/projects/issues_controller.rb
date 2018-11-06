class Projects::IssuesController < BaseProjectController
  before_action { @navbar = "Issues" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  helper_method :issue_params_names

  def index
    @q = @project.issues.ransack(params[:q])
    @q.sorts = "created_at desc" if @q.sorts.empty?

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
    @task = Task.find(params[:task_id]) if params[:task_id]
    @issue.creator ||= current_user
    @issue.tasks = [ @task ] if @task
    @issue.title ||= @issue.default_title
    @issue.content ||= @issue.default_content
  end

  def create
    @task = Task.find(params[:task_id]) if params[:task_id]
    @issue.creator ||= current_user
    @issue.tasks = [ @task ] if @task
    @issue.save
    respond_with @issue, location: ok_url_or_default(action: :index)
  end

  def show
  end

  def edit
  end

  def update
    @issue.last_updated_at = Time.current
    @issue.update(issue_params)
    respond_with @issue, location: ok_url_or_default(action: :show)
  end

protected
  def issue_params
    params.fetch(:issue, {}).permit(*issue_params_names)
  end

  def issue_params_names
    names = [ :title, :content, :state, :milestone_id, :assignee_id,
             label_ids: [], issue_attachments_attributes: [:id, :attachment_id, :_destroy] ]
    names += [ :creator_id ] if can? :critical, Issue
    names
  end
end
