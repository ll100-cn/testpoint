class Projects::IssueSurveysController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def index
  end

  def new
  end

  def create
    @issue_surveys.save
    respond_with @issue_surveys
  end

  def edit
  end

  def update
    @issue_surveys.assign_attributes(issue_survey_params)
    @issue_surveys.submit_and_save
    respond_with @issue_surveys
  end

  def destroy
    @issue_surveys.destroy
    respond_with @issue_surveys, location: ok_url_or_default([@project, @issue])
  end

protected
  def issue_survey_params
    params.fetch(:issue_survey, {}).permit(*permit_attributes)
  end

  def permit_attributes
    result = [:template_id, :remark, inputs_attributes: [:template_input_id, :value]]
    result
  end
  helper_method :permit_attributes
end
