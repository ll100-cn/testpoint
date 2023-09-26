class Api::Projects::TestCaseLabelInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :test_case_label, through: :project, parent: false

  def index
  end

  def show
  end

  def create
    @test_case_label.save
    respond_with @test_case_label
  end

  def update
    @test_case_label.update(test_case_label_params)
    respond_with @test_case_label
  end

  def destroy
    @test_case_label.destroy
    respond_with @test_case_label
  end

protected
  def test_case_label_params
    params.permit(:name, :description)
  end
end
