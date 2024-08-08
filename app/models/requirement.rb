# == Schema Information
#
# Table name: requirements
#
#  id                 :bigint           not null, primary key
#  project_id         :bigint           not null
#  platform_ids       :bigint           default([]), is an Array
#  upstream_ids       :bigint           default([]), is an Array
#  title              :string
#  description        :text
#  roles              :string           default([]), is an Array
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  storyboard_id      :bigint
#  label_ids          :bigint           default([]), is an Array
#  label_descriptions :json
#
class Requirement < ApplicationRecord
  belongs_to :project
  belongs_to :storyboard

  has_array_of :upstreams, class_name: 'Requirement'
  has_array_of :platforms, class_name: 'Platform'
  has_array_of :labels, class_name: 'TestCaseLabel'

  validates :title, presence: true
end
