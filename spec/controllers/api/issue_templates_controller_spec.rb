require 'rails_helper'

RSpec.describe Api::IssueTemplatesController, type: :controller do
  let!(:project) { create :project }
  let!(:category) { create :category }
  let!(:template) { create :issue_template, project: project, default_category: category }
  let(:superadmin) { create :user, :superadmin }
  before { sign_in superadmin }

  describe "GET index" do
    let!(:attributes) { { project_id: project.id } }
    action { get :index, params: attributes, format: :json }

    it { is_expected.to respond_with :success }
  end
end
