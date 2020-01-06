require 'rails_helper'

RSpec.describe MainController, type: :controller do
  let!(:project) { create :project }
  let!(:user) { create :user, email: Faker::Internet.email, name: "new user"}
  let!(:member) { create :member, project: project, user: user }

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

  describe "GET #root with cookies" do
    it "should go to project" do
      sign_in user
      request.cookies[:last_login_project] = project.id
      get :root
      expect(response).to redirect_to project_path(project)
    end
  end
end
