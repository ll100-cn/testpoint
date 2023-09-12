class Api::UsersController < Api::BaseController
  load_and_authorize_resource

  def index
    @users_scope = @users
    @users_scope = @users_scope.ransack(params[:q]).result

    @users = @users_scope.page(params[:page])
    kaminari_headers(@users)
  end

  def create
    @user.save
    respond_with @user
  end

  def show
  end

  def update
    @user.update(user_params)
    respond_with @user
  end

  def destroy
    if !@user.destroy
      @user.errors.add(:base, "无法删除")
    end

    respond_with @user
  end

protected

  def user_params
    params.permit(:email, :name)
  end
end
