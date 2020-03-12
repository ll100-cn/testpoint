class IssueMailer < ApplicationMailer
  def created_notification(issue, changer, receiver)
    @issue = issue
    @changer = changer
    @receiver = receiver
    mail(**mailer_options)
  end

  def assigned_notification(issue, changer, receiver)
    @issue = issue
    @changer = changer
    @receiver = receiver
    @assignee = issue.assignee
    mail(**mailer_options)
  end

  def state_changed_notification(issue, changer, receiver)
    @issue = issue
    @changer = changer
    @receiver = receiver
    @state = issue.state_text
    mail(**mailer_options)
  end

  def commented_notification(issue, changer, receiver)
    @issue = issue
    @changer = changer
    @receiver = receiver
    @comment = issue.comments.last
    mail(**mailer_options)
  end

  protected
  def mailer_options
    {
      from: "#{@changer.smart_name} <#{ENV["DEVISE_MAILER_SENDER"]}>",
      to: @receiver.user.email,
      subject: "[TESTPOINT] #{@issue.title} (##{@issue.id})"
    }
  end
end
