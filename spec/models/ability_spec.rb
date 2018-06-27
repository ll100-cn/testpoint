require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  describe "#apply_user_permissions" do
    context "superadmin" do
      let!(:superadmin) { create :user, :superadmin }
      let!(:project) { create :project }
      subject(:ability) { Ability.new { |a| a.apply_user_permissions(superadmin) } }
      it {
        is_expected.to be_able_to(:manage, :all)
        is_expected.not_to be_able_to(:destroy, superadmin)
      }
    end

    context "not superadmin but a member of a project" do
      let!(:user) { create :user }
      let!(:project) { create :project }
      let!(:member) { create :member, project: project, user: user, role: "member" }
      subject(:ability) { Ability.new { |a| a.apply_user_permissions(user) } }
      it {
        is_expected.to be_able_to(:read, project)
        is_expected.to be_able_to(:manage, Attachment)
        is_expected.to be_able_to(:manage, :profile)
      }
    end

    context "neither superadmin nor member of a project" do
      let!(:user) { create :user }
      let!(:project) { create :project }
      subject(:ability) { Ability.new { |a| a.apply_user_permissions(user) } }
      it {
        is_expected.not_to be_able_to(:read, project)
        is_expected.to be_able_to(:manage, Attachment)
        is_expected.to be_able_to(:manage, :profile)
      }
    end
  end

  describe "#apply_member_permissions" do
    context "owner" do
      let!(:project) { create :project }
      let!(:member) { create :member, :owner, project: project }
      subject(:ability) { Ability.new { |a| a.apply_member_permissions(member) } }
      it {
        is_expected.to be_able_to(:manage, project)
        is_expected.to be_able_to(:manage, TestCase, Plan, Issue, Member, Milestone, Platform, Component, Task, Label, Comment)
      }
    end

    context "admin" do
      let!(:project) { create :project }
      let!(:member) { create :member, :admin, project: project }
      subject(:ability) { Ability.new { |a| a.apply_member_permissions(member) } }
      it {
        is_expected.to be_able_to([:read, :update], project)
        is_expected.to be_able_to(:manage, TestCase, Plan, Issue, Member, Milestone, Platform, Component, Task, Label, Comment)
      }
    end

    context "member" do
      let!(:project) { create :project }
      let!(:member) { create :member, :member, project: project }
      subject(:ability) { Ability.new { |a| a.apply_member_permissions(member) } }
      it {
        is_expected.to be_able_to(:read, project)
        is_expected.to be_able_to(:manage, TestCase, Plan, Issue, Milestone, Platform, Component, Task, Label, Comment)
        is_expected.to be_able_to(:read, Member)
      }
    end
  end
end
