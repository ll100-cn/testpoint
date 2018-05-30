require 'rails_helper'

RSpec.describe ProfilesController, type: :controller do
  let!(:user) { create :user }
  login_user

  describe "GET show" do
    action { get :show, params: { id: user.id } }
    it { is_expected.to respond_with :success }
  end

  describe "Put update" do
    context "without password" do
      let(:attributes) { { name: "new name" } }
      action { post :update, params: { id: user.id, user: attributes } }
      it { is_expected.to respond_with :redirect }
    end

    context "with password" do
      let(:attributes) { { name: "new name", current_password: "password", password: "123456", password_confirmation: "123456" } }
      action { patch :update, params: { id: user.id, user: attributes } }
      it { is_expected.to respond_with :redirect }
    end
  end
end
