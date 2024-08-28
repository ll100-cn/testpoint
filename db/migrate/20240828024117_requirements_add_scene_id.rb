class RequirementsAddSceneId < ActiveRecord::Migration[7.0]
  def change
    change_table :requirements do |t|
      t.belongs_to :scene
    end
  end
end
