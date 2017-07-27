class PlatformsController < ApplicationController
  load_and_authorize_resource

  def new
  end

  def create
    @platform.save

    respond_with @platform, location: [ ::TestCase ]
  end

  def update
    @platform.update(platform_params)

    respond_with @platform, location: [ ::TestCase ]
  end

  def destroy
    @platform.destroy

    respond_with @platform, location: [ ::TestCase ]
  end

protected
  def platform_params
    params.fetch(:platform, {}).permit(:name)
  end
end
