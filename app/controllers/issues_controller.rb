class IssuesController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { @issues = Issue.where_exists(Member.where(user_id: @user.id).where("issues.project_id = members.project_id")) }
  before_action -> { issue_stat }

  def dashboard
    @issues = @issues_unhandled

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def created
    @issues_created = @issues.where(creator: @user.members).where(archived_at: nil)
    @issues = @issues_created

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def focused
    @issues_focused = @issues.where_exists(@user.subscriptions.where_table(:issue)).where(archived_at: nil)
    @issues = @issues_focused

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def assigned
    @issues_assigned_to_me = @issues.where(assignee: @user.members).where(archived_at: nil)
    @issues = @issues_assigned_to_me

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def archived
    @issues_archived = @issues.where(creator: @user.members)
                      .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
                      .or(@issues.where(assignee: @user.members))
                      .where.not(archived_at: nil)
    @issues = @issues_archived

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def new
    @issue = Issue.new
  end

  def create
    @project = @user.projects.find(issue_params[:project_id])
    redirect_to [:new, @project, :issue]
  end

  def issue_params
    params.fetch(:issue, {}).permit(:project_id)
  end

protected
  def issue_stat
    @issues_scope = Issue.joins(:creator).where(archived_at: nil)
    conds = []
    conds << Issue.joins(:creator).where(creator: { user_id: @user.id }, state: [ :waiting, :resolved, :closed ])
    conds << Issue.where_exists(Member.where(user_id: @user.id).where("members.id = issues.assignee_id")).where(state: [ :confirmed, :processing ])
    conds << Issue.where_exists(Member.where(role: ["owner", "manager"], user_id: @user.id).where("members.project_id = issues.project_id")).where_any_of(
      Issue.where({ state: :confirmed, assignee_id: nil }),
      Issue.where({ state: [ :pending, :processed, :deploying ] })
    )

    @issues_unhandled = @issues_scope.where_any_of(*conds)
    @issues_counts = { unhandled: @issues_unhandled.count }
  end
end
