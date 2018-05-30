require 'rails_helper'

RSpec.describe ProfilesController, type: :controller do
  let!(:user) { create :user }

  describe "GET show" do
    login_user
    action { get :show, params: { id: user.id } }
    it { is_expected.to respond_with :success }
  end

  describe "Put update" do
    login_user
    let(:attributes) { { name: "new name" } }
    action { post :update, params: { id: user.id, user: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "Patch update_with_password" do
    login_user
    let(:attributes) { { current_password: "password", password: "123456", password_confirmation: "123456" } }
    action { patch :update_password, params: { id: user.id, user: attributes } }
    it { is_expected.to respond_with :redirect }
  end
end
