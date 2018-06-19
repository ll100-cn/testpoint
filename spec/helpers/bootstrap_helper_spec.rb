require 'rails_helper'

RSpec.describe BootstrapHelper do
  describe "#bootstrap_flash_class_for" do
    it { expect(helper.bootstrap_flash_class_for("xxoo")).to eq "xxoo" }

    context "when notice" do
      it { expect(helper.bootstrap_flash_class_for("notice")).to eq "success" }
    end

    context "when alert" do
      it { expect(helper.bootstrap_flash_class_for("alert")).to eq "danger" }
    end
  end

  describe "#bootstrap_horizontal_form_for" do
    let(:project) { create :project }
    let(:issue) { Issue.new }
    let(:milestone) { create :milestone, project: project }
    let(:html) {
      helper.bootstrap_horizontal_form_for [project, issue] do |f|
        f.input :milestone_id, collection: [ milestone ], as: :radio_buttons, wrapper: :horizontal_collection
      end
    }
    it { expect(html).not_to be_blank }
  end
end
