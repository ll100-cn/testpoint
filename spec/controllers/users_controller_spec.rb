require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let!(:user) { create :user }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { email: Faker::Internet.email, password: "123456", password_confirmation: "123456" } }
    action { post :create, params: { user: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { password: "123456", password_confirmation: "123456" } }
    action { put :update, params: { id: user.id, plan: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: user.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: user.id } }
    it { expect { do_action }.to change { User.count }.by(-1) }
  end
end
