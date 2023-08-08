class Api::TestCasesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @test_case_version = @project.test_case_snapshots.where(id: params[:test_case_snapshot_id]).first

    if @test_case_version
      @test_cases = @test_cases.where_exists(TestCaseRecord.where("changed_at <= ?", @test_case_version.version_at).where_table(:test_case))




      @test_cases.each do |test_case|
        if test_case.updated_at > @test_case_version.version_at
          test_case.content = test_case.paper_trail.version_at(@test_case_version.version_at).content
        else

        end
      end
    end
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case
  end

protected
  def test_case_params
    params.permit(:title, :role_name, :content, :scene_name, :group_name, label_ids: [], platform_ids: [])
  end
end