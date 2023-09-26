class Api::Projects::IssueSurveysController < Api::Projects::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def index
    @issue_surveys = @issue.issue_surveys.ranked
  end

  def create
    @issue_survey.save
    respond_with @issue_survey
  end

  def update
    @issue_survey.assign_attributes(issue_survey_params)
    @issue_survey.submit_and_save
    respond_with @issue_survey
  end

  def destroy
    @issue_survey.destroy
    respond_with @issue_survey
  end

protected
  def issue_survey_params
    params.permit(*permit_attributes)
  end

  def permit_attributes
    result = [:template_id, :remark, inputs_attributes: [:template_input_id, :value]]
    result
  end
  helper_method :permit_attributes
end
