class Api::AccountsController < Api::BaseController
  before_action -> { @user = current_user }

  def show
  end
end
