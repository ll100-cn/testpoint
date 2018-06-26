class RemoveReferences < ActiveRecord::Migration[5.2]
  def change
    remove_reference :tasks, :project, foreign_key: true
    remove_reference :comments, :project, foreign_key: true
  end
end
