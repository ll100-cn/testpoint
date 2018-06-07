Rails.application.routes.draw do
  devise_for :users, path: ""
  root 'main#root'

  resources :test_cases
  resources :plans do
    resources :tasks do
      resources :attachments
      member do
        get :change_state
        get :upload_attachment
        get :relate
      end
    end
  end
  resources :issues do
    resources :comments do
      resources :attachments
    end
    member do
      get :change_state
    end
  end
  resources :tasks do
    resources :issues do
    end
  end
  resources :components
  resources :platforms
  resources :users
  resource :profile
  resources :labels
  resources :milestones
end
