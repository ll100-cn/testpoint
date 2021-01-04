class Projects::AnalyticsController < BaseProjectController
  load_and_authorize_resource :project

  def index
  end

  def issue_creator_chart
    @issue_creator_chart = IssueCreatorChart.new(issue_creator_chart_params.merge(project_id: @project.id))
  end

  protected
  def issue_creator_chart_params
    params.fetch(:issue_creator_chart, {}).permit(:project_id, :starts_on, :ends_on, :role)
  end
end
