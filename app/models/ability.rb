class Ability
  include CanCan::Ability

  def initialize(&block)
    alias_action :update, :destroy, to: :modify
    # rubocop:disable Performance/RedundantBlockCall
    block.(self)
  end

  def apply_user_permissions(user)
    return unless user
    return apply_superadmin_permissions(user) if user.superadmin?

    can [:read, :vue],                Project, members: { user_id: user.id }
    can :manage,              :profile
    can :manage,              Attachment
  end

  def apply_member_permissions(member)
    return if member.nil? || member.user.superadmin?

    apply_reporter_permissions(member)  if member.role.reporter?
    apply_developer_permissions(member) if member.role.developer?
    apply_manager_permissions(member)   if member.role.manager?
    apply_owner_permissions(member)     if member.role.owner?
  end

  def apply_api_permissions(user)
    can :manage, :all
  end

  def apply_reporter_permissions(member)
    can :read, Milestone
    can [:read, :create], Comment
    can [:read, :create, :archive, :unresolve], Issue
    can :update, Comment, member_id: member.id
    can [:read, :create, :update], IssueInfo
  end

  def apply_developer_permissions(member)
    apply_reporter_permissions(member)
    can [:fold, :unfold],       Comment
    can :manage,                Issue
    can [:read, :create],       IssueRelationship
    can :manage,                [TestCase, TestCaseLabel, TestCaseSnapshot, Plan, Platform, Task, Phase, Milestone]
  end

  def apply_manager_permissions(member)
    apply_developer_permissions(member)
    can :manage,                IssueRelationship
    can :manage,                IssueInfo
    can :manage,                Milestone
    can :update,                member.project
    can :manage,                Category
    can :read,                  Member
    can :modify,                Member, Member.where.not(role: "owner") do |m|
      !m.role.owner?
    end
    can :manage,                IssueTemplate
    can :manage,                Analytic
  end

  def apply_owner_permissions(member)
    apply_manager_permissions(member)
    can :manage,               Member
    can :manage,               IssueTemplate
    can :manage,               Analytic
  end

  def apply_superadmin_permissions(user)
    can :manage,              :all
    cannot :destroy,          user
  end
end
