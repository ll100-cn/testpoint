class AddfinishAtToTasks < ActiveRecord::Migration[6.0]
  class Task < ActiveRecord::Base; end
  def change
    add_column :tasks, :test_case_version, :datetime
    Task.where(state: ["passed", "failure"]).each do |t|
      t.test_case_version = Datetime.now
    end
  end
end
