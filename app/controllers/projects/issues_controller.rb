class Projects::IssuesController < BaseProjectController
  before_action { @navbar = "Issues" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  helper_method :issue_params_names

  def index
    @q = @issues.ransack(params[:q])
    @q.sorts = "created_at desc" if @q.sorts.empty?
    @q.state_filter = "opening" if @q.state_filter.blank?
    @issues_scope = @q.result

    if params[:related_task]
      @task = Task.find(params[:related_task])
    end

    if params[:filter] == "created"
      @issues_scope = @issues_scope.created_issues(current_member)
    end

    if params[:filter] == "assigned"
      @issues_scope = @issues_scope.assigned_issues(current_member)
    end

    if params[:filter] == "subscribed"
      @issues_scope = @issues_scope.subscribed_issues(current_user)
    end

    @issues_state_counts = @issues_scope.unscope(:order, where: :state).group(:state).count
    @issues = @issues_scope.with_labels.page(params[:page])
  end

  def new
    @task = Task.find(params[:task_id]) if params[:task_id]
    @issue.creator ||= current_member
    @issue.tasks = [ @task ] if @task
    @issue.title ||= @issue.default_title
    @issue.content ||= @issue.default_content
  end

  def create
    @task = Task.find(params[:task_id]) if params[:task_id]
    @issue.creator ||= current_member
    @issue.tasks = [ @task ] if @task
    if @issue.save
      @issue.deliver_changed_notification(current_member, with_chief: true)
    end
    respond_with @issue, location: ok_url_or_default(action: :index)
  end

  def show
  end

  def edit
  end

  def update
    if @issue.update_with_editor(issue_params, current_member)
      @issue.deliver_changed_notification(current_member)
    end

    respond_with @issue, location: ok_url_or_default(action: :show)
  end

protected
  def issue_params
    params.fetch(:issue, {}).permit(*issue_params_names)
  end

  def issue_params_names
    names = [ :title, :content, :state, :milestone_id, :assignee_id, attachment_ids: [],
             label_ids: [] ]
    names += [ :creator_id ] if can? :critical, Issue
    names
  end
end
