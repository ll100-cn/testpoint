class Api::IssueTemplatesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @issue_templates = @issue_templates.includes(:default_category).references(:default_category)
  end

  def create
    @issue_template.save
    respond_with @issue_template
  end

protected
  def issue_template_params
    params.permit(*permit_attributes)
  end

  def permit_attributes
    result = [
      :name, :lookup_by_build_form, :title_suggestion, :content_suggestion,
      :default_category_id, :default_priority,
      inputs_attributes: [:id, :order_index, :label, :_destroy]
    ]
    result
  end
  helper_method :permit_attributes
end
