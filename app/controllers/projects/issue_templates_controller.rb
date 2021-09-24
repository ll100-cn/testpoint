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
    result = [:name, :lookup_by_build_form, :title_suggestion, :content_suggestion,
      :default_category_id, :default_priority, inputs_attributes: [:id, :order_index, :category, :_destroy]]
    result
  end
  helper_method :permit_attributes
end
