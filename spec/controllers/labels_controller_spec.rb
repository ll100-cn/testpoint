require 'rails_helper'

RSpec.describe LabelsController, type: :controller do
  let!(:label) { create :label }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "bug", description: "it is a bug", color: "#ace0ef" } }
    action { post :create, params: { label: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "help wanted" } }
    action { put :update, params: { id: label.id, label: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: label.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: label.id } }
    it { expect { do_action }.to change { Label.count }.by(-1) }
  end
end
