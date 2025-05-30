require 'rails_helper'

RSpec.describe Api::V2::Projects::IssuesController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  let!(:user) { create :user }
  let!(:member) { create :member, user: user, project: project }
  let(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let!(:test_case) { create :test_case, project: project, platforms: [platform] }
  let!(:task) { create :task, test_case: test_case, plan: plan }
  let(:issue) { create :issue, project: project }
  let(:superadmin) { create :user, :superadmin }
  let!(:owner) { create :member, :owner, project: project, user: superadmin }
  let!(:manager) { create :member, :manager, project: project }
  let!(:template) { create :issue_template, project: project }
  before { sign_in superadmin }

  describe "GET index" do
    let!(:category) { create :category }
    let!(:issue) { create :issue, category: category, project: project }
    let!(:attributes) { { project_id: project.id } }
    action { get :index, params: attributes, format: :json }

    context "without task" do
      it { is_expected.to respond_with :success }
    end

    context "with related_task" do
      before { attributes[:related_task] = task.id }

      it { is_expected.to respond_with :success }
    end

    context "filter by states" do
      before { attributes[:filter] = "develop" }

      it { is_expected.to respond_with :success }
    end

    context "filter by states" do
      context "filter opending issues" do
        before { attributes[:q] = { "state_filter" => "opening" } }

        it { is_expected.to respond_with :success }
      end
      context "filter all issues" do
        before { attributes[:q] = { "state_filter" => "all" } }

        it { is_expected.to respond_with :success }
      end

      context "filter resolved issues" do
        before { attributes[:q] = { "state_filter" => "resolved" } }

        it { is_expected.to respond_with :success }
      end
    end
  end
end
