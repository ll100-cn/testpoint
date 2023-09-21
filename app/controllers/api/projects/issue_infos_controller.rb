class Api::Projects::IssueInfosController < Api::BaseController
  before_action { @user = current_user }
  load_and_authorize_resource :project, through: :user
  load_and_authorize_resource :issue, parent: false, through: :project

  def show
  end


#   load_and_authorize_resource :project
#   load_and_authorize_resource through: :project

#   def index
#     @stage = params[:stage] || "pending"
#     @keyword = params[:keyword].presence

#     @issues = @issues.includes(:assignee).references(:assignee)
#     @issues = @issues.includes(:creator).references(:creator)
#     @issues = @issues.includes(:category).references(:category)
#     issues_scope = @issues

#     issues_scope = issues_scope.where(stage: @stage) if @stage != "all"
#     if @keyword
#       issues_scope = issues_scope.where_exists(Comment.where("content LIKE ?", "%#{@keyword}%").where_table(:issue))
#         .or(issues_scope.where("title LIKE ? or content LIKE ?", "%#{@keyword}%", "%#{@keyword}%"))
#     end
#     @issue_searcher = IssueSearcher.from(issues_scope, params)
#     @issues_scope = @issue_searcher.result

#     @filter_issues_scope = @issues_scope.unscope(:order)
#     @q = @issues_scope.ransack(params[:q])
#     @q.sorts = "updated_at desc" if @q.sorts.empty?
#     @issues = @q.result.page(params[:page])
#     kaminari_headers(@issues)
#   end

#   def show
#   end

#   def create
#     with_email_notification do
#       @issue.creator ||= current_member

#       @template = @project.issue_templates.find(params[:issue_template_id]) if params[:issue_template_id].present?
#       @issue_build_form = IssueBuildForm.new(template: @template, issue: @issue)
#       @issue_build_form.prepare
#       @issue_build_form.submit(issue_build_form_params)
#     end
#     @issue = @issue_build_form.issue
#     respond_with @issue_build_form, location: ok_url_or_default(action: :index)
#   end

#   def update
#     with_email_notification do
#       @issue.update_with_author(issue_params, current_member)
#     end

#     respond_with @issue
#   end

#   def destroy
#     @issue.destroy
#     respond_with @issue
#   end

#   def archive
#     @issue.archive(current_member)
#     respond_with @issue
#   end

#   def unresolve
#     @success = @issue.unresolve(unresolve_params)
#     respond_with @issue
#   end

#   def summary
#     @stage = params[:filter] || "assign"
#     @keyword = params[:keyword].presence

#     @issues = @issues.includes(:assignee).references(:assignee)
#     @issues = @issues.includes(:creator).references(:creator)
#     @issues = @issues.includes(:category).references(:category)
#     issues_scope = @issues

#     issues_scope = issues_scope.where(stage: @stage) if @stage != "all"
#     if @keyword
#       issues_scope = issues_scope.where_exists(Comment.where("content LIKE ?", "%#{@keyword}%").where_table(:issue))
#         .or(issues_scope.where("title LIKE ? or content LIKE ?", "%#{@keyword}%", "%#{@keyword}%"))
#     end
#     @issue_searcher = IssueSearcher.from(issues_scope, params)
#   end

#   def activities
#     @issue_activities = @issue.activities
#   end

#   def target_relationships
#     @issue_target_relationships = @issue.target_relationships
#   end

#   def source_relationships
#     @issue_source_relationships = @issue.source_relationships
#   end

#   def attachments
#     @attachments = @issue.attachments
#   end

#   def migrate
#     with_email_notification do
#       @issue.change_project_with_author(migrate_params, current_member)
#     end

#     respond_with @issue
#   end

# protected
#   def unresolve_params
#     params.permit(:content, attachment_ids: [])
#   end

#   def migrate_params
#     params.permit(:targert_project_id, :category_id)
#   end

#   def issue_build_form_params
#     params.permit(
#       :from_task_id,
#       issue_attributes: [:priority, :title, :creator_id, :content],
#       info_attributes: [inputs_attributes: [:template_input_id, :value]]
#     )
#   end

#   def issue_params_names
#     names = [
#       :priority, :title, :content, :state, :milestone_id, :assignee_id,
#       :template_id, :project_id, :category_id, :task_id, :targert_project_id,
#       attachment_ids: [],
#       subscribed_user_ids: [],
#       template_ids: []
#     ]
#     names += [ :creator_id ] if can? :critical, Issue
#     names
#   end

#   def issue_params
#     params.permit(*issue_params_names)
#   end

#   def with_email_notification
#     yield
#     if (changes = @issue.previous_changes).any?
#       @issue.notify_creator if changes.fetch("state", []).last == "resolved"
#       current_user.subscribe(@issue)
#       @issue.notify_changed_by(current_member, changes)
#     end
#   end
end
