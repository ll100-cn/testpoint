class Ability
  include CanCan::Ability

  def initialize(user)
    if user.blank?
      cannot :manage, :all
      can :index, Project
    elsif user.admin?
      can :manage, :all
    elsif user.member?
      can :manage, [TestCase, Component, Platform, Plan, Task, Issue, Label, Milestone, Attachment], project: { members: { id: user.id } }
      can [:read, :remove_member, :update], Project, members: { id: user.id }
    else
      can :index, Project
    end
  end
end
