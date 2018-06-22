# == Schema Information
#
# Table name: issues_labels
#
#  id         :bigint(8)        not null, primary key
#  issue_id   :bigint(8)
#  label_id   :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class IssuesLabel < ApplicationRecord
  belongs_to :issue
  belongs_to :label
end
