class Api::Projects::TestCaseLabelsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
  end
end
