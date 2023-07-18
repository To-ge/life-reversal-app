class Api::V1::FollowsController < ApplicationController
  def create
    user = User.find_by(uid: params[:uid]) # フォローするユーザー
    new_following_user = User.find_by(id: params[:following_id]) # フォローされるユーザー

    if user.following_users << new_following_user
      render json: { message: 'フォローしました' }
    else
      render json: { error: 'フォローに失敗しました' }, status: :unprocessable_entity
    end
  end

  def find_followers
    user = User.find(params[:uid])
    followers = user.followers

    if followers
      render json: followers
    end
  rescue StandardError => e
    render json: {error: e.message}
  end

  def find_following_users
    user = User.find(params[:uid])
    following_users = user.following_users

    if following_users
      render json: following_users
    end
  rescue StandardError => e
    render json: {error: e.message}
  end

end
