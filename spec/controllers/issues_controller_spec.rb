require 'rails_helper'

RSpec.describe IssuesController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

  describe "GET dashboard" do
    action { get :dashboard }
    it { is_expected.to respond_with :success }
  end

  describe "GET created" do
    action { get :created }
    it { is_expected.to respond_with :success }
  end

  describe "GET focused" do
    action { get :focused }
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
