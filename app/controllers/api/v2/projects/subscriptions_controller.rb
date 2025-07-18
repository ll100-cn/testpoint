class Api::V2::Projects::SubscriptionsController < Api::V2::Projects::BaseController
  load_resource :project
  load_resource :issue, through: :project
  load_resource through: :current_user, find_by: :issue_id, id_param: :issue_id
  before_action -> { @user = current_user }

  def create
    @subscription.issue = @issue
    @subscription.save
    respond_with @subscription
  end

  def destroy
    @subscription.destroy
    respond_with @subscription
  end
end
