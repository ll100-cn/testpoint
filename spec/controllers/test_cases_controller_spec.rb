require 'rails_helper'

RSpec.describe TestCasesController, type: :controller do
  let!(:test_case) { create :test_case }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:component) { create :component }
    let(:platform) { create :platform }
    let(:attributes) { { title: "user change password", content: "input password and password_confirmation" } }
    action { post :create, params: { test_case: attributes.merge(component_id: component.id, platform_id: platform.id) } }
    it { is_expected.to respond_with :redirect }
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
end
