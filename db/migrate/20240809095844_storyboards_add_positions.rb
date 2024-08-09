class StoryboardsAddPositions < ActiveRecord::Migration[7.0]
  def change
    change_table :storyboards do |t|
      t.json :positions, default: {}
    end
  end
end
