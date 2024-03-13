class ProjectsAddWebhookUrl < ActiveRecord::Migration[7.0]
  def change
    change_table :projects do |t|
      t.string :webhook_url
    end
  end
end
