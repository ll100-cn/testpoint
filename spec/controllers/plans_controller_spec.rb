require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let!(:plan) { create :plan, title: "user sign in" }

  describe "GET index" do
    # let!(:plan1) { create :plan, title: "for index" }
    # let(:task1) { create :task, state: "failure", plan_id: plan1.id }
    # let(:task2) { create :task, state: "pending", plan_id: plan1.id }
    # tasks_mapping = Task.joins(:plan).merge(Plan.all)
    #                     .select(:plan_id, :state, "count(1) AS count")
    #                     .group(:plan_id, :state)
    #                     .each_with_object({}) do |task, result|
    #   result[task.plan_id] ||= {}
    #   result[task.plan_id][task.state] = task.count
    # end
    # result = { "pending"=>1, "failure"=>1 }
    action { get :index }
    it {
      # expect(tasks_mapping[plan1.id]).to eq(result)
      is_expected.to respond_with :success
    }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

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