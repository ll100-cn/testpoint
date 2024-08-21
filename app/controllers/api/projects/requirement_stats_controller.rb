class Api::Projects::RequirementStatsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :storyboard, through: :project

  def index
    roadmap_id = params[:roadmap_id]&.to_i

    if roadmap_id.present?
      @test_case_stats = @project.test_cases.where(roadmap_id: roadmap_id, storyboard_id: @storyboard.id).group(:requirement_id).count
    else
      @test_case_stats = {}
    end
  end
end