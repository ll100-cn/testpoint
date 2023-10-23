class Api::Projects::AnalyticsController < Api::Projects::BaseController
  before_action -> { @project = current_project }

  def show
  end

  def issue_creator_chart
    @issue_creator_chart = IssueCreatorChart.new(issue_creator_chart_params)
  end

  def issue_activity_chart
    @issue_activity_chart = IssueActivityChart.new(issue_activity_chart_params)
  end

protected
  def issue_creator_chart_params
    params.permit(:project_id, :starts_on, :ends_on, :role).merge(project_id: @project.id)
  end

  def issue_activity_chart_params
    params.permit(:project_id, :starts_on, :ends_on, :role).merge(project_id: @project.id)
  end
end
