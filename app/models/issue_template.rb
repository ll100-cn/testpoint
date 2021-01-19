# == Schema Information
#
# Table name: issue_templates
#
#  id                   :bigint           not null, primary key
#  name                 :string
#  project_id           :bigint           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  lookup_by_build_form :boolean          default(TRUE)
#

class IssueTemplate < ApplicationRecord
  belongs_to :project
  has_many :inputs, class_name: "IssueTemplateInput", foreign_key: :template_id, inverse_of: :template
  accepts_nested_attributes_for :inputs, allow_destroy: true

  scope :available_for_build_form, -> { where(lookup_by_build_form: true ) }

  def content_blank?
    inputs.blank?
  end
end
