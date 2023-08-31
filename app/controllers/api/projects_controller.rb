class Api::ProjectsController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource through: :user

  def show
  end
end
