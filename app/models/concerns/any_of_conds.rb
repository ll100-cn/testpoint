module AnyOfConds
  extend ActiveSupport::Concern

  class_methods do
    def where_any_of(*conds)
      or_conds = []
      joins_conds = []
      references_conds = []

      conds.each do |cond|
        case cond
        when Hash, Array, String
          or_conds << unscoped.where(cond)
        else
          cloned = cond.clone
          if cloned.joins_values.present?
            joins_conds += cloned.joins_values
            cloned.joins_values.clear
          end
          if cloned.references_values.present?
            references_conds += cloned.references_values
            cloned.references_values.clear
          end
          or_conds << unscoped.merge(cloned)
        end
      end

      scope = all
      scope = scope.joins(joins_conds) if joins_conds.present?
      scope = scope.references(references_conds) if references_conds.present?
      scope.merge(or_conds.reduce(:or))
    end
  end
end
