class Account::UsersController < ApplicationController
  load_and_authorize_resource

  def show
  end

  def edit
  end

  def update
    if @user.update_with_password(user_params)
      bypass_sign_in(@user)
      redirect_to account_user_path
    elsif @user.update(user_params)
      redirect_to account_user_path
    else
      render :edit
    end
  end

protected

  def user_params
    params.fetch(:user, {}).permit(:avatar, :password, :password_confirmation)
  end
end
