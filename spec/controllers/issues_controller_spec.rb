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

  describe "GET assigned" do
    action { get :assigned }
    it { is_expected.to respond_with :success }
  end

  describe "GET archived" do
    action { get :archived }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, format: :xhrml }
    it { is_expected.to respond_with :success }
  end
end
