# == Schema Information
#
# Table name: test_case_records
#
#  id           :bigint           not null, primary key
#  test_case_id :bigint
#  changed_at   :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class TestCaseRecord < ApplicationRecord
  belongs_to :test_case
end
