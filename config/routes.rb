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
        resource :profile

        resources :roadmaps
        resources :storyboards do
          resources :requirements
        end

        resources :analytics do
          get 'issue_creator_chart', on: :collection
          get 'issue_activity_chart', on: :collection
        end
        resources :member_infos
        resources :members do
          get "list", on: :collection
          patch :archive, on: :member
        end
        resources :categories
        resources :category_infos
        resources :test_case_stats
        resources :test_cases do
          get :history, on: :member
        end
        resources :platforms
        resources :test_case_labels
        resources :test_case_label_infos

        resources :plan_infos
        resources :plans do
          resources :phases do
            resources :task_upshot_infos
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

          resources :task_infos
        end

        resources :milestones do
          patch :archive, on: :member
          patch :active, on: :member
        end

        resources :issue_templates
        resources :issues do
          resource :body, controller: "issue_bodies" do
            member do
              patch :convert_comment
            end
          end

          resource :subscription
          resources :issue_relationships
          resources :issue_surveys
          resources :issue_actions

          resources :comments do
            member do
              get :comment
              patch :convert
            end
          end
        end
        resources :issue_stats
        resources :issue_infos do
          patch :resolve, on: :member
          patch :process, to: "issue_infos#process2", on: :member
        end
        resources :issue_summaries
        resources :issue_migrations
      end
    end

    namespace :profile do
      resource :account
      resources :issues
      resources :issue_stats

      resources :member_infos
    end

    devise_scope :user do
      post :deliver, to: "sessions#deliver"
      post :sign_in, to: "sessions#create"
      delete :sign_out, to: "sessions#destroy"
    end

    namespace :admin do
      resources :users
      resources :projects
    end
  end

  root to: "main#root"
  get "*path" => "main#root"
end
