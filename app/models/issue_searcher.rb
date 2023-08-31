class IssueSearcher
  include ActiveAttr::Model

  attribute :base
  attribute :category_id_eq
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

    if except.exclude?(:category_id_eq) && category_id_eq.present?
      scope = scope.where(category_id: category_id_eq)
    end

    if except.exclude?(:milestone_id_eq) && milestone_id_eq.present?
      scope = scope.where(milestone_id: milestone_id_eq)
    end

    if except.exclude?(:assignee_id_eq) && assignee_id_eq.present?
      scope = scope.where(assignee_id: assignee_id_eq)
    end

    if except.exclude?(:creator_id_eq) && creator_id_eq.present?
      scope = scope.where(creator_id: creator_id_eq)
    end

    if except.exclude?(:task_id_is) && task_id_is.present?
      scope = task_id_is == "null" ? scope.where(task_id: nil) : scope.where.not(task_id: nil)
    end

    scope
  end

  def result
    @result ||= build_scope
  end

  def categories_counts
    @categories_counts ||= build_scope(except: [:category_id_eq]).group(:category).count
  end

  def milestone_counts
    @milestone_counts ||= build_scope(except: [:milestone_id_eq]).group(:milestone).count
  end

  def assignee_counts
    @assignee_counts ||= build_scope(except: [:assignee_id_eq]).group(:assignee).count
  end

  def creator_counts
    @creator_counts ||= build_scope(except: [:creator_id_eq]).group(:creator).count
  end

end
