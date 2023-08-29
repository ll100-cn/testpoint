class TaskAddIgnoreAt < ActiveRecord::Migration[7.0]
  def change
    change_table :tasks do |t|
      t.datetime :ignore_at
    end
  end
end
