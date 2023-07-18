class Api::V1::FollowerRelationshipsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    followed_user = User.find_by(id: params[:followed_id])

    if FollowerRelationship.find_by(following_id: followed_user.id, follower_id: user.id)
      render json: {message: 'フォロー中です'}
    else
      if follow_ok?(user, followed_user)
        # フォロー関係が正常に作成された場合の処理
        
        render json: { message: 'フォローしました' }
      else
        render json: { error: 'フォローに失敗しました' }, status: :unprocessable_entity
      end
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  def destroy
    user = User.find_by(email: params[:email])
    # following_user = User.find_by(id: params[:following_id])
    relationship = user.following_relationships.find_by(following_id: params[:id])

    if relationship.destroy
      # フォロー関係が正常に作成された場合の処理

      render json: { message: 'フォロー解除しました' }
    else
      render json: { error: 'フォロー解除に失敗しました' }, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}
  end
  
  def find_followers
    user = User.find_by(email: params[:email])
    followers = user.followers

    if followers.size > 0
      render json: followers
    else
      render json: {error: "現在フォロワーはいません"}
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  def find_following_users
    user = User.find_by(email: params[:email])
    following_users = user.following_users

    if following_users.size > 0
      render json: following_users
    else
      render json: {error: "現在フォロー中のユーザーはいません"}
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  private
  def follow_ok?(user,followed_user)
    ActiveRecord::Base.transaction do
      FollowerRelationship.create(following_id: followed_user.id, follower_id: user.id)
      # user.following_users.create(following_id: followed_user.id)
      # followed_user.followers.create(follower_id: user.id)
    end
  end
end
