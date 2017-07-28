require 'rails_helper'

RSpec.describe ComponentsController, type: :controller do
  let!(:component) { create :component }

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "new component name" } }
    action { post :create, params: { component: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "new name" } }
    action { put :update, params: { id: component.id, component: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: component.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: component.id } }
    it { expect { do_action }.to change { Component.count }.by(-1) }
  end
end