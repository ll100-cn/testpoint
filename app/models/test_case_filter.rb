class TestCaseFilter
  include ActiveAttr::Model

  with_options default: [], typecaster: ->(value) { value.map { |id| id.presence&.to_i }.compact } do
    attribute :label_ids
    attribute :folder_ids
    attribute :platform_ids
  end

  def build_test_cases_scope(base)
    result = base
    result = result.joins(:folder).where(folders: { id: folder_ids }) if folder_ids.present?
    result = result.joins(:test_case_label_links).where(test_case_label_links: { test_case_label_id: label_ids }) if label_ids.present?
    result.distinct
  end
end
