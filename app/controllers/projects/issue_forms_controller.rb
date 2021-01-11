class Projects::IssueFormsController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def index
  end

  def new
  end

  def create
    @issue_form.save
    respond_with @issue_form
  end

  def edit
  end

  def update
    @issue_form.assign_attributes(issue_form_params)
    @issue_form.submit_and_save
    respond_with @issue_form
  end

protected
  def issue_form_params
    params.fetch(:issue_form, {}).permit(*permit_attributes)
  end

  def permit_attributes
    result = [:template_id, :remark, inputs_attributes: [:template_input_id, :value]]
    result
  end
  helper_method :permit_attributes
end
