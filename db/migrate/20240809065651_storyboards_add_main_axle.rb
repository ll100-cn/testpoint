class StoryboardsAddMainAxle < ActiveRecord::Migration[7.0]
  def change
    change_table :storyboards do |t|
      t.string :main_axle
    end
  end
end
