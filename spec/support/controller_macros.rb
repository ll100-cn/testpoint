module ControllerMacros
  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryBot.create(:user)
      sign_in user
    end
  end

  def login_superadmin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      superadmin = FactoryBot.create(:user, :superadmin)
      sign_in superadmin
    end
  end
end
