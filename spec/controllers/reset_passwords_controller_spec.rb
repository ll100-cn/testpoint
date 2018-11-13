require 'rails_helper'

RSpec.describe ResetPasswordsController, type: :controller do
  let(:user) { create :user }
  before { @token = user.send(:set_reset_password_token) }
  before { @request.env["devise.mapping"] = Devise.mappings[:user] }

  describe "PUT update" do
    before { user.update(confirmed_at: nil) }
    let(:attributes) { { password: "123456", password_confirmation: "123456", reset_password_token: @token } }

    action { put :update, params: { user: attributes } }

    it { is_expected.to respond_with :redirect
         expect(user.reload).to be_confirmed }
  end
end
