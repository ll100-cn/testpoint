class Api::Projects::RequirementsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :storyboard, through: :project
  load_and_authorize_resource through: :storyboard

  def index
    roadmap_id = params[:roadmap_id]&.to_i
    requirements_scope = @requirements
    if roadmap_id.nil?
      prev_roadmap = @project.roadmaps.ranked.first
      requirements_scope = requirements_scope.where_not_exists(
        RequirementRecord.where.not(deleted_at: nil)
                         .where_any_of(
                            RequirementRecord.where(roadmap_ids: []),
                            RequirementRecord.where("? = ANY(roadmap_ids)", prev_roadmap&.id)
                         )
                         .where_table(:requirement)
      )
    else
      requirements_scope = requirements_scope.where_exists(
        RequirementRecord.where(deleted_at: nil).where("? = ANY(roadmap_ids)", roadmap_id)
                         .where_table(:requirement)
      )
    end

    @requirements = requirements_scope
    requirement_records_scope = RequirementRecord.where(requirement_id: @requirements.ids)
    if roadmap_id
      requirement_records_scope = requirement_records_scope.where("? = ANY(roadmap_ids)", roadmap_id)
    end
    @requirement_records_group = requirement_records_scope.group_by(&:requirement_id)

    @requirements.each do |requirement|
      requirement.local_records = (@requirement_records_group[requirement.id] || []).sort_by(&:sort_key)
    end
  end

  def create
    @requirement.project = @project
    @requirement.create_with_record(requirement_record_params)
    respond_with @requirement
  end

  def update
    @requirement.update_with_record(requirement_params, requirement_record_params)
    respond_with @requirement
  end

  def destroy
    @requirement.destroy_with_record
    respond_with @requirement
  end
protected
  def requirement_params
    params.permit()
  end

  def requirement_record_params
    params.permit(:title, :description, platform_ids: [], upstream_ids: [], label_ids: [], label_descriptions: {})
  end
end
