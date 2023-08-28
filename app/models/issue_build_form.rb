class IssueBuildForm
  include ActiveAttr::Model

  attribute :template
  attribute :issue
  attribute :info
  attribute :from_task_id

  def submit(params)
    self.assign_attributes(params)

    ActiveRecord::Base.transaction do
      if template
        self.issue.priority = self.template.default_priority
        self.issue.category = self.template.default_category
      end

      if !self.issue.save
        self.errors.add(:issue, self.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end

      if from_task_id
        task = issue.project.tasks.find(from_task_id)
        issue.task = task
        if !self.issue.save
          self.errors.add(:issue, self.errors.full_messages.first)
          raise ActiveRecord::Rollback
        end
      end

      if template
        if !self.template.content_blank?
          if !self.info.submit_and_save
            self.errors.add(:issue, self.errors.full_messages.first)
            raise ActiveRecord::Rollback
          end
        end
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
