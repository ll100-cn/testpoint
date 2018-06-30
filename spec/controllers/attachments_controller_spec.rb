require 'rails_helper'

RSpec.describe AttachmentsController, type: :controller do
  let!(:attachment) { create :attachment }
  login_superadmin

  describe "POST create" do
    let(:params) { { attachment: { file: ResourceHelper.upload_file("avatar.png") } } }

    action { post :create, params: params, format: :xhrml }

    it { expect(assigns(:attachment)).to be_persisted }
  end

  describe "POST update" do
    let(:attributes) { { title: "updated attachment" } }
    action { post :update, params: { id: attachment.id, attachment: attributes } }
    it { is_expected.to respond_with :redirect }
  end
end
