module SqlScopes
  extend ActiveSupport::Concern

  included do
    scope :where_exists, ->(scope) { where("EXISTS (?)", scope.select("1").except(:order)) }
  end
end
