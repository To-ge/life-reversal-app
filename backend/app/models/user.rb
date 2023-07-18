class User < ApplicationRecord
  has_many :rooms
  has_many :articles

  # フォロワーとの関連付け
  has_many :follower_relationships, foreign_key: :following_id
  has_many :followers, through: :follower_relationships, source: :follower

  # フォロー中のユーザーとの関連付け
  has_many :following_relationships, foreign_key: :follower_id, class_name: 'FollowerRelationship'
  has_many :following_users, through: :following_relationships, source: :following

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
