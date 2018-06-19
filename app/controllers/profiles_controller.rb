class ProfilesController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  authorize_resource :user, parent: false, singleton: true
  layout "frontend"

  def show
  end

  def update
    if user_params.values_at(*password_param_names).any?(&:present?)
      @user.update_with_password(user_params)
    else
      @user.update(user_params)
    end
    respond_with @user, action: :show, location: ok_url_or_default(action: :show)
  end

protected
  def user_params
    params.fetch(:user, {}).permit(:email, :name, *password_param_names)
  end

  def password_param_names
    [:current_password, :password, :password_confirmation]
  end
end
