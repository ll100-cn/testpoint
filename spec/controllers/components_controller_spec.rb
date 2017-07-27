require 'rails_helper'

RSpec.describe ComponentsController, type: :controller do
  describe "GET new" do
    action { get :new }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:new_component) { { name: "new component name" } }
    let(:create_request) { post :create, params: new_component }

    it { expect { create_request }.to change { Component.count }.from(0).to(1) }
  end

  describe "PUT update" do
    let(:component) { create :component }
    let(:new_name) { "new name" }

    action { put :update, params: { id: component.id, component: { name: new_name } } }

    it { expect(component.reload.name).to eq new_name }
  end

  describe "GET show" do
    let(:component) { create :component }

    action { get :show, params: { id: component.id } }

    it { expect(component).to eq assigns(:component) }
  end

  describe "DELETE destroy" do
    let!(:component) { create :component }
    let(:component_count) { Component.count }

    let(:destroy_request) { delete :destroy, params: { id: component.id } }

    it { expect { destroy_request }.to change { Component.count }.from(component_count).to(component_count - 1) }
  end
end
