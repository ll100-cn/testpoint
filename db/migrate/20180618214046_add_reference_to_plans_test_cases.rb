class AddReferenceToPlansTestCases < ActiveRecord::Migration[5.2]
  def change
    add_reference :plans, :project, foreign_key: true
    add_reference :test_cases, :project, foreign_key: true
  end
end
