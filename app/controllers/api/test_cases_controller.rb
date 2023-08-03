class Api::TestCasesController < Api::BaseController
  load_resource :project
  load_resource through: :project

  def index

  end
end