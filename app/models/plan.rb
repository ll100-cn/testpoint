# == Schema Information
#
# Table name: plans
#
#  id           :bigint           not null, primary key
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  archived     :boolean          default(FALSE)
#  project_id   :bigint
#  creator_id   :bigint           not null
#  milestone_id :bigint
#  platform_id  :bigint
#

class Plan < ApplicationRecord
  has_many :phases, dependent: :destroy
  has_many :tasks
  has_many :test_cases, through: :tasks
  # has_many :folders, through: :test_cases
  belongs_to :project
  belongs_to :platform

  belongs_to :creator, class_name: "Member"
  belongs_to :milestone, optional: true

  validates :title, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :ranked, -> { order(:created_at).reverse_order }
  scope :recent, -> { where("created_at > ?", 1.month.ago) }

  def submit(test_case_filter)
    test_cases = test_case_filter.build_test_cases_scope(project.test_cases.available)

    transaction do
      raise ActiveRecord::Rollback unless save

      test_cases.each do |test_case|
        if test_case.platforms.where(id: platform.id).nil?
          task = tasks.new(test_case: test_case)

          if !task.save
            self.errors.add(:tasks, task.errors.full_messages.first)
            raise ActiveReocrd::Rollback
          end
        end
      end

      phase = phases.new(title: "第 1 轮", index: 0)

      if !phase.submit
        self.errors.add(:phases, phase.errors.full_messages.first)
        raise ActiveReocrd::Rollback
      end

      if !tasks.update_all(phase_id: phase.id)
        raise ActiveReocrd::Rollback
      end
    end

    self.errors.empty?
  end

  def archive
    update(archived: true)
  end

  def latest_phase
    phases.ranked.last
  end

  def finished?
    phases.ranked.last.tasks.where(state: :pending).empty?
  end
end
