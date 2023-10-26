class IssueMailer < ApplicationMailer
  helper MailerHelper

  def created_notification(issue_id, changer_id, to_address)
    @issue = Issue.find(issue_id)
    @changer = Member.find(changer_id)
    @to_address = to_address
    mail(**mailer_options)
  end

  def assigned_notification(issue_id, changer_id, to_address)
    @issue = Issue.find(issue_id)
    @changer = Member.find(changer_id)
    @to_address = to_address
    @assignee = @issue.assignee
    mail(**mailer_options)
  end

  def state_changed_notification(issue_id, changer_id, to_address)
    @issue = Issue.find(issue_id)
    @changer = Member.find(changer_id)
    @to_address = to_address
    @state = @issue.state_text
    mail(**mailer_options)
  end

  def commented_notification(issue_id, changer_id, to_address)
    @issue = Issue.find(issue_id)
    @changer = Member.find(changer_id)
    @to_address = to_address
    @comment = @issue.comments.last
    mail(**mailer_options)
  end

protected
  def mailer_options
    {
      from: "#{@changer.name} <#{ENV["DEVISE_MAILER_SENDER"]}>",
      to: @to_address,
      subject: "[TESTPOINT] #{@issue.title_with_priority} (##{@issue.id})",
      references: "<#{Digest::MD5.hexdigest(@issue.id.to_s)}@testpoint>"
    }
  end
end
