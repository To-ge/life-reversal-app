class Api::V1::UsersController < ApplicationController
  def create
    user = User.find_or_create_by(user_params)

    if user
      render json: user
    else
      render json: {error: "ログインに失敗しました"}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def destroy
    user = User.find_by(email: params[:email])

    if user
      user.destroy
    else
      render json: {error: "ユーザーが見つかりませんでした"}, status: :not_found
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  private

  def user_params
    params.require(:user).permit(:provider, :uid, :name, :email)
  end
end
