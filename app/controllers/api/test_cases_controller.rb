class Api::TestCasesController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @test_case_snapshot = @project.test_case_snapshots.where(id: params[:test_case_snapshot_id]).first

    if @test_case_snapshot
      @test_cases = @test_cases.where("test_cases.created_at <= ?", @test_case_snapshot.version_at)
      join_sub_query = TestCaseVersion.from("versions as v1").joins("INNER JOIN test_cases ON test_cases.id = v1.item_id AND v1.item_type = 'TestCase'")
                            .merge(@test_cases)
                            .where("v1.created_at <= ?", @test_case_snapshot.version_at)
                            .group("v1.item_id")
                            .select("MAX(v1.created_at) as created_at, v1.item_id")

      @test_case_versions = TestCaseVersion.where(
        item_type: 'TestCase',
      ).joins("INNER JOIN (#{join_sub_query.to_sql}) as v2 ON v2.item_id = versions.item_id AND v2.created_at = versions.created_at")

      @version_mapping = @test_case_versions.index_by(&:item_id)

      @test_cases = @test_cases.map do |test_case|
        if @version_mapping.key?(test_case.id)
          version = @version_mapping[test_case.id]
          reify = version.reify_with_create
        else
          test_case
        end
      end
    else
      latest_snapshot = @project.test_case_snapshots.ranked.first
      if latest_snapshot
        @test_cases = @test_cases.where("archived_at is NULL OR archived_at > ?", latest_snapshot.version_at)
      end
    end
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case
  end

protected
  def test_case_params
    params.permit(:title, :role_name, :content, :scene_name, :group_name, label_ids: [], platform_ids: [])
  end
end