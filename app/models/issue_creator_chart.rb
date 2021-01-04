class IssueCreatorChart
  include ActiveAttr::Model

  attribute :project_id
  attribute :starts_at
  attribute :ends_at
  attribute :role

  attr_reader :members
  attr_reader :issues


  def initialize(params)
    self.project_id = params[:project_id]
    self.starts_at = params[:starts_at] || 1.year.ago.beginning_of_year
    self.ends_at = params[:ends_at] || Time.current
    self.role = params[:role]
    @project = Project.find(self.project_id)
    @issues = @project.issues
    @issues = @issues.where("created_at > ?", self.starts_at) if self.starts_at.present?
    @issues = @issues.where("created_at < ?", self.ends_at) if self.ends_at.present?
    @members = self.role.present? ? @project.members.where(role: self.role) : @project.members
  end

  def labeled_issues_count_by_creator(label, member)
    @issues.where(creator_id: member.id).where_exists(IssuesLabel.where(label_id: label).where_table(:issue)).count
  end

  def total_issues_count_by_creator(member)
    @issues.where(creator_id: member.id).where_exists(IssuesLabel.where_table(:issue)).count
  end
end
