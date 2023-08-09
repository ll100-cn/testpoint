class Api::TestCasesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @test_case_snapshot = @project.test_case_snapshots.where(id: params[:test_case_snapshot_id]).first


    if @test_case_snapshot
      @test_cases = TestCase.filter_by_version_at(@test_cases, @test_case_snapshot.version_at)
    else
      latest_snapshot = @project.test_case_snapshots.ranked.first
      if latest_snapshot
        @test_cases = @test_cases.where("archived_at is NULL OR archived_at > ?", latest_snapshot.version_at)
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