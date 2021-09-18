class RemoveStartAtFromPlans < ActiveRecord::Migration[6.1]
  def change
    remove_column :plans, :start_at, :string
  end
end
