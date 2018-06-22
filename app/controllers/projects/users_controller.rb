class Projects::UsersController < BaseProjectController
  before_action { @navbar = "Users" }
  before_action -> { @project = current_project }
  authorize_resource :project, parent: false, singleton: true

  def index
    @q = @project.members.ransack(params[:q])
    @users = @q.result.page(params[:page])
  end
end
