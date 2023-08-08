class Projects::TestCaseSnapshotsController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
  end

  def new
  end

  def create
    @test_case_snapshot.save
    respond_with @test_case_snapshot, location: ok_url_or_default([@project, :test_cases])
  end

  def edit
  end

  def update
    @test_case_snapshot.update(test_case_snapshot_params)
    respond_with @test_case_snapshot, location: ok_url_or_default([@project, :test_cases])
  end

  def destroy
    @test_case_snapshot.destroy
    respond_with @test_case_snapshot, location: ok_url_or_default([@project, :test_cases])
  end

protected
  def test_case_snapshot_params
    params.fetch(:test_case_snapshot, {}).permit(:title, :version_at, :description)
  end
end
