class Api::Projects::IssuesController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project, authorization_action: ->(action) {
    { archive: :create, unresolve: :create, body: :update }[action]
  }

  def index
    @stage = params[:stage] || "pending"
    @keyword = params[:keyword].presence

    @issues = @issues.includes(:assignee).references(:assignee)
    @issues = @issues.includes(:creator).references(:creator)
    @issues = @issues.includes(:category).references(:category)
    issues_scope = @issues

    issues_scope = issues_scope.where(stage: @stage) if @stage != "all"
    if @keyword
      issues_scope = issues_scope.where_exists(Comment.where("content LIKE ?", "%#{@keyword}%").where_table(:issue))
        .or(issues_scope.where("title LIKE ? or content LIKE ?", "%#{@keyword}%", "%#{@keyword}%"))
    end
    @issue_searcher = IssueSearcher.from(issues_scope, params)
    @issues_scope = @issue_searcher.result

    @filter_issues_scope = @issues_scope.unscope(:order)
    @q = @issues_scope.ransack(params[:q])
    @q.sorts = params[:sorts] if params[:sorts]
    @q.sorts = "updated_at desc" if @q.sorts.empty?
    @issues = @q.result.page(params[:page])
    kaminari_headers(@issues)
  end

  def show
  end

  def create
    with_email_notification do
      @issue.creator ||= current_member

      @template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
      @issue_build_form = IssueBuildForm.new(template: @template, issue: @issue)
      @issue_build_form.prepare
      @issue_build_form.submit(issue_build_form_params)
    end
    @issue = @issue_build_form.issue
    respond_with @issue_build_form, location: ok_url_or_default(action: :index)
  end

  def destroy
    @issue.destroy
    respond_with @issue
  end

protected

  def issue_build_form_params
    issue_names = [ :priority, :title, :content, attachments_params: [ :id, :title ] ]
    issue_names << :creator_id if can? :manage, Issue

    params.permit(
      :from_task_id,
      issue_attributes: issue_names,
      survey_attributes: [inputs_attributes: [:template_input_id, :value]]
    )
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
