class Ability
  include CanCan::Ability

  def initialize(&block)
    block.(self)
  end

  def apply_user_permissons(user)
    return unless user

    if user.superadmin?
      can :manage, :all
      cannot :destroy, user
      return
    end

    can :read, Project, members: { user_id: user.id }
    can :manage, :profile
    can :manage, Attachment
  end

  def apply_member_permissons(member)
    return unless member

    if member.role.owner?
      can :manage, member.project
      can :manage, [ TestCase, Plan, Issue, Member, Milestone, Platform, Component, Task, Label, Comment ]
    end

    if member.role.admin?
      can [:read, :update], member.project
      can :manage, [ TestCase, Plan, Issue, Member, Milestone, Platform, Component, Task, Label, Comment ]
    end

    if member.role.member?
      can :read, member.project
      can :manage, [ TestCase, Plan, Issue, Milestone, Platform, Component, Task, Label, Comment ]
      can :read, Member
    end
  end
end
