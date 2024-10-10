class IssueMergeForm
  include ActiveAttr::Model

  attribute :project
  attribute :head

  attribute :source_ids, default: []

  def submit(author)
    return false unless valid?

    issues = project.issues.without_state(:closed).where(id: source_ids).where.not(id: head.id).to_a
    if issues.empty?
      errors.add(:source_ids, :invalid)
      return false
    end

    Issue.transaction do
      IssueSurvey.where(issue_id: issues.pluck(:id)).update_all(issue_id: head.id)
      Subscription.where(issue_id: issues.pluck(:id)).where.not(user_id: head.subscriptions.pluck(:user_id)).update_all(issue_id: head.id)

      issues.each do |issue|
        comment = head.comments.new
        comment.content = <<~EOF
          ##{issue.title}

          #{issue.content}
        EOF
        comment.member_id = issue.creator_id
        comment.created_at = issue.created_at
        comment.updated_at = issue.updated_at

        unless comment.save
          errors.add(:base, comment.errors.full_messages.join(", "))
          raise ActiveRecord::Rollback
        end

        issue.attachments.update_all(attachmentable_id: comment.id, attachmentable_type: Comment.to_s)
        issue.comments.where(comment_id: nil).update_all(comment_id: comment.id, issue_id: head.id)
        issue.comments.update_all(issue_id: head.id)

        IssueRelationship.where(source_id: issue.id, target_id: head.id).destroy_all

        unless issue.update_with_author({ title: "#{issue.title} (TO: #{head.title})", state: :closed, archived_at: Time.current }, author)
          errors.add(:base, issue.errors.full_messages.join(", "))
          raise ActiveRecord::Rollback
        end
      end
    end

    errors.empty?
  end
end
