require 'rails_helper'

RSpec.describe MainController, type: :controller do
  describe "GET #root" do
    action { get :root }

    context "when sign in" do
      login_user
      it { is_expected.to respond_with :redirect }
    end

    context "when not sign in" do
      it { should redirect_to(new_user_session_path) }
    end
  end
end
