class Projects::MilestonesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @milestones = @milestones.page(params[:page])
  end

  def new
  end

  def create
    @milestone.save
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end

  def show
    @q = @milestone.issues.ransack(params[:q])
    @issues = @q.result.page(params[:page])
    @tasks_count_mapping = Task.where(plan_id: @milestone.plans).group(:plan_id, :state).count
  end

  def edit
  end

  def update
    @milestone.update(milestone_params)
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end

  def destroy
    @milestone.destroy
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end

protected
  def milestone_params
    params.fetch(:milestone, {}).permit(:title, :published_at, :description, attachment_ids: [])
  end
end
