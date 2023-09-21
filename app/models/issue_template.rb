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
#  title_suggestion     :string
#  content_suggestion   :string
#  default_category_id  :bigint
#  default_priority     :string
#

class IssueTemplate < ApplicationRecord
  belongs_to :project
  belongs_to :default_category, class_name: Category.to_s, optional: true
  has_many :issue_surveys, dependent: :restrict_with_error, foreign_key: :template_id
  has_many :inputs, class_name: "IssueTemplateInput", foreign_key: :template_id, inverse_of: :template
  accepts_nested_attributes_for :inputs, allow_destroy: true

  scope :available_for_build_form, -> { where(lookup_by_build_form: true) }
  enumerize :default_priority, in: Issue.priority.values, default: :normal

  def content_blank?
    inputs.blank?
  end
end
