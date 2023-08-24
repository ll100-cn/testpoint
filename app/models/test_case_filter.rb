class TestCaseFilter
  include ActiveAttr::Model

  attribute :role_names, default: -> { [] }

  def build_test_cases_scope(base)
    result = base
    result = result.where(role_name: role_names) if role_names.any?
    result
  end
end
