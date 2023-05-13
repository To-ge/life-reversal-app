class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.string :user_id, null: false
      t.string :article_id, null: false
      t.string :order, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
