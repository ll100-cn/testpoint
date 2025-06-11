require 'sidekiq/web'
# Sidekiq::Web.set :sessions, false

Rails.application.routes.draw do
  devise_for :users, path: "", controllers: {
    sessions: "sessions",
    login_codes: "login_codes"
  }
  authenticate :user, ->(u) { u.superadmin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :attachments

    resources :projects do
      scope module: 'projects' do
        resources :analytics do
          get 'issue_creator_chart', on: :collection
          get 'issue_activity_chart', on: :collection
        end
        resources :category_infos
        resources :storyboards do
          resources :requirement_stats
        end
        resources :issues do
          resource :subscription
          resources :issue_surveys
        end
        resources :issue_stats
        resources :issue_migrations
      end
    end

    namespace :profile do
      resources :issues
      resources :issue_stats
    end

    devise_scope :user do
      post :deliver, to: "sessions#deliver"
      post :sign_in, to: "sessions#create"
      delete :sign_out, to: "sessions#destroy"
    end



    namespace :v2 do
      namespace :admin do
        resources :users
        resources :projects
      end

      resources :projects do
        scope module: 'projects' do
          resource :profile

          resources :roadmaps
          resources :storyboards do
            resources :scenes
            resources :requirements
          end

          resources :issues do
            member do
              post :merge
              patch :resolve
              patch :process, to: "issues#process2"
            end

            get :summary, on: :collection

            resources :issue_actions
            resource :body, controller: "issue_bodies" do
              member do
                patch :convert_comment
              end
            end
            resources :issue_relationships

            resources :comments do
              member do
                get :comment
                patch :convert
              end
            end
          end

          resources :members do
            patch :archive, on: :member
          end
          resources :categories
          resources :milestones do
            patch :archive, on: :member
            patch :active, on: :member
          end
          resources :issue_templates
          resources :test_case_labels
          resources :platforms

          resources :test_cases do
            get :history, on: :member
          end
          resources :test_case_stats

          resources :plans do
            resources :phases do
              resources :task_upshots
            end

            resources :tasks do
              member do
                patch :ignore
                patch :unignore
              end

              resources :upshots do
                member do
                  patch :state
                  patch :content
                end
              end
            end
          end
        end
      end

      namespace :profile do
        resource :account
        resources :issues
        resources :members
      end
    end
  end

  root to: "main#root"
  get "*path" => "main#root"
end
