class UsersController < ApplicationController
  load_and_authorize_resource
  before_action { @navbar = "Users" }

  def index
    @users = @users.page(params[:page])
  end

  def new
    @user = User.new
  end

  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:notice] = "修改成功"
      redirect_to edit_user_path
    else
      render "edit"
    end
  end

  protected

  def user_params
    params.fetch(:user).permit(:time_zone, :profile_attributes => [:id, :legal_name, :birthday, :location, :education, :occupation, :bio, :speciality])
  end

end
