# == Schema Information
#
# Table name: components
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#

require 'rails_helper'

RSpec.describe Component, type: :model do
  let(:component) { create :component }

  describe "#ancestor_ids_with_self" do
    it { expect(component.ancestor_ids_with_self).to eq [component.id] }
  end
end
