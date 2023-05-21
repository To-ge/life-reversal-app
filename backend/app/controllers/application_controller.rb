class ApplicationController < ActionController::API
  def current_user
    @current_user ||=User.find_by(uid: session[:user_id]) if session[:user_id]
  end
end
