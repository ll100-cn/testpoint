class Projects::PlatformsController < BaseProjectController
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  def new
  end

  def create
    @platform.save
    respond_with @platform, location: ok_url_or_default([@project, TestCase])
  end

  def update
    @platform.update(platform_params)

    respond_with @platform, location: ok_url_or_default([@project, TestCase])
  end

  def destroy
    @platform.archive
    respond_with @platform, location: ok_url_or_default([@project, TestCase])
  end

protected
  def platform_params
    params.fetch(:platform, {}).permit(:name)
  end
end
