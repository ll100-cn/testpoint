class Projects::IssuesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  helper_method :issue_params_names

  def index
    @q = @issues.ransack(params[:q])
    @q.sorts = "state_at desc" if @q.sorts.empty?
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
      @issues_scope = @issues_scope.subscribed_issues(current_member)
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
    with_email_notification do
      @task = Task.find(params[:task_id]) if params[:task_id]
      @issue.creator ||= current_member
      @issue.tasks = [ @task ] if @task
      @issue.save
    end
    respond_with @issue, location: ok_url_or_default(action: :index)
  end

  def show
  end

  def edit
  end

  def update
    with_email_notification do
      @issue.update_with_editor(issue_params, current_member)
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

  def with_email_notification
    creating = proc(&:new_record?)
    assigning = proc(&:assignee_id_changed?)
    changing_state = proc(&:state_changed?)

    @issue.assign_attributes(issue_params)
    case @issue
    when creating then @issue.notify_created_by(current_member) if yield
    when assigning then  @issue.notify_assigned_by(current_member) if yield
    when changing_state then @issue.notify_state_changed_by(current_member) if yield
    end
  end
end
