class TestCaseVersionAddObjectChange < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end

  def change
    change_table :versions do |t|
      t.json :object_changes
    end
  end
end
