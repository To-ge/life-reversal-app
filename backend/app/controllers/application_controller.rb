class ApplicationController < ActionController::API

  def current_user
    puts '🍌'
    puts session[:user_id]
    current_user ||=User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
