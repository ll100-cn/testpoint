class AddAncestryToComponents < ActiveRecord::Migration[5.1]
  def change
    add_column :components, :ancestry, :string
    add_index :components, :ancestry
  end
end
