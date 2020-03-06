class Profiles::BasicsController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { authorize! :manage, :profile }

  def show
  end

  def update
    @user.update(user_params)
    respond_with @user, action: :show, location: ok_url_or_default(action: :show)
  end

protected
  def user_params
    params.fetch(:user, {}).permit(:name)
  end
end
