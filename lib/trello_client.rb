class TrelloClient
  attr_accessor :key, :token

  def initialize(key, token)
    self.key = key
    self.token = token

    @conn = Faraday.new(url: "https://api.trello.com") do |conn|
      conn.request :json
      conn.request :instrumentation
      conn.response :json
      conn.adapter Faraday.default_adapter
    end
  end

  def create_card(data)
    @conn.post("/1/cards?key=#{key}&token=#{token}", data)
  end
end
