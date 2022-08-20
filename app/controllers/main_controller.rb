class MainController < ApplicationController
  before_action { @user = current_user }
  before_action :authenticate_user!

  def root
    redirect_to dashboard_path
  end

  def dashboard
    @projects = @user.projects.available.order(:created_at)
    @issues_mappings = Issue.where(project_id: @projects.ids).group(:project_id, :category_id, :state, "assignee_id IS NOT NULL", "archived_at IS NOT NULL").count.transform_keys do |it|
      [ :project_id, :category_id, :state, :assignee_id_is, :archived_at_is ].zip(it).to_h
    end
    @categories = Category.all.to_a

    issue_stat
  end

protected
  def issue_stat
    @issues_scope = Issue.joins(:creator).where(archived_at: nil).joins(:project).merge(Project.available)
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
