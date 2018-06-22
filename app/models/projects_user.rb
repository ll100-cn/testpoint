# == Schema Information
#
# Table name: projects_users
#
#  id         :bigint(8)        not null, primary key
#  project_id :bigint(8)
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProjectsUser < ApplicationRecord
  belongs_to :user
  belongs_to :project
end