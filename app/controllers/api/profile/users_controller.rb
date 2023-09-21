class Api::Profile::UsersController < Api::BaseController
  before_action -> { @user = current_user }
  before_action -> { authorize! :manage, :profile }

  def update
    @user.update(user_params)
    respond_with @user
  end

protected
  def user_params
    params.permit(:name, :avatar)
  end
end
