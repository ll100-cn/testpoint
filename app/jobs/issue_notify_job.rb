class IssueNotifyJob < ApplicationJob
  queue_as :default

  def perform(issue_id)
    issue = Issue.find(issue_id)
    project = issue.project

    return if project.webhook_url.blank?

    json = issue.as_json(
      only: %i[id title state project_id created_at updated_at trello_card_id],
    )
    json["assignee_email"] = issue.assignee&.user&.email
    conn.post(project.webhook_url, json)
  end

  def conn
    @conn ||= Faraday.new do |conn|
      conn.request :json
      conn.request :instrumentation
      conn.response :json
      conn.response :raise_error
      conn.adapter Faraday.default_adapter
    end
  end
end
