class Article < ApplicationRecord
  belongs_to :user
  has_many :cards
  validates :user_id, presence: true
end
