require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let(:count) { 5 }
  let!(:plans) { create_list :plan, count, title: "user sign in" }

  describe "GET index" do
    action { get :index }

    it { expect(Plan.count).to eq count }
  end

  describe "GET new" do
    action { get :new }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:new_test_case) { { title: "user change password" } }
    let(:create_request) { post :create, params: { plan: new_test_case } }

    it { expect { create_request }.to change { Plan.count }.from(count).to(count + 1) }
  end

  describe "PUT update" do
    let(:plan) { plans.first }
    let(:new_title) { "user sign out" }

    action { put :update, params: { id: plan.id, plan: { title: new_title } } }

    it { expect(plan.reload.title).to eq new_title }
  end

  describe "GET show" do
    let(:plan) { plans.first }

    action { get :show, params: { id: plan.id } }

    it { expect(plan).to eq assigns(:plan) }
  end
end
