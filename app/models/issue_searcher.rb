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
      if category_id_eq.to_i == -1
        scope = scope.where(category_id: nil)
      else
        scope = scope.where(category_id: category_id_eq)
      end
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


  def self.build_scope(base, params)
    issues_scope = base

    if params[:stage].present?
      issues_scope = issues_scope.where(stage: params[:stage]) if params[:stage] != "all"
    end

    if params[:keyword].present?
      keyword_scope = issues_scope
      words = params[:keyword].presence.split
      conditions = words.map do |word|
        keyword_scope.where_any_of(
          Issue.where_exists(Comment.where("content LIKE ?", "%#{word}%").where_table(:issue)),
          Issue.where("title LIKE ? or content LIKE ?", "%#{word}%", "%#{word}%")
        )
      end
      issues_scope = issues_scope.where_any_of(*conditions)
    end

    if params[:category_id_eq].present?
      issues_scope = issues_scope.where(category_id: params[:category_id_eq])
    end

    if params[:milestone_id_eq].present?
      issues_scope = issues_scope.where(milestone_id: params[:milestone_id_eq])
    end

    if params[:assignee_id_eq].present?
      issues_scope = issues_scope.where(assignee_id: params[:assignee_id_eq])
    end

    if params[:creator_id_eq].present?
      issues_scope = issues_scope.where(creator_id: params[:creator_id_eq])
    end

    issues_scope
  end
end
