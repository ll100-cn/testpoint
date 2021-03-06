require 'rails_helper'

RSpec.describe AttachmentsController, type: :controller do
  let!(:attachment) { create :attachment }
  login_superadmin

  describe "POST create" do
    context "upload image" do
      let(:params) { { attachment: { file: ResourceHelper.upload_file("avatar.png"), title: "avatar.png", content_type: "image/png" } } }
      action { post :create, params: params, format: :xhrml }

      it { expect(assigns(:attachment)).to be_persisted }
    end

    context "upload video" do
      let(:params) { { attachment: { file: ResourceHelper.upload_file("SampleVideo.mp4"), title: "Sample Video", content_type: "video/mp4" } } }
      action { post :create, params: params, format: :xhrml }

      it { expect(assigns(:attachment)).to be_persisted }
    end
  end

  describe "GET edit" do
    action { get :edit, params: { id: attachment.id }, format: :xhrml }
    it { is_expected.to respond_with :success }
  end

  describe "POST update" do
    let(:attributes) { { title: "updated attachment" } }
    action { post :update, params: { id: attachment.id, attachment: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { id: attachment.id, format: :xhrml } }

    it { is_expected.to respond_with :success }
  end
end
