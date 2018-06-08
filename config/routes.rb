Rails.application.routes.draw do
  devise_for :users, path: ""
  root 'main#root'

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
    resources :comments do
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
  resources :attachments
  resources :users
  resource :profile
  resources :labels
  resources :milestones
end
