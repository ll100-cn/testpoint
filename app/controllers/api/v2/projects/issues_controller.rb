class Api::V2::Projects::IssuesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project, authorization_action: ->(action) {
    { merge: :manage, process2: :process, summary: :index }[action]
  }

  def index
    @stage = params[:stage] || "pending"
    @keyword = params[:keyword].presence

    all_issues_scope = @issues

    issues_scope = all_issues_scope
    issues_scope = issues_scope.where(stage: @stage) if @stage != "all"
    if @keyword
      keyword_scope = issues_scope
      words = @keyword.presence.split
      conditions = words.map do |word|
        keyword_scope.where_any_of(
          Issue.where_exists(Comment.where("content LIKE ?", "%#{word}%").where_table(:issue)),
          Issue.where("title LIKE ? or content LIKE ?", "%#{word}%", "%#{word}%")
        )
      end
      issues_scope = issues_scope.where_any_of(*conditions)
    end
    @issue_searcher = IssueSearcher.from(issues_scope, params)
    @issues_scope = @issue_searcher.result

    @filter_issues_scope = @issues_scope.unscope(:order)
    @q = @issues_scope.ransack(params[:q])
    @q.sorts = params[:sorts] if params[:sorts]
    @q.sorts = "updated_at desc" if @q.sorts.empty?
    @issues = @q.result.page(params[:page]).per(params[:limit] || 25)

    if resource_graph_columns.include?("counts")
      @project_issue_stats = all_issues_scope.group(:project_id, :stage, :category_id).select(:project_id, :stage, :category_id, "COUNT(*) as count")
    end
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

  def merge
    form_params = params.permit(source_ids: [])
    @form = IssueMergeForm.new(form_params)
    @form.project = @project
    @form.head = @issue
    @form.submit(current_member)
    respond_with @form
  end

  def resolve
    if @issue.resolve(resolve_params, current_member)
      IssueNotifyJob.perform_later(@issue.id)
    end
    respond_with @issue
  end

  def process2
    if @issue.process(process_params, current_member)
      IssueNotifyJob.perform_later(@issue.id)
    end
    respond_with @issue
  end

  def summary
    @issues_scope = IssueSearcher.build_scope(@issues, search_params)

    @categories_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:category_id_eq)).group(:category).count
    @milestone_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:milestone_id_eq)).group(:milestone).count
    @assignee_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:assignee_id_eq)).group(:assignee).count
    @creator_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:creator_id_eq)).group(:creator).count
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

  def resolve_params
    ActionController::Parameters.new(request.request_parameters).permit(:action, comment_attributes: [
      :content, attachments_params: [ :id, :title ]
    ])
  end

  def process_params
    params.permit(:state)
  end

  def search_params
    params.permit(:keyword, :stage)
  end

  def filter_params
    params.permit(:category_id_eq, :milestone_id_eq, :assignee_id_eq, :creator_id_eq)
  end
end