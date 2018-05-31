require 'rails_helper'

RSpec.describe IssuesController, type: :controller do
  let(:plan) { create :plan }
  let(:task) { plan.tasks.first }
  let(:issue) { create :issue }

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { task_id: task.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "issue create", content: "content for issue" } }
    action { post :create, params: { issue: attributes, task_id: task.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "issue update" } }
    action { put :update, params: { id: issue.id, issue: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    login_user
    action { get :show, params: { id: issue.id } }
    it { is_expected.to respond_with :success }
  end
end
