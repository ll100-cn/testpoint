require "rails_helper"

RSpec.describe IssueMailer, type: :mailer do
  let!(:project) { create :project }
  let!(:user) { create :user }
  let!(:user2) { create :user }
  let!(:user3) { create :user }
  let!(:user4) { create :user }
  let!(:changer) { create :member, :reporter, project: project, user: user }
  let!(:manager) { create :member, :manager, project: project, user: user2 }
  let!(:developer) { create :member, :developer, project: project, user: user3 }
  let!(:issue) { create :issue, project: project, subscribed_users: [user2] }
  let!(:comment) { create :comment, issue: issue, member: manager }

  describe "issue created" do
    let(:mail) { IssueMailer.created_notification(issue.id, changer.id, manager.user.email) }
    it "should mail subscribed users" do
      expect(mail.to).to eq([user2.email])
    end
  end

  describe "issue assigned" do
    before { issue.update(assignee: developer) }
    let(:mail) { IssueMailer.assigned_notification(issue.id, changer.id, manager.user.email) }
    it "should mail subscribed users" do
      expect(mail.body.encoded).to match(developer.name)
    end
  end

  describe "state changed" do
    before { issue.update(state: :resolved) }
    let(:mail) { IssueMailer.state_changed_notification(issue.id, changer.id, manager.user.email) }
    it "should mail subscribed users" do
      expect(mail.body.encoded).to match('已解决')
    end
  end

  describe "new comment" do
    let(:mail) { IssueMailer.commented_notification(issue.id, changer.id, manager.user.email) }
    it "should mail subscribed users" do
      expect(mail.body.encoded).to match(comment.content)
    end
  end
end
