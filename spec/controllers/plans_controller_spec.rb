require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let!(:plan) { create :plan, title: "user sign in" }

  describe "GET index" do
    let!(:task1) { create :task, plan_id: plan.id }
    let!(:task2) { create :task, plan_id: plan.id }
    action { get :index }
    it { is_expected.to respond_with :success }
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
