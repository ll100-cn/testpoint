class Api::TestCasesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case
  end

protected
  def test_case_params
    params.permit(:title, :role_name, :content, :scene_name, label_ids: [], platform_ids: [])
  end
end