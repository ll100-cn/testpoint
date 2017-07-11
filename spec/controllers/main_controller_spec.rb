require 'rails_helper'

RSpec.describe MainController, type: :controller do
  describe "GET #root" do
    action { get :root }

    context "when sign in" do
      login_user

      it { expect(response).to have_http_status(:success) }
    end

    context "when not sign in" do
      it { should redirect_to(new_user_session_path) }
    end
  end
end
