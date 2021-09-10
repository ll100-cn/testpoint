class Projects::TasksController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan

end
