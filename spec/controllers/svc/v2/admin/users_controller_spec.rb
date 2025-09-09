require 'rails_helper'

RSpec.describe Svc::V2::Admin::UsersController, type: :controller do
  let!(:user) { create :user }
  login_superadmin

  describe "GET index" do
    action { get :index, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { email: Faker::Internet.email, name: "user" } }
    action { post :create, params: attributes, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "PUT update" do
    let(:attributes) { { email: "new_email@ll100.com" } }
    action { put :update, params: { id: user.id }.merge(attributes), format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "GET show" do
    action { get :show, params: { id: user.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: user.id }, format: :json }
    it { expect { do_action }.to change { User.count }.by(-1) }
  end
end
