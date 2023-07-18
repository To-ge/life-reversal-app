Rails.application.routes.draw do
  get 'messages/index'
  get 'messages/create'
  namespace :api do
    namespace :v1 do
      post 'auth/login', to:'users#create'
      get 'auth/user', to:'users#find_user'
      delete 'auth/logout', to:'users#logout'
      resources :users, only: [:index, :destroy]
      resources :articles
      resources :cards
      resources :follower_relationships, only: [:create, :destroy, :show]
      post 'find_followers', to:'follower_relationships#find_followers'
      post 'find_following_users', to:'follower_relationships#find_following_users'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  # mount ActionCable.server => '/cable'
end
