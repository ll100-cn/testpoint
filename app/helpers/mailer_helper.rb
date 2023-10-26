module MailerHelper
  def public_mail_url(source)
    if source.include?("://")
      source
    else
      "#{ENV["BASE_MAIL_URL"]}#{source}"
    end
  end
end