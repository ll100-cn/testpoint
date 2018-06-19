class MembersController < ApplicationController
  load_and_authorize_resource :project

  def index
    @q = @project.members.ransack(params[:q])
    @users = @q.result.page(params[:page])
  end
end
