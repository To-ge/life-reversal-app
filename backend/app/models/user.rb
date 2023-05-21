class User < ApplicationRecord
  has_many :rooms
  has_many :articles
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
