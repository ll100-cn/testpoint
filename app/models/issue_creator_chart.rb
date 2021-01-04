class IssueCreatorChart
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
    self.role = params[:role] || "reporter"
    @project = Project.find(self.project_id)
    @issues = @project.issues
    @issues = @issues.where("created_at > ?", Date.parse(self.starts_on).to_time) if self.starts_on.present?
    @issues = @issues.where("created_at < ?", Date.parse(self.ends_on).to_time + 1.day) if self.ends_on.present?

    @members = self.role.blank? ? @project.members : @project.members.where(role: self.role)
  end

  def labeled_issues_count_by_creator(label, member)
    @issues.where(creator_id: member.id).where_exists(IssuesLabel.where(label_id: label).where_table(:issue)).count
  end

  def total_issues_count_by_creator(member)
    @issues.where(creator_id: member.id).where_exists(IssuesLabel.where_table(:issue)).count
  end
end
