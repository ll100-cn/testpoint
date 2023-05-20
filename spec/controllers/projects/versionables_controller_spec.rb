require 'rails_helper'

RSpec.describe Projects::VersionablesController, type: :controller do
  let!(:project) { create :project }
  let(:test_case_version) { create :test_case_version, project: project }
  let!(:test_case) { create :test_case, project: project }
  login_superadmin

  describe "GET new" do
    let(:params) { { project_id: project.id, test_case_id: test_case.id } }
    action { get :new, params: params, format: :xhrml }

    context "success" do
      it { is_expected.to respond_with :success }
    end
  end

  describe "POST create" do
    let(:attributes) { { category: 'current' } }
    action { post :create, format: :xhrml, params: { versionable: attributes.merge(test_case_version_id: test_case_version.id), project_id: project.id, test_case_id: test_case.id } }

    context "success" do
      it { is_expected.to respond_with :redirect }
    end
  end

  describe "GET edit" do
    let!(:versionable) { create :versionable, test_case: test_case, test_case_version: test_case_version, category: 'current' }
    let(:params) { { project_id: project.id, test_case_id: test_case.id, id: versionable.id } }
    action { get :edit, params: params, format: :xhrml }

    context "success" do
      it { is_expected.to respond_with :success }
    end
  end

  describe "PUT update" do
    let!(:versionable) { create :versionable, test_case: test_case, test_case_version: test_case_version, category: 'current' }
    let(:attributes) { { category: 'current' } }
    action { put :update, format: :xhrml, params: { versionable: attributes.merge(test_case_version_id: test_case_version.id), project_id: project.id, test_case_id: test_case.id, id: versionable.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    let!(:versionable) { create :versionable, test_case: test_case, test_case_version: test_case_version, category: 'current' }
    action(skip: true) { delete :destroy, params: { id: versionable.id, project_id: project.id, test_case_id: test_case.id } }
    it { expect { do_action }.to change { Versionable.count }.by(-1) }
  end
end
