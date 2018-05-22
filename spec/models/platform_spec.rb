# == Schema Information
#
# Table name: platforms
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#

require 'rails_helper'

RSpec.describe Platform, type: :model do
  describe "connect_test_cases" do
    let(:platform) { create :platform }
    let(:test_case1) { create :test_case }
    let(:test_case2) { create :test_case }
    it { expect(TestCase.where_exists(Platform.connect_test_cases.where(id: platform.id)).count).to eq 0 }
    end
end