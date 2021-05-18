class Profiles::IssuesController < BaseProjectController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { @issues = Issue.where(assignee_id: @user.members.ids) }

  def index
    @q = @issues.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?
    @q.state_filter = "opening" if @q.state_filter.blank?
  
    @issues_scope = @q.result

    @issues_state_counts = @issues_scope.unscope(:order, where: :state).group(:state).count
    @issues = @issues_scope.with_labels.page(params[:page])
  end
end
