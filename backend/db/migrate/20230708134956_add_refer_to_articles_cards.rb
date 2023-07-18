class AddReferToArticlesCards < ActiveRecord::Migration[7.0]
  def change
    add_reference :articles, :user, foreign_key: true
    add_reference :cards, :article, foreign_key: true
  end
end
