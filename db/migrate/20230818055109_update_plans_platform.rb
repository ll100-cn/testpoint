class UpdatePlansPlatform < ActiveRecord::Migration[7.0]
  class Plan < ActiveRecord::Base; end
  class Task < ActiveRecord::Base; end
  class TestCase < ActiveRecord::Base; end
  class Phase < ActiveRecord::Base; end

  def change
    Plan.where(platform_id: nil).find_each do |plan|
      tasks = Task.where(plan_id: plan.id)
      if tasks.empty?
        Phase.where(plan_id: plan.id).destroy_all
        plan.destroy!
        next
      end
      test_case = TestCase.where(id: tasks.select(:test_case_id)).where("ARRAY_LENGTH(platform_ids, 1) > 0").take
      plan.platform_id = test_case.platform_ids.first
      plan.save!
    end
  end
end
