require 'rails_helper'

RSpec.describe Profiles::BasicsController, type: :controller do
  login_user

  describe "GET show" do
    action { get :show }
    it { is_expected.to respond_with :success }
  end

  describe "Put update" do
    let(:attributes) { { name: "new name" } }
    action { post :update, params: { user: attributes } }
    it { is_expected.to respond_with :redirect }
  end
end
