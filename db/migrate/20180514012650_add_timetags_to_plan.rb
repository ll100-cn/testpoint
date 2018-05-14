class AddTimetagsToPlan < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :start_time, :datetime
    add_column :plans, :end_time, :datetime
  end
end
