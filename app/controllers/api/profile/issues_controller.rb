class Api::Profile::IssuesController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource :project, parent: false
  load_and_authorize_resource parent: false, with_scope: ->(base) { base.where(project_id: @projects.ids) }

  def index
    @issues = @issues.includes(:assignee).references(:assignee)
    @issues = @issues.includes(:creator).references(:creator)
    @issues = @issues.includes(:category).references(:category)

    case params[:filter]
    when 'created'
      @issues = @issues.where(creator: @user.members).where(archived_at: nil)
    when 'focused'
      @issues = @issues.where_exists(@user.subscriptions.where_table(:issue)).where(archived_at: nil)
    when 'assigned'
      @issues = @issues.where(assignee: @user.members).where(archived_at: nil)
    when 'archived'
      @issues =  @issues.where(creator: @user.members)
                        .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
                        .or(@issues.where(assignee: @user.members))
                        .where.not(archived_at: nil)
    end

    @issues_scope = @issues
    @issues_scope = @issues_scope.ransack(params[:q]).result.sorted

    @issues = @issues_scope.page(params[:page]).per(params[:per_page] || 20)
    kaminari_headers(@issues)
  end
end