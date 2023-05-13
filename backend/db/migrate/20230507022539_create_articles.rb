class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :user_id, null: false
      t.text :text, null: false

      t.timestamps
    end
  end
end
