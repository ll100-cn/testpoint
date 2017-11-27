class AddArchivedToPlatforms < ActiveRecord::Migration[5.1]
  def change
    change_table :platforms do |t|
      t.boolean :archived, default: false, index: true
    end
  end
end
