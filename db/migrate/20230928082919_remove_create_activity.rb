class RemoveCreateActivity < ActiveRecord::Migration[7.0]
  class IssueActivity < ActiveRecord::Base; end

  def change
    IssueActivity.where(property: "project_id", before_value: nil).delete_all
  end
end
