require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  describe "Abilities" do
    context "Admin" do
      let!(:admin) { create :user, :admin }
      let!(:project) { create :project }
      subject(:ability) { Ability.new(admin) }
      it { is_expected.to be_able_to(:manage, [Project, User, TestCase, Component, Platform, Plan, Task, Issue, Label, Milestone, Attachment, Comment]) }
    end

    context "Member" do
      let!(:member) { create :user, :member }
      let!(:project) { create :project, members: [member] }
      subject(:ability) { Ability.new(member) }
      it {
        is_expected.to be_able_to([:read, :update, :remove_member], project)
        is_expected.not_to be_able_to([:create, :destroy], project)
      }
    end

    context "Visitor" do
      let!(:visitor) { create :user }
      subject(:ability) { Ability.new(visitor) }
      it {
        is_expected.not_to be_able_to(:manage, Project)
        is_expected.to be_able_to(:index, Project)
      }
    end

    context "Guest" do
      let!(:guest) { nil }
      subject(:ability) { Ability.new(guest) }
      it {
        is_expected.not_to be_able_to(:manage, [Project, User, TestCase, Component, Platform, Plan, Task, Issue, Label, Milestone, Attachment, Comment])
        is_expected.to be_able_to(:index, Project)
      }
    end
  end
end
