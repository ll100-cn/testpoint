class Projects::IssueTemplatesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
  end

  def new
  end

  def create
    @issue_template.save
    respond_with @issue_template, location: ok_url_or_default([@project, IssueTemplate])
  end

  def edit
  end

  def update
    @issue_template.update(issue_template_params)
    respond_with @issue_template, location: ok_url_or_default([@project, IssueTemplate])
  end

protected
  def issue_template_params
    params.fetch(:issue_template, {}).permit(*permit_attributes)
  end

  def permit_attributes
    result = [:name, inputs_attributes: [:id, :label, :_destroy]]
    result
  end
  helper_method :permit_attributes
end