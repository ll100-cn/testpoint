class AddPlatformIdToPlans < ActiveRecord::Migration[6.1]
  class Plan < ActiveRecord::Base; end
  class Task < ActiveRecord::Base; end

  def change
    add_reference :plans, :platform, null: true, foreign_key: true

    Plan.find_each do |plan|
      platform_ids = Task.where(plan_id: plan.id).distinct.pluck(:platform_id)
      if platform_ids.count == 1
        plan.update(platform_id: platform_ids.first)
      end
    end
  end
end
