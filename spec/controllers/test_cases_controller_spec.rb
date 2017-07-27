require 'rails_helper'

RSpec.describe TestCasesController, type: :controller do
  let(:count) { 5 }
  let!(:test_cases) { create_list :test_case, count, title: "user sign in", content: "input username and password" }

  describe "GET index" do
    action { get :index }

    it { expect(TestCase.count).to eq count }
  end

  describe "GET new" do
    action { get :new }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:component) { create :component }
    let(:platform) { create :platform }
    let(:new_test_case) { { title: "user change password", content: "input password and password_confirmation" } }
    let(:create_request) { post :create, params: { test_case: new_test_case.merge({component_id: component.id, platform_id: platform.id}) } }

    it { expect { create_request }.to change { TestCase.count }.from(count).to(count + 1) }
  end

  describe "PUT update" do
    let(:test_case) { test_cases.first }
    let(:new_title) { "user sign out" }

    action { put :update, params: { id: test_case.id, test_case: { title: new_title } } }

    it { expect(test_case.reload.title).to eq new_title }
  end

  describe "GET show" do
    let(:test_case) { test_cases.first }

    action { get :show, params: { id: test_case.id } }

    it { expect(test_case).to eq assigns(:test_case) }
  end
end
