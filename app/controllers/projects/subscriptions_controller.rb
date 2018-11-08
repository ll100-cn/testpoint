class Projects::SubscriptionsController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue, through: :project
  load_resource :subscription
  before_action -> { @user = current_user }

  def create
    @subscription = Subscription.new(user_id: @user.id, issue_id: @issue.id)
    @subscription.save
  end

  def destroy
    @subscription.destroy
  end
end
