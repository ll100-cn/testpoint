require 'rails_helper'

RSpec.describe ApplicationHelper, :type => :helper do
  describe "#human" do
    let(:plan) { create :plan }
    it {
      expect(Plan.human_attribute_name(:title)).to eq "Title"
      expect(human(plan)).to eq "Plan"
    }
  end
end