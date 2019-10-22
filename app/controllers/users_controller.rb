class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    @q = @users.ransack(params[:q])
    @users = @q.result.page(params[:page])
  end

  def new
  end

  def create
    @user.password = SecureRandom.hex(4)
    @user.password_confirmation = @user.password
    @user.send_activation_instructions unless @user.confirmed? if @user.save

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
    params.fetch(:user, {}).permit(:name, :email)
  end
end
