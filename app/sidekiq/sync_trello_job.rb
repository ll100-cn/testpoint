require 'trello_client'

class SyncTrelloJob
  include Sidekiq::Job

  def perform(issue_id)
    issue = Issue.find(issue_id)
    return if issue.trello_card_id?

    project = issue.project
    return if project.trello_list_id.blank?

    client = TrelloClient.new(project.trello_api_key, project.trello_api_token)

    template_url = ENV["ISSUE_PATH"]
    content_url = URITemplate.new(template_url).expand(project: project.id, issue: issue.id)
    data = {
      name: "##{issue.id} #{issue.title}",
      desc: "<#{content_url}>",
      idList: project.trello_list_id,
    }
    response = client.create_card(data)

    if !response.success?
      raise "推送在线用户信息失败 #{response.body}"
    end

    issue.update!(trello_card_id: response.body['id'])
  end
end
