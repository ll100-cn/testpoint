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
#  object_changes :json
#
class TestCaseVersion < PaperTrail::Version
  def reify_with_create
    if event == 'create'
      result = item_type.constantize.new
      PaperTrail::Reifier.send(:reify_attributes, result, self, changeset.transform_values(&:last))
      result
    else
      reify
    end
  end

  aloader_init do
    preset :main
  end
end
