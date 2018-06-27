class GenerateSuperadmin < ActiveRecord::Migration[5.2]
  class User < ActiveRecord::Base
  end

  def change
    user = User.first
    user.update!(superadmin: true) if user
  end
end
