class Api::TestCaseStatsController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, class: TestCase.to_s, instance_name: 'test_case', through_association: :test_cases

  def index
    @q = @test_cases.ransack(params[:q])
    @test_cases = @q.result

    if params[:version_at].present?
      version_at = Time.parse(params[:version_at])
      @test_cases = TestCase.filter_by_version_at(@test_cases, version_at)
    else
      latest_milestone = @project.milestones.ranked.first
      if latest_milestone&.published_at?
        @test_cases = @test_cases.where("archived_at is NULL OR archived_at > ?", latest_milestone.published_at)
      end
    end

    @mapping = @test_cases.group_by { |it| [ it.archived, it.role_name, it.scene_path ] }
  end
end