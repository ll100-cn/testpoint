require 'rails_helper'

RSpec.describe Projects::MilestonesController, type: :controller do
  let!(:project) { create :project }
  let!(:milestone) { create :milestone, project: project }

  describe "GET index" do
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "milestone2", description: "description for milestone1", start_time: 2.days.from_now, end_time: 10.days.from_now } }
    action { post :create, params: { milestone: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "milestone3" } }
    action { put :update, params: { id: milestone.id, milestone: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: milestone.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: milestone.id, project_id: project.id } }
    it { expect { do_action }.to change { Milestone.count }.by(-1) }
  end
end
