class Ability
  include CanCan::Ability

  def initialize(user = nil, &block)
    alias_action :update, :destroy, to: :modify
    # rubocop:disable Performance/RedundantBlockCall

    apply_user_permissions(user)
    block&.(self)
  end

  def apply_user_permissions(user)
    return if user.nil?

    can :manage,              :profile

    if user.superadmin?
      can :manage,              :all
      cannot :destroy,          user
    end
  end

  def apply_member_permissions(member)
    return if member.nil?
    return if member.archived_at?
    return if member.user.superadmin?

    can :profile, member

    apply_reporter_permissions(member)  if member.role.reporter?
    apply_developer_permissions(member) if member.role.developer?
    apply_manager_permissions(member)   if member.role.manager?
    apply_owner_permissions(member)     if member.role.owner?
  end

  def apply_reporter_permissions(member)
    can :read, Project

    can [ :read, :create ], [ Issue, Comment ]
    can [ :read, :update ], IssueSurvey
    can :read, IssueRelationship
    can :resolve, Issue, creator_id: member.id

    can :read, Member
    can :read, Category
    can :read, IssueTemplate
    can :read, TestCaseLabel
    can :read, Platform
    can :read, Milestone

    can :manage, Attachment
  end

  def apply_developer_permissions(member)
    apply_reporter_permissions(member)

    can :read, TestCase
    can :process, Issue, assignee_id: member.id

    can :read, Plan
    can :read, Phase
    can :read, Task
    can :read, TaskUpshot
  end

  def apply_manager_permissions(member)
    apply_developer_permissions(member)

    can :manage, Category
    can :manage, IssueTemplate
    can :manage, TestCaseLabel
    can :manage, Platform
    can :manage, TestCase
    can :manage, Milestone

    can :manage, Plan
    can :manage, Phase
    can :manage, Task
    can :manage, TaskUpshot

    can :manage, Milestone
    can :manage, [ Issue, Comment, IssueSurvey, IssueRelationship ]
    can :manage, "IssueBody"
  end

  def apply_owner_permissions(member)
    apply_manager_permissions(member)
    can :manage,               Member
  end
end
