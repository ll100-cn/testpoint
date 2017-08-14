class TestCasesController < ApplicationController
  layout "cases"
  load_and_authorize_resource :component
  load_and_authorize_resource :platform
  load_and_authorize_resource

  def index
    @test_cases = @test_cases.where(component_id: @component.subtree) if @component.present?
    @test_cases = @test_cases.where(platform_id: @platform) if @platform.present?
    @test_cases = @test_cases.page(params[:page])
  end

  def new
  end

  def create
    @test_case.save
    respond_with @test_case, location: ok_url_or_default([TestCase])
  end

  def show
  end

  def edit
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case, location: ok_url_or_default([TestCase])
  end

protected

  def test_case_params
    params.fetch(:test_case, {}).permit(:title, :content, :component_id, :platform_id)
  end
end
