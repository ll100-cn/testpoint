class CreateRoadmaps < ActiveRecord::Migration[7.0]
  def change
    create_table :roadmaps do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
