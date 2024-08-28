class CreateScenes < ActiveRecord::Migration[7.0]
  def change
    create_table :scenes do |t|
      t.belongs_to :storyboard, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
