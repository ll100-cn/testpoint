class Projects::IssuesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  helper_method :issue_params_names

  def index
    @filter = params[:filter] || "assign"
    @keyword = params[:keyword].presence
    @issues_scope = @issues

    @issue_filter_state_counts = @issues_scope.group(:state, "assignee_id IS NOT NULL", "archived_at IS NOT NULL").count.transform_keys do |it|
      [ :state, :assignee_id_is, :archived_at_is ].zip(it).to_h
    end

    @issues_scope = @issues_scope.filter_state_is(@filter) if @filter != "all"
    if @keyword
      @issues_scope = @issues_scope.where_exists(Comment.where("content LIKE ?", "%#{@keyword}%").where_table(:issue))
        .or(@issues_scope.where("title LIKE ? or content LIKE ?", "%#{@keyword}%", "%#{@keyword}%"))
    end
    @issue_searcher = IssueSearcher.from(@issues_scope, params.fetch(:search, {}))
    @issues_scope = @issue_searcher.result

    @filter_issues_scope = @issues_scope.unscope(:order)
    @q = @issues_scope.ransack(params[:q])
    @q.sorts = params[:sorts] if params[:sorts]
    @issues_scope = @q.result.page(params[:page])
    @issues_scope = @issues_scope.includes(:project).references(:project)
    @issues = @issues_scope
  end

  def new
    @issue.creator ||= current_member
    @issue.title ||= @issue.default_title
    @issue.content ||= @issue.default_content

    template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
    @issue_build_form = IssueBuildForm.new(template: template, issue: @issue)
    @issue_build_form.prepare
  end

  def create
    with_email_notification do
      @issue.creator ||= current_member

      @template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
      @issue_build_form = IssueBuildForm.new(template: @template, issue: @issue)
      @issue_build_form.prepare

      @issue_build_form.submit(issue_build_form_params)
    end
    respond_with @issue_build_form, location: ok_url_or_default(action: :index)
  end

  def show
    if @issue.archived_at
      flash[:alert] = "该问题已归档"
    end
  end

  def edit
  end

  def migrate
  end

  def update_project
    with_email_notification do
      @issue.change_project_with_author(issue_params, current_member)
    end

    respond_with @issue, action: :edit_project, location: project_issue_path(@issue.reload.project, @issue)
  end

  def templates
  end

  def archive
    @issue.archive(current_member)
    respond_with @issue, location: ok_url_or_default(action: :show)
  end

  def unresolve
    unless request.get?
      @success = @issue.unresolve(unresolve_params)
      respond_with @issue, location: ok_url_or_default(action: :show)
    end
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
      issue_attributes: [:priority, :title, :creator_id, :content],
      info_attributes: [inputs_attributes: [:template_input_id, :value]]
    )
  end

  def issue_params
    params.fetch(:issue, {}).permit(*issue_params_names)
  end

  def unresolve_params
    params.fetch(:issue, {}).permit(:content, attachment_ids: [])
  end

  def issue_params_names
    names = [
      :priority, :title, :content, :state, :milestone_id, :assignee_id,
      :template_id, :project_id, :category_id,
      attachment_ids: [],
      subscribed_user_ids: [],
      template_ids: []
    ]
    names += [ :creator_id ] if can? :critical, Issue
    names
  end

  def with_email_notification
    yield
    if (changes = @issue.previous_changes).any?
      @issue.notify_creator if changes.fetch("state", []).last == "resolved"
      current_user.subscribe(@issue)
      @issue.notify_changed_by(current_member, changes)
    end
  end
end
