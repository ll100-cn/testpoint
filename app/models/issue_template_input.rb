# == Schema Information
#
# Table name: issue_template_inputs
#
#  id          :bigint           not null, primary key
#  template_id :bigint
#  label       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class IssueTemplateInput < ApplicationRecord
  belongs_to :template, class_name: 'IssueTemplate'
end
