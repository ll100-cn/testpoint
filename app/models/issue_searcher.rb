class IssueSearcher
  include ActiveAttr::Model

  attribute :base
  attribute :label_id_eq
  attribute :milestone_id_eq
  attribute :assignee_id_eq
  attribute :creator_id_eq
  attribute :task_id_is

  def self.from(base, params)
    record = self.new(params.permit!)
    record.base = base
    record
  end

  def build_scope(except: [])

    scope = base

    if !except.include?(:label_id_eq) && label_id_eq.present?
      scope = scope.where_exists(IssuesLabel.where(label_id: label_id_eq).where_table(:issue))
    end

    if !except.include?(:milestone_id_eq) && milestone_id_eq.present?
      scope = scope.where(milestone_id: milestone_id_eq)
    end

    if !except.include?(:assignee_id_eq) && assignee_id_eq.present?
      scope = scope.where(assignee_id: assignee_id_eq)
    end

    if !except.include?(:creator_id_eq) && creator_id_eq.present?
      scope = scope.where(creator_id: creator_id_eq)
    end

    if !except.include?(:task_id_is) && task_id_is.present?
      scope = task_id_is == "null" ? scope.where(task_id: nil) : scope.where.not(task_id: nil)
    end

    scope
  end

  def result
    @result ||= build_scope
  end

  def labels_counts
    @labels_counts ||= build_scope(except: [:label_id_eq]).joins(:labels).group("labels.id").count
  end

  def milestone_counts
    @milestone_counts ||= build_scope(except: [:milestone_id_eq]).group(:milestone_id).count
  end

  def assignee_counts
    @assignee_counts ||= build_scope(except: [:assignee_id_eq]).group(:assignee_id).count
  end

  def creator_counts
    @creator_counts ||= build_scope(except: [:creator_id_eq]).group(:creator_id).count
  end

end