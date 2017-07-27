require 'rails_helper'

RSpec.describe PlatformsController, type: :controller do
  let!(:platform) { create :platform }

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "iOS" } }
    action { post :create, params: { platform: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "Android" } }
    action { put :update, params: { id: platform, platform: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: platform.id } }
    it { expect { do_action }.to change { Platform.count }.by(-1) }
  end
end
