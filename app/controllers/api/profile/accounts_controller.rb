class Api::Profile::AccountsController < Api::BaseController
  before_action -> { @user = current_user }

  def show
    if @user.nil?
      render json: {}, status: :unauthorized
    end
  end

  def update
    authorize! :manage, :profile
    @user.update(user_params)
    respond_with @user
  end

protected
  def user_params
    params.permit(:name, :avatar)
  end
end
