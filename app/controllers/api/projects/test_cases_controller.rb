class Api::Projects::TestCasesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @milestone = @project.milestones.where(id: params[:milestone_id]).first

    if @milestone&.published_at?
      @test_cases = TestCase.filter_by_version_at(@test_cases, @milestone.published_at)
    else
      latest_milestone = @project.milestones.ranked.first
      if latest_milestone&.published_at?
        @test_cases = @test_cases.where("archived_at is NULL OR archived_at > ?", latest_milestone.published_at)
      end
    end
  end

  def show
  end

  def create
    @test_case.save
    respond_with @test_case
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case
  end

  def destroy
    @test_case.archive
    respond_with @test_case
  end

  def history
    @versions = @test_case.versions.where(event: 'update').reverse
    @history = @versions.map do |version|
      test_case = TestCase.new
      test_case.assign_attributes(version.object)
      test_case
    end
  end

protected
  def test_case_params
    params.permit(:title, :role_name, :content, :scene_name, :group_name, label_ids: [], platform_ids: [])
  end
end
