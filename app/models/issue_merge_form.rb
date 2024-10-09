class IssueMergeForm
  include ActiveAttr::Model

  attribute :source_ids, default: []
  attribute :project

  attribute :head

  def submit(author)
    return false unless valid?

    issues = project.issues.without_state(:closed).where(id: source_ids).order(created_at: :asc, id: :asc)
    if issues.empty?
      errors.add(:source_ids, :invalid)
      return false
    end

    self.head = issues.shift

    Issue.transaction do
      IssueSurvey.where(issue_id: issues.pluck(:id)).update_all(issue_id: head.id)
      Subscription.where(issue_id: issues.pluck(:id)).where.not(user_id: head.subscriptions.pluck(:user_id)).update_all(issue_id: head.id)

      issues.each do |issue|
        comment = head.comments.new
        comment.content = <<~EOF
          ##{issue.title}

          #{issue.content}
        EOF

        comment.created_at = issue.created_at
        comment.updated_at = issue.updated_at

        unless comment.save
          errors.add(:base, comment.errors.full_messages.join(", "))
          raise ActiveRecord::Rollback
        end

        issue.attachments.update_all(attachmentable_id: comment.id, attachmentable_type: Comment.to_s)
        issue.comments.where(comment_id: nil).update_all(comment_id: comment.id, issue_id: head.id)
        issue.comments.update_all(issue_id: head.id)

        unless issue.update_with_author({ title: "#{issue.title} (TO: #{head.title})", state: :closed, archived_at: Time.current }, author)
          errors.add(:base, issue.errors.full_messages.join(", "))
          raise ActiveRecord::Rollback
        end
      end
    end

    errors.empty?
  end
end
