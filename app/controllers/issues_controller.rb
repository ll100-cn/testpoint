class IssuesController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { @issues = Issue.where(project: @user.projects) }

  def my
    issues_my = @issues.where(creator: @user.members)
                .or(@issues.where_exists(@user.subscriptions.where_table(:issue))).where.not(state: :archived)
    issues_asssigned_to_me = @issues.where(assignee: @user.members).where.not(state: :archived)

    issues_archived = @issues.where(creator: @user.members)
                      .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
                      .or(@issues.where(assignee: @user.members))
                      .where(state: :archived)
  
    @issues_counts = { my: issues_my.count,
                       assigned: issues_asssigned_to_me.count,
                       archived: issues_archived.count }

    @issues = issues_my

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def assigned
    issues_my = @issues.where(creator: @user.members)
                .or(@issues.where_exists(@user.subscriptions.where_table(:issue))).where.not(state: :archived)
    issues_asssigned_to_me = @issues.where(assignee: @user.members).where.not(state: :archived)

    issues_archived = @issues.where(creator: @user.members)
                      .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
                      .or(@issues.where(assignee: @user.members))
                      .where(state: :archived)
  
    @issues_counts = { my: issues_my.count,
                       assigned: issues_asssigned_to_me.count,
                       archived: issues_archived.count }

    @issues = issues_asssigned_to_me

    @q = @issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
  end

  def archived
    issues_my = @issues.where(creator: @user.members)
                .or(@issues.where_exists(@user.subscriptions.where_table(:issue))).where.not(state: :archived)
    issues_asssigned_to_me = @issues.where(assignee: @user.members).where.not(state: :archived)

    issues_archived = @issues.where(creator: @user.members)
                      .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
                      .or(@issues.where(assignee: @user.members))
                      .where(state: :archived)
  
    @issues_counts = { my: issues_my.count,
                       assigned: issues_asssigned_to_me.count,
                       archived: issues_archived.count }

    @issues = issues_archived

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
end
