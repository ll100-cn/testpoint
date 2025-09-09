require 'rails_helper'

RSpec.describe Svc::V2::Profile::AccountsController, type: :controller do
  let!(:user) { create :user }
  before { sign_in user }

  describe "GET show" do
    action { get :show, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "Put update" do
    action { post :update, params: { name: "new name" }, format: :json }
    it { is_expected.to respond_with :success
         expect(user.reload.name).to eq "new name" }
  end
end
