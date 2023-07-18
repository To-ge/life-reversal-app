require 'bcrypt'

class Api::V1::UsersController < ApplicationController
  def create

    if User.exists?(email: params[:email])
      user = User.find_by(email: params[:email])
      if (not email_conflict?(user)) && BCrypt::Engine.hash_secret(params[:password], user.password_salt) == user.password_hash
        # 認証成功の処理
        session[:user_id] = user.id
        render json: user
      else
        # ログイン失敗の処理を行う
        render json: {error: "名前もしくはパスワードが違います"}, status: :unprocessable_entity
      end
    else
      new_user = User.create(user_params)
      if new_user.persisted?
        render json: new_user
      else
        render json: {error: "ログインに失敗しました"}, status: :unprocessable_entity
      end
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def index
    users = User.all

    if users
      render json: users
    end
  rescue StandardError => e
    render json: {error: e.message}
  end

  def find_user
    render json: current_user
  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def destroy
    user = User.find_by(email: params[:email])

    if user
      reset_session
      user.destroy
    else
      render json: {error: "ユーザーが見つかりませんでした"}, status: :not_found
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def logout
    reset_session
  end

  private

  def user_params
    user_params = params.require(:user).permit(:provider, :uid, :name, :email, :image)
    user_params[:password_salt] = BCrypt::Engine.generate_salt
    user_params[:password_hash] = BCrypt::Engine.hash_secret(params[:password], user_params[:password_salt])
    user_params
  end

  def email_conflict?(user)
    params[:name] != user.name
  end
end
