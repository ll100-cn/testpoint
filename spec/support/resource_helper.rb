module ResourceHelper
  extend ActiveSupport::Concern

  def self.upload_file(path)
    Rack::Test::UploadedFile.new(resource_folder.join(path))
  end

  def self.resource_folder
    Rails.root.join("spec/resources")
  end
end

RSpec.configure do |config|
  config.include ResourceHelper
end
