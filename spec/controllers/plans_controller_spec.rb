require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let(:plan) { create :plan, title: "user sign in" }

  describe "GET index" do
    action { get :index }

    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "user change password" } }
    let(:create_request) { post :create, params: { plan: attributes } }

    it { expect { create_request }.to change { Plan.count }.from(0).to(1) }
  end

  describe "PUT update" do
    let(:attributes) { { title: "user sign out" } }

    action { put :update, params: { id: plan.id, plan: attributes } }

    it { expect(plan.reload.title).to eq attributes[:title] }
  end

  describe "GET show" do
    action { get :show, params: { id: plan.id } }

    it { expect(plan).to eq assigns(:plan) }
  end
end
