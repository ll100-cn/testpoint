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
    resources :comments
  end
  resources :tasks do
    resources :issues
  end
  resources :components
  resources :platforms
  resources :attachments
  resources :users
  resource :profile do
    member do
      patch :update_password
    end
  end
end
