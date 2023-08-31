class Api::TestCaseLabelInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :test_case_label, through: :project, parent: false

  def index
  end
end
