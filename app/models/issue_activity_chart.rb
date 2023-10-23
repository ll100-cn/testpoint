class IssueActivityChart
  include ActiveAttr::Model

  attribute :project_id
  attribute :starts_on
  attribute :ends_on
  attribute :role

  attr_reader :members
  attr_reader :issues

  def initialize(params)
    self.project_id = params[:project_id]
    self.starts_on = params[:starts_on] || 1.month.ago.to_date.to_s
    self.ends_on = params[:ends_on] || Date.current.to_s
    self.role = params[:role]
    @project = Project.find(self.project_id)
    @issues = @project.issues
    @issues = @issues.where("created_at > ?", self.starts_on) if self.starts_on.present?
    @issues = @issues.where("created_at < ?", self.ends_on) if self.ends_on.present?
    @members = self.role.present? ? @project.members.where(role: self.role) : @project.members
  end

  def issues_confirm_time()
    confirmed_issues = @issues.where_exists(IssueActivity.where(property: "state", after_value: "confirmed").where_table(:issue))
    (0..7).map do |wday|
      issues = confirmed_issues.select { |issue| issue.created_at.wday == wday }

      (1..24).map do |hour|
        issues_this_hour = issues.select { |issue| issue.created_at.hour == hour }
        if issues_this_hour.empty?
          0
        else
          ((issues_this_hour.sum { |issue| issue_confirm_time(issue) } / issues_this_hour.count) / 1.hour).round(1)
        end
      end
    end
  end

  def issue_confirm_time(issue)
    from = issue.created_at
    to = issue.activities.where(property: "state", after_value: "confirmed").last&.created_at
    to - from
  end
end
