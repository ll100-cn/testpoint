require "rails_helper"

RSpec.describe IssueMailer, type: :mailer do
  describe "changed_notification" do
    let!(:project) { create :project }
    let(:issue) { create :issue, project: project }
    let(:superadmin) { create :user, :superadmin }
    let!(:owner) { create :member, :owner, project: project, user: superadmin }
    let(:mail) { IssueMailer.changed_notification(issue, owner, owner.user_id) }

    it "renders the headers" do
      expect(mail.subject).to eq("Issue 变动通知")
      expect(mail.to).to eq([owner.user.email])
    end
  end
end
