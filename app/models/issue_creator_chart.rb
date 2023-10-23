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

    @categories = @project.categories
    @members = self.role.blank? ? @project.members : @project.members.where(role: self.role)
  end

  def issues_count_by_creator_and_category()
    counts = @issues.where(creator_id: @members, category_id: @categories).group(:creator_id, :category_id).count
    counts.map do |k, v|
      {creator_id: k[0], category_id: k[1], count: v}
    end
  end
end
