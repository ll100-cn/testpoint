require 'rails_helper'

RSpec.describe MilestonesController, type: :controller do
  let!(:milestone) { create :milestone }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "milestone2", description: "description for milestone1", due_date: 2.days.from_now } }
    action { post :create, params: { milestone: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "milestone3" } }
    action { put :update, params: { id: milestone.id, milestone: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: milestone.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: milestone.id } }
    it { expect { do_action }.to change { Milestone.count }.by(-1) }
  end
end
