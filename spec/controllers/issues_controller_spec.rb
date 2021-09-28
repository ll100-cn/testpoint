require 'rails_helper'

RSpec.describe IssuesController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

  describe "GET my" do
    action { get :my }
    it { is_expected.to respond_with :success }
  end
end
