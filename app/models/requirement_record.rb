# == Schema Information
#
# Table name: requirement_records
#
#  id                 :bigint           not null, primary key
#  requirement_id     :bigint           not null
#  roadmap_ids        :bigint           default([]), is an Array
#  deleted_at         :datetime
#  platform_ids       :bigint           default([]), is an Array
#  upstream_ids       :bigint           default([]), is an Array
#  title              :string
#  description        :text
#  label_ids          :bigint           default([]), is an Array
#  label_descriptions :json
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class RequirementRecord < ApplicationRecord
  belongs_to :requirement

  validates :title, presence: true

  def sort_key
    (roadmap_ids.max || 9223372036854775807) * -1
  end
end
