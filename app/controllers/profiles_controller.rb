class ProfilesController < ApplicationController
  load_and_authorize_resource :user, parent: false
  before_action -> { @profile = current_user }

  def show
  end

  def update
    @profile.update(user_params)
    redirect_to profile_path, notice: t('.success')
  end

  def update_password
    @profile.update_with_password(user_params)
    bypass_sign_in(@profile)
    redirect_to root_path, notice: t('.success')
  end

protected

  def user_params
    params.fetch(:user, {}).permit(:name, :current_password, :password, :password_confirmation)
  end
end
