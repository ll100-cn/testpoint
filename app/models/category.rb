# == Schema Information
#
# Table name: categories
#
#  id                      :bigint           not null, primary key
#  name                    :string
#  description             :text
#  color                   :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  project_id              :bigint
#  default_as_test_failure :boolean          default(FALSE)
#

class Category < ApplicationRecord
  belongs_to :project
  has_many :issues

  validates :name, presence: true
end
