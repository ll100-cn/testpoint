class Svc::V2::Projects::IssueMigrationsController < Svc::V2::Projects::BaseController
  before_action -> { @project = current_project }

  def create
    @form = IssueMigrationForm.new(migrate_params)
    @form.submit(current_member) do |source_member, target_member|
      source_ability = Ability.new(current_user) { |it| it.apply_member_permissions(source_member) }
      source_ability.authorize! :manage, Issue

      target_ability = Ability.new(current_user) { |it| it.apply_member_permissions(target_member) }
      target_ability.authorize! :manage, Issue
    end

    respond_with @form
  end

protected
  def migrate_params
    params.permit(:source_issue_id, :target_project_id, :target_category_id)
  end
end
