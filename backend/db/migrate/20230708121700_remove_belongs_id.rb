class RemoveBelongsId < ActiveRecord::Migration[7.0]
  def change
    remove_column :articles, :user_id, :string
    remove_column :cards, :user_id, :string
    remove_column :cards, :article_id, :string
  end
end
