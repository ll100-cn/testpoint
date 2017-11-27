class AddArchivedToPlans < ActiveRecord::Migration[5.1]
  def change
    change_table :plans do |t|
      t.boolean :archived, default: false, index: true
    end
  end
end
