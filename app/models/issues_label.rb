# == Schema Information
#
# Table name: issues_labels
#
#  id         :bigint           not null, primary key
#  issue_id   :bigint
#  label_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class IssuesLabel < ApplicationRecord
  belongs_to :issue
  belongs_to :label
end
