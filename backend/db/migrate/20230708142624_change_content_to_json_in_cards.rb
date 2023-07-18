class ChangeContentToJsonInCards < ActiveRecord::Migration[7.0]
  def up
    remove_column :cards, :content, :text, default: [], array: true
    add_column :cards, :content, :text, default: '[]'
  end

  def down
    remove_column :cards, :content, :text, default: '[]'
    add_column :cards, :content, :text, default: [], array: true
  end
end
