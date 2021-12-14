class AddDefaultAsTestFailureToCategories < ActiveRecord::Migration[6.1]
  class Category < ActiveRecord::Base; end
  def change
    add_column :categories, :default_as_test_failure, :bool, default: false

    Category.reset_column_information
    Category.where(name: "缺陷问题").update_all(default_as_test_failure: true)
  end
end
