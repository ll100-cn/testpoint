class IssuesController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { @issues = Issue.where(project: @user.projects) }

  def index
    sorts = "updated_at desc"
    sorts = params[:q].delete("s") if params.dig(:q, :s).present?

    @q = @issues.ransack(params[:q])
    @q.state_filter ||= "opening"

    @issues_scope = @q.result.unscope(:order).sorted.order(sorts)
    @q.sorts = sorts

    @issues_state_counts = @issues_scope.unscope(:order, where: :state).group(:state).count
    @issues = @issues_scope.page(params[:page])
  end

  def assigned_to_me
    @issues = @issues.where(assignee: @user.members)
    @q = @issues.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?
    @q.state_filter ||= "opening"

    @issues_scope = @q.result

    @issues_state_counts = @issues_scope.unscope(:order, where: :state).group(:state).count
    @issues = @issues_scope.page(params[:page])
  end
end
