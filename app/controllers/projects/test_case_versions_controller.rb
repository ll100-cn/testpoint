class Projects::TestCaseVersionsController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

    def index
    end

    def new
    end

    def create
      @test_case_version.save
      respond_with @test_case_version, location: ok_url_or_default([@project, :test_cases])
    end

    def edit
    end

    def update
      @test_case_version.update(test_case_version_params)
      respond_with @test_case_version, location: ok_url_or_default([@project, :test_cases])
    end

    def destroy
      @test_case_version.destroy
      respond_with @test_case_version, location: ok_url_or_default([@project, :test_cases])
    end

  protected
    def test_case_version_params
      params.fetch(:test_case_version, {}).permit(:title)
    end
end
