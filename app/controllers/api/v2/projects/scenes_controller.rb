class Api::V2::Projects::ScenesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :storyboard, through: :project
  load_and_authorize_resource through: :storyboard

  def index
  end

  def create
    @scene.save
    respond_with @scene
  end

  def update
    @scene.update(scene_params)
    respond_with @scene
  end

  def destroy
    @scene.destroy
    respond_with @scene
  end

protected
  def scene_params
    params.permit(:name)
  end
end
