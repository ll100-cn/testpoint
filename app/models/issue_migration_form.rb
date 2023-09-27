class IssueMigrationForm
  include ActiveAttr::Model

  attribute :issue

  attribute :source_issue_id
  attribute :target_project_id
  attribute :target_category_id

  validates :source_issue_id, presence: true
  validates :target_project_id, presence: true
  validates :target_category_id, presence: true

  def submit(source_member, &block)
    return false unless valid?

    source_project = source_member.project
    self.issue = source_project.issues.where(id: source_issue_id).take

    if self.issue.nil?
      errors.add(:source_issue_id, :invalid)
      return false
    end

    user = source_member.user
    target_project = user.projects.where(id: target_project_id).take

    if target_project.nil?
      errors.add(:target_project_id, :invalid)
      return false
    end

    target_member = target_project.members.where(user_id: user.id).take
    block.(source_member, target_member)


    new_attrs = {
      project: target_project,
      creator: target_project.members.where(user_id: self.issue.creator.user_id).take || target_member,
      assignee: target_project.members.where(user_id: self.issue.assignee.user_id).take,
      category: target_project.categories.where(id: target_category_id).take,
      milestone: nil
    }

    Issue.transaction do
      if !self.issue.update(new_attrs)
        errors.add(:source_issue_id, self.issue.errors.full_messages.join(', '))
        raise ActiveRecord::Rollback
      end

      self.issue.activities.create!({
        member_id: source_member.id,
        property: 'project_id',
        before_value: source_member.project_id,
        after_value: target_project.id
      })

      self.issue.activities.create!({
        member_id: target_member.id,
        property: 'project_id',
        before_value: source_member.project_id,
        after_value: target_project.id
      })
    end

    errors.empty?
  end
end