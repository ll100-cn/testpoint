class IssueMailer < ApplicationMailer

  def changed_notification(issue, changer, recevier_id)
    @issue = issue
    @changer = changer
    @receiver = User.find(recevier_id)

    mail(to: @receiver.email, subject: 'Issue 变动通知')
  end
end
