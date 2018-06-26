module SqlScopes
  extend ActiveSupport::Concern

  included do
    scope :where_exists, ->(scope) { where("EXISTS (?)", scope.select("1").except(:order)) }
    scope :where_not_exists, ->(scope) { where.not("EXISTS (?)", scope.select("1").except(:order)) }
  end

  module ClassMethods
    def where_table(name)
      reflection = reflections[name.to_s]
      join_keys = reflection.join_keys
      self.where("#{table_name}.#{join_keys.foreign_key}=#{reflection.klass.table_name}.#{join_keys.key}")
    end
  end
end
