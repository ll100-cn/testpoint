class Api::IssueTemplatesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @issue_templates = @issue_templates.includes(:default_category).references(:default_category)
  end
end