# == Schema Information
#
# Table name: issue_template_inputs
#
#  id          :bigint           not null, primary key
#  template_id :bigint
#  as          :string
#  label       :string
#  name        :string
#  required    :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class IssueTemplateInput < ApplicationRecord
  belongs_to :template, class_name: 'IssueTemplate'
end
