require 'rails_helper'

RSpec.describe TestCasesController, type: :controller do
  let(:platform) { create :platform }
  let!(:test_case) { create :test_case, platforms: [ platform ] }

  describe "GET index" do
    let(:params) { {} }
    action { get :index, params: params }

    context "without params" do
      it { is_expected.to respond_with :success }
    end

    context "with platform" do
      let(:params) { { platform_id: platform.id } }
      it { is_expected.to respond_with :success }
    end
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:component) { create :component }
    let(:platform) { create :platform }
    let(:attributes) { { title: "user change password", content: "input password and password_confirmation" } }
    action { post :create, params: { test_case: attributes.merge(component_id: component.id, platform_ids: [platform.id]) } }

    context "success" do
      it { is_expected.to respond_with :redirect }
    end

    context "invalid" do
      before { attributes[:title] = "" }
      it { is_expected.to render_template :new }
    end
  end

  describe "PUT update" do
    let(:attributes) { { title: "user sign out" } }
    action { put :update, params: { id: test_case.id, test_case: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: test_case.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: test_case.id } }
    it { expect { do_action }.to change { TestCase.archived.count }.by(1) }
  end
end
