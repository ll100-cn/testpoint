class AddMilestoneIdToPlan < ActiveRecord::Migration[6.1]
  def change
    change_table :plans do |t|
      t.belongs_to :milestone, optional: true
    end
  end
end
