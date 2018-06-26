class AddReferenceToMoreModels < ActiveRecord::Migration[5.2]
  def change
    add_reference :platforms, :project, foreign_key: true
    add_reference :components, :project, foreign_key: true
    add_reference :labels, :project, foreign_key: true
    add_reference :milestones, :project, foreign_key: true
  end
end
