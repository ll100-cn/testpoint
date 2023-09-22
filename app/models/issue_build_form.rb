class IssueBuildForm
  include ActiveAttr::Model

  attribute :template
  attribute :issue
  attribute :survey
  attribute :from_task_id

  def submit(params)
    ActiveRecord::Base.transaction do
      self.assign_attributes(params)

      if template
        self.issue.priority = self.template.default_priority
        self.issue.category = self.template.default_category
      end

      if !self.issue.save
        self.errors.add(:issue, self.issue.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end

      if from_task_id
        task = issue.project.tasks.find(from_task_id)
        issue.task = task
        if !self.issue.save
          self.errors.add(:issue, self.issue.errors.full_messages.first)
          raise ActiveRecord::Rollback
        end
      end

      if template
        if !self.template.content_blank?
          if !self.survey.submit_and_save
            self.errors.add(:issue, self.survey.errors.full_messages.first)
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
    self.survey.assign_attributes(attrs)
  end

  def prepare
    self.survey = IssueSurvey.new(template: self.template, issue: self.issue)
    if self.template
      self.issue.title = self.template.title_suggestion
      self.issue.content = self.template.content_suggestion
    end
  end
end
