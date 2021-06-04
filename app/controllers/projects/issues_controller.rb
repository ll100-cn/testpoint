class Projects::IssuesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  helper_method :issue_params_names

  def index
    @q = @issues.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?
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

    template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
    @issue_build_form = IssueBuildForm.new(template: template, issue: @issue)
    @issue_build_form.prepare
  end

  def create
    with_email_notification do
      @task = Task.find(params[:task_id]) if params[:task_id]
      @issue.creator ||= current_member
      @issue.tasks = [ @task ] if @task
      @issue.subscribed_users = @project.members.where(receive_mail: true).map(&:user) if @issue.subscribed_users.empty?

      @template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
      @issue_build_form = IssueBuildForm.new(template: @template, issue: @issue)
      @issue_build_form.prepare

      @issue_build_form.submit(issue_build_form_params)
    end
    respond_with @issue_build_form, location: ok_url_or_default(action: :index)
  end

  def show
  end

  def edit
  end

  def edit_project
  end

  def update_project
    with_email_notification do
      @issue.change_project_with_author(issue_params, current_member)
    end
    
    respond_with @issue, action: :edit_project, location: project_issue_path(@issue.reload.project, @issue)
  end

  def templates
  end

  def update
    with_email_notification do
      @issue.update_with_author(issue_params, current_member)
    end

    respond_with @issue, location: ok_url_or_default(action: :show)
  end

protected
  def issue_build_form_params
    params.fetch(:issue_build_form, {}).permit(
      issue_attributes: [:title, :creator_id, :content],
      info_attributes: [inputs_attributes: [:template_input_id, :value]])
  end

  def issue_params
    params.fetch(:issue, {}).permit(*issue_params_names)
  end

  def issue_params_names
    names = [ :title, :content, :state, :milestone_id, :assignee_id, :template_id, :project_id,
       attachment_ids: [], label_ids: [], subscribed_user_ids: [],
       template_ids: []]
    names += [ :creator_id ] if can? :critical, Issue
    names
  end

  def with_email_notification
    issue_before = @issue.clone
    yield
    issue_after = @issue.clone
    issue_before.assign_attributes(issue_after.attributes)
    if (changes = issue_after.changes).any?
      current_user.subscribe(@issue)
      @issue.notify_changed_by(current_member, changes)
    end
  end
end
