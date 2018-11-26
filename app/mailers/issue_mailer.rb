class IssueMailer < ApplicationMailer
  default from: ENV["DEVISE_MAILER_SENDER"]

  def changed_notification(issue, changer, recevier_id)
    @issue = issue
    @changer = changer
    @receiver = User.find(recevier_id)

    mail(to: @receiver.email, subject: 'Issue 变动通知')
  end
end
