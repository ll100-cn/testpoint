require 'rails_helper'

RSpec.describe AttachmentsController, type: :controller do
  login_superadmin

  describe "POST create" do
    let(:params) { { attachment: { file: ResourceHelper.upload_file("avatar.png") } } }

    action { post :create, params: params, format: :xhrml }

    it { expect(assigns(:attachment)).to be_persisted }
  end
end
