class Api::Profile::IssuesController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource parent: false, with_scope: ->(base) { base.where(project_id: @user.available_projects) }

  def index
    @issues_scope = @issues

    @issues_scope = @issues_scope.includes(:assignee).references(:assignee)
    @issues_scope = @issues_scope.includes(:creator).references(:creator)
    @issues_scope = @issues_scope.includes(:category).references(:category)

    case params[:filter]
    when 'created'
      @issues_scope = @issues_scope.where(creator_id: @user.members).where(archived_at: nil)
    when 'subscribed'
      @issues_scope = @issues_scope.where_exists(@user.subscriptions.where_table(:issue)).where(archived_at: nil)
    when 'assigned'
      @issues_scope = @issues_scope.where(assignee_id: @user.members).where(archived_at: nil)
    when 'archived'
      @issues_scope =  @issues_scope.where(creator_id: @user.members)
                        .or(@issues_scope.where_exists(@user.subscriptions.where_table(:issue)))
                        .or(@issues_scope.where(assignee_id: @user.members))
                        .where.not(archived_at: nil)
    when 'unhandled'
      @issues_scope = @issues_scope.where(archived_at: nil)
      conds = []
      conds << Issue.where(creator_id: @user.members, state: [ :waiting, :resolved, :closed ])
      conds << Issue.where(assignee_id: @user.members, state: [ :confirmed, :processing ])
      conds << Issue.where_exists(Member.where(role: ["owner", "manager"], user_id: @user.id).where("members.project_id = issues.project_id")).where_any_of(
        Issue.where({ state: :confirmed, assignee_id: nil }),
        Issue.where({ state: [ :pending, :processed, :deploying ] })
      )

      @issues_scope = @issues_scope.where_any_of(*conds)
    else
      @issues_scope = @issues_scope.none
    end

    @issues = @issues_scope.sorted.page(params[:page]).per(params[:per_page] || 20)
    kaminari_headers(@issues)
  end
end