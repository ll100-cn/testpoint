class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  scope :where_exists, ->(scope) { where("EXISTS (?)", scope.select("1")) }
  scope :where_not_exists, ->(scope) { where.not("EXISTS (?)", scope.select("1")) }
end
