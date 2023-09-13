class Api::Profile::MainController < Api::BaseController
  before_action { @user = current_user }

  def root
    if @user.nil?
      render json: {}, status: :unauthorized
    end
  end
end