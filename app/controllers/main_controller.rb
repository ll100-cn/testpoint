class MainController < ApplicationController
  before_action :authenticate_user!

  layout "project"

  def root
  end
end
