Rails.application.routes.draw do
  devise_for :users, path: ""
  get '/', to: redirect('/projects'), as: :root

  resources :projects do
    resources :test_cases
    resources :plans do
      resources :tasks do
        member do
          get :change_state
          get :upload_attachment
          get :relate
        end
      end
    end
    resources :issues do
      resources :comments
    end
    resources :tasks do
      resources :issues
    end
    resources :components
    resources :platforms
    resources :members
    resources :labels
    resources :milestones
    member do
      post :remove_member
    end
  end

  resources :users
  resources :attachments
  resource :profile
end
