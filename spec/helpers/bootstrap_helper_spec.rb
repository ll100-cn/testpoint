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
end
