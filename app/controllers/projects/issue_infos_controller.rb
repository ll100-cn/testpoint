class Projects::IssueInfosController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def index
  end

  def new
  end

  def create
    @issue_info.save
    respond_with @issue_info
  end

  def edit
  end

  def update
    @issue_info.assign_attributes(issue_info_params)
    @issue_info.submit_and_save
    respond_with @issue_info
  end

protected
  def issue_info_params
    params.fetch(:issue_info, {}).permit(*permit_attributes)
  end

  def permit_attributes
    result = [:template_id, :remark, inputs_attributes: [:template_input_id, :value]]
    result
  end
  helper_method :permit_attributes
end
