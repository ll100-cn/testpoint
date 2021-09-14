class IssueBuildForm
  include ActiveAttr::Model

  attribute :template
  attribute :issue
  attribute :info

  def submit(params)
    self.assign_attributes(params)

    ActiveRecord::Base.transaction do
      self.issue.priority = self.template.default_priority

      if !self.issue.save
        self.errors.add(:issue, self.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end

      self.issue.labels << self.template.default_label if self.template.default_label

      return if self.template.content_blank?

      if !self.info.submit_and_save
        self.errors.add(:issue, self.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end
    end
  end

  def issue_attributes=(attrs)
    self.issue.assign_attributes(attrs)
  end

  def info_attributes=(attrs)
    self.info.assign_attributes(attrs)
  end

  def prepare
    self.info = IssueInfo.new(template: self.template, issue: self.issue)
    if self.template
      self.issue.title = self.template.title_suggestion
      self.issue.content = self.template.content_suggestion
    end
  end
end
