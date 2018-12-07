require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let!(:user) { create :user }

  describe "AccessDenied" do
    controller do
      def index
        raise CanCan::AccessDenied
      end
    end

    action { get :index }

    context "current_user not exists" do
      it { is_expected.to respond_with :redirect }
    end

    context "current_user exists" do
      before { sign_in user }
      it { is_expected.to respond_with(:forbidden) }
    end
  end
end
