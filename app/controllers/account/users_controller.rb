class Account::UsersController < ApplicationController
  load_and_authorize_resource

  def show
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to account_user_path, alert: "更新资料成功"
    else
      render :edit
    end
  end

  def update_password
    @user = current_user
    if @user.update_with_password(user_params)
      bypass_sign_in(@user)
      redirect_to root_path, alert: "密码更新成功"
    else
      render :edit
    end
  end

protected

  def user_params
    params.fetch(:user, {}).permit(:avatar, :name, :current_password, :password, :password_confirmation)
  end
end
