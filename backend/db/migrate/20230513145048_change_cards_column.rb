class ChangeCardsColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :cards, :order, :string
    remove_column :cards, :content, :text
    add_column :cards, :content, :text, array: true, default: []
  end
end
