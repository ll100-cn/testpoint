require 'rails_helper'

RSpec.describe Profiles::BasicsController, type: :controller do
  login_user

  describe "GET show" do
    action { get :show }
    it { is_expected.to respond_with :success }
  end

  describe "Put update" do
    context "without password" do
      let(:attributes) { { name: "new name" } }
      action { post :update, params: { user: attributes } }
      it { is_expected.to respond_with :redirect }
    end

    context "with password" do
      let(:attributes) { { name: "new name", current_password: "password", password: "123456", password_confirmation: "123456" } }
      action { patch :update, params: { user: attributes } }
      it { is_expected.to respond_with :redirect }
    end
  end
end
