module SqlScopes
  extend ActiveSupport::Concern

  included do
    scope :where_exists_by, ->(predicate, scope) { where("#{predicate} (?)", scope.select("1").except(:order)) }
    scope :where_exists, ->(scope) { where_exists_by("EXISTS", scope) }
    scope :where_not_exists, ->(scope) { where_exists_by("NOT EXISTS", scope) }
  end

  module ClassMethods
    def where_table(name)
      reflection = reflections[name.to_s]
      join_keys = reflection.join_keys

      if (through_reflection = reflection.through_reflection)
        self.joins(through_reflection.name)
          .where("#{through_reflection.klass.table_name}.#{join_keys.foreign_key}=#{reflection.klass.table_name}.#{join_keys.key}")
      else
        self.where("#{table_name}.#{join_keys.foreign_key}=#{reflection.klass.table_name}.#{join_keys.key}")
      end
    end
  end
end
