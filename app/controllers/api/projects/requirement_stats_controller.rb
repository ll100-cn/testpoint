class Api::Projects::RequirementStatsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :storyboard, through: :project

  def index
    roadmap_id = params[:roadmap_id]&.to_i

    if roadmap_id.present?
      test_cases_stat_scope = @project.test_cases.where(roadmap_id: roadmap_id)
      test_cases_stat_scope = test_cases_stat_scope.where_exists(@storyboard.requirements.where_table(:test_cases))
      @test_case_stats = test_cases_stat_scope.group(:requirement_id).count
    else
      @test_case_stats = {}
    end
  end
end