require 'rails_helper'

RSpec.describe ApplicationHelper, :type => :helper do
  describe "#human" do
    let(:plan) { create :plan }
    context "with attribute_name" do
      it { expect(human(Plan, :title)).to eq "Title" }
    end

    context "without attribute_name" do
      it { expect(human(plan)).to eq "Plan" }
    end
  end
end