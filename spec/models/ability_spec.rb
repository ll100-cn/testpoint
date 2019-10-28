require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  describe "#apply_user_permissions" do
    context "member" do
      let!(:project) { create :project }
      let!(:user) { create :user }
      let!(:member) { create :member, user: user, project: project }
      subject(:ability) { Ability.new { |a| a.apply_user_permissions(user) } }

      it {  is_expected.to be_able_to(:read, project)
            is_expected.to be_able_to(:manage, Attachment) }
    end

    context "visitor" do
      let!(:visitor) { create :user }
      let!(:project) { create :project }
      subject(:ability) { Ability.new { |a| a.apply_user_permissions(visitor) } }

      it { is_expected.to be_able_to(:manage, :profile)
           is_expected.not_to be_able_to(:read, project) }
    end
  end

  describe "#apply_superadmin_permissions" do
    let!(:superadmin) { create :user, :superadmin }
    let!(:project) { create :project }
    subject(:ability) { Ability.new { |a| a.apply_superadmin_permissions(superadmin) } }

    it {  is_expected.to be_able_to(:manage, :all)
          is_expected.not_to be_able_to(:destroy, superadmin) }
  end

  describe "#apply_member_permissions" do
    let(:member) { nil }
    subject(:ability) { Ability.new { |a| a.apply_member_permissions(member) } }

    context "anonymous" do
      it { is_expected.not_to be_blank }
    end

    context "when superadmin" do
      let(:user) { create :user, :superadmin }
      let!(:member) { create :member, user: user }

      it { is_expected.not_to be_blank }
    end

    context "when reporter" do
      let!(:member) { create :member, :reporter }

      it { is_expected.not_to be_blank }
    end

    context "when developer" do
      let!(:member) { create :member, :developer }

      it { is_expected.not_to be_blank }
    end

    context "when manager" do
      let!(:member) { create :member, :manager }

      it { is_expected.not_to be_blank }
    end

    context "when owner" do
      let!(:member) { create :member, :owner }

      it { is_expected.not_to be_blank }
    end
  end

  describe "#apply_reporter_permissions" do
    let!(:project) { create :project }
    let!(:reporter) { create :member, :reporter, project: project }
    let!(:issue) { create :issue, project: project, creator_id: reporter.id }
    let!(:attachment) { create :attachment, attachmentable: issue }

    subject(:ability) { Ability.new { |a| a.apply_reporter_permissions(reporter) } }

    it {  is_expected.to be_able_to([:read, :create], Issue, Comment, Attachment)
          is_expected.to be_able_to(:update, Issue.new(creator_id: reporter.id))
          is_expected.to be_able_to(:update, Issue.new(assignee_id: reporter.id))
          is_expected.to be_able_to(:update, Comment.new(member_id: reporter.id)) }
  end

  describe "#apply_developer_permissions" do
    let!(:project) { create :project }
    let!(:developer) { create :member, :developer, project: project }
    subject(:ability) { Ability.new { |a| a.apply_developer_permissions(developer) } }

    it { is_expected.to be_able_to(:manage, TestCase, Plan, Platform, Component, Task)
         is_expected.to be_able_to([:read, :create], IssueRelationship) }
  end

  describe "#apply_manager_permissions" do
    let!(:project) { create :project }
    let!(:manager) { create :member, :manager, project: project }
    subject(:ability) { Ability.new { |a| a.apply_manager_permissions(manager) } }

    it {  is_expected.to be_able_to(:update, project)
          is_expected.to be_able_to(:manage, Issue, IssueRelationship)
          is_expected.to be_able_to(:read, Member)
          is_expected.to be_able_to(:modify, Member.new(project: project, role: "developer"))
          is_expected.not_to be_able_to(:modify, Member.new(project: project, role: "owner")) }
  end

  describe "#apply_owner_permissions" do
    let!(:owner) { create :member, :owner }
    let!(:project) { create :project }
    subject(:ability) { Ability.new { |a| a.apply_owner_permissions(owner) } }

    it { is_expected.to be_able_to(:manager, Member) }
  end
end
