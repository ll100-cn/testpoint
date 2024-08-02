class CreateStoryboards < ActiveRecord::Migration[7.0]
  def change
    create_table :storyboards do |t|
      t.belongs_to :project, foreign_key: true, null: false
      t.string :title
      t.text :description

      t.timestamps
    end

    change_table :requirements do |t|
      t.belongs_to :storyboard, foreign_key: true
    end
  end
end
