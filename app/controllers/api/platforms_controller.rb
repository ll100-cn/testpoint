class Api::PlatformsController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @platforms = @platforms.available
  end

  def new
  end

  def create
    @platform.save
    respond_with @platform
  end

  def update
    @platform.update(platform_params)

    respond_with @platform
  end

  def destroy
    @platform.archive
    respond_with @platform
  end

protected
  def platform_params
    params.permit(:name, :default_assignee_id)
  end
end
