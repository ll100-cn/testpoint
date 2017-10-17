require 'rails_helper'

RSpec.describe AttachmentsController, type: :controller do
  describe "POST create" do
    let(:attachment) { build :attachment }
    let(:params) { { attachment: attachment.attributes } }

    action { post :create, params: params, format: :xhrml }

    it { expect(assigns(:attachment)).to be_persisted }
  end
end
