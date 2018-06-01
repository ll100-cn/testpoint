class LabelsController < ApplicationController
  load_and_authorize_resource

  def index
    @labels = @labels.page(params[:page])
  end

  def new
    @label.color = "#ace0ef"
  end

  def create
    @label.save
    respond_with @label, location: ok_url_or_default([Label])
  end

  def show
  end

  def edit
  end

  def update
    @label.update(label_params)
    respond_with @label, location: ok_url_or_default([Label])
  end

  def destroy
    @label.delete
    respond_with @label, location: ok_url_or_default([Label])
  end

protected

  def label_params
    params.fetch(:label, {}).permit(:name, :description, :color)
  end
end
