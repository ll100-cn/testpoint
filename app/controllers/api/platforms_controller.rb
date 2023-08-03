class Api::PlatformsController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index

  end
end