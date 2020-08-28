class AddCreatorToPlans < ActiveRecord::Migration[6.0]
  class Plan < ActiveRecord::Base; end
  class Member < ActiveRecord::Base; end
  class User < ActiveRecord::Base; end

  def change
    change_table :plans do |t|
      t.bigint :creator_id, foreign_key: true
    end

    Plan.all.each do |plan|
      default_creator  = User.where(email: "shilu@ll100.com").take
      default_member = Member.where(project_id: plan.project_id, user_id: default_creator.id).take
      default_member ||= Member.where(project_id: plan.project_id).first
      plan.update(creator_id: default_member.id)
    end

    change_column_null(:plans, :creator_id, false)

    add_index :plans, [:creator_id]
  end
end
