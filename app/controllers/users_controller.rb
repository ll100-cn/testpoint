class UsersController < ApplicationController
  load_and_authorize_resource
  before_action { @navbar = "Users" }

  def index
    @q = User.ransack(params[:q])
    @users = @q.result.page(params[:page])
  end

  def new
  end

  def create
    @user.save
    respond_with @user, location: -> { ok_url_or_default([User]) }
  end

  def show
  end

  def edit
  end

  def update
    @user.update(user_params)
    respond_with @user, location: -> { ok_url_or_default([User]) }
  end

  def destroy
    @user.delete
    respond_with @user, location: -> { ok_url_or_default([User]) }
  end

protected

  def user_params
    params.fetch(:user, {}).permit(:email, :password, :password_confirmation)
  end
end
