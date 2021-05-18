require 'rails_helper'

RSpec.describe Profiles::IssuesController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end
end
