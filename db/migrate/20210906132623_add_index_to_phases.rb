class AddIndexToPhases < ActiveRecord::Migration[6.1]
  class Phase < ActiveRecord::Base; end
  def change
    add_column :phases, :index, :integer
    Phase.update_all(index: 0)
  end
end
