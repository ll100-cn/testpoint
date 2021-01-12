class IssueBuildForm
  include ActiveAttr::Model

  attribute :template
  attribute :issue
  attribute :info

  def submit(params)
    self.assign_attributes(params)

    ActiveRecord::Base.transaction do
      if !self.issue.save
        self.errors.add(:issue, self.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end

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
    self.issue.title = self.template.name if self.template
  end
end
