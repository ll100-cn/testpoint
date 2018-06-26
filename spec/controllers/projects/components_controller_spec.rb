require 'rails_helper'

RSpec.describe Projects::ComponentsController, type: :controller do
  let!(:project) { create :project }
  let!(:component) { create :component, project: project }

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "new component name" } }
    action { post :create, params: { component: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "new name" } }
    action { put :update, params: { id: component.id, component: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: component.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: component.id, project_id: project.id } }
    it { expect { do_action }.to change { Component.archived.count }.by(1) }
  end
end
