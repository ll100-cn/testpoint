# == Schema Information
#
# Table name: versions
#
#  id             :bigint           not null, primary key
#  item_type      :string           not null
#  item_id        :bigint           not null
#  event          :string           not null
#  whodunnit      :string
#  old_object     :text
#  created_at     :datetime
#  transaction_id :integer
#  object         :json
#
class TestCaseVersion < PaperTrail::Version
end
