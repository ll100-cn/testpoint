class DataMigrationOnProject < ActiveRecord::Migration[5.2]
  class Project < ActiveRecord::Base
  end

  class User < ActiveRecord::Base
  end

  class Member < ActiveRecord::Base
  end

  class Component < ActiveRecord::Base
  end

  class Platform < ActiveRecord::Base
  end

  class TestCase < ActiveRecord::Base
  end

  class Plan < ActiveRecord::Base
  end

  class Issue < ActiveRecord::Base
  end

  class Label < ActiveRecord::Base
  end

  class Milestone < ActiveRecord::Base
  end

  def change
    project = Project.first_or_create! do |p|
      p.name = "Default Project"
    end
    Component.where(project_id: nil).update_all(project_id: project.id)
    Platform.where(project_id: nil).update_all(project_id: project.id)
    Plan.where(project_id: nil).update_all(project_id: project.id)
    TestCase.where(project_id: nil).update_all(project_id: project.id)
    Issue.where(project_id: nil).update_all(project_id: project.id)
    Label.where(project_id: nil).update_all(project_id: project.id)
    Milestone.where(project_id: nil).update_all(project_id: project.id)
    owner = User.order(:id).first
    Member.create!(role: "owner", project_id: project.id, user_id: owner.id)
    User.order(:id).where.not(id: owner.id).find_each do |user|
      Member.create!(role: "member", project_id: project.id, user_id: user.id)
    end
  end
end
