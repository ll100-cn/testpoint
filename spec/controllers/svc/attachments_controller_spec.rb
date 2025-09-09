require 'rails_helper'

RSpec.describe Svc::AttachmentsController, type: :controller do
  let!(:attachment) { create :attachment }
  login_superadmin

  describe "POST create" do
    context "upload image" do
      let(:params) { { file: ResourceHelper.upload_file("avatar.png"), title: "avatar.png", content_type: "image/png" } }
      action { post :create, params: params, format: :json }

      it { expect(assigns(:attachment)).to be_persisted }
    end

    context "upload video" do
      let(:params) { { file: ResourceHelper.upload_file("SampleVideo.mp4"), title: "Sample Video", content_type: "video/mp4" } }
      action { post :create, params: params, format: :json }

      it { expect(assigns(:attachment)).to be_persisted }
    end
  end

  describe "POST update" do
    action { post :update, params: { id: attachment.id, title: "updated attachment" } , format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { id: attachment.id, format: :json } }

    it { is_expected.to respond_with :success }
  end
end
