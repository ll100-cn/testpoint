class IssueAttachment < ApplicationRecord
  belongs_to :issue
  belongs_to :attachment
end
