class IssuesLabel < ApplicationRecord
  belongs_to :issue
  belongs_to :label
end
