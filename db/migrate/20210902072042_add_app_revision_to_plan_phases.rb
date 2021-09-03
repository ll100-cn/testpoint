class AddAppRevisionToPlanPhases < ActiveRecord::Migration[6.1]
  def change
    add_column :plan_phases, :app_revision, :string
  end
end
