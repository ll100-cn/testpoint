require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let!(:plan) { create :plan, title: "user sign in" }
  let!(:test_case1) { create :test_case }
  let!(:test_case2) { create :test_case }
  let!(:test_case3) { create :test_case }


  describe "GET index" do
    let!(:task) { create :task, test_case_id: test_case1, plan_id: plan.id }
    # let(:attributes) { { title: "plans" } }
    # let(:platform) { create :platform }
    # let(:component) { create :component }
    # let(:plan1) { create :plan, title: "plan1" }
    # let(:plan2) { create :plan, title: "plan2" }

    # 新建testcase，然后调用genarate 让它走一次create
    # let(:plan1) { create :plan, title: "plan1" }
    # let(:test_case) { create :test_case }
    # it "response with success " do
    #   plan1.generate(test_case_ids: [test_case.id] || TestCase.ids )
    #   action { get :index }
    #   expect(response).to have_http_status(:success)
    # end

    # test_cases_scope = TestCase
    # test_cases_scope = test_cases_scope.joins(:component).where(components: { id: params[:component_ids] }) if params[:component_ids].present?
    # test_cases_scope = test_cases_scope.joins(:platforms).where(platforms: { id: params[:platform_ids] }) if params[:platform_ids].present?
    # test_case_ids = test_cases_scope.ids
    #
    # @plan.generate(test_case_ids: test_case_ids || TestCase.ids)
    # plan1.generate(test_case_ids: TestCase.ids )

    # action { post :create, params: { plan: attributes, platform_ids: [platform.id], component_ids: [component.id] } }
    # action { post :create, params: { plan1: attributes, platform_ids: Platform.ids, component_ids: Component.ids } }
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  # describe "POST create without platform or component" do
  #   let(:attributes) { { title: "user change password" } }
  #   action { post :create, params: { plan: attributes } }
  #   it { is_expected.to respond_with :redirect }
  # end

  # describe "POST create with platform and component" do
  #   let(:attributes) { { title: "user change password" } }
  #   action { post :create, params: { plan: attributes, platform_ids: Platform.ids, component_ids: Component.ids } }
  #   it { is_expected.to respond_with :redirect }
  # end

  describe "POST create" do
    let(:attributes) { { title: "user change password" } }
    action { post :create, params: { plan: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "user sign out" } }
    action { put :update, params: { id: plan.id, plan: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: plan.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: plan.id } }
    it { expect { do_action }.to change { Plan.archived.count }.by(1) }
  end
end