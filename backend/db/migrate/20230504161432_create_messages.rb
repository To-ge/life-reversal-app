class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.string :user_id, null: false
      t.string :room_id, null: false

      t.timestamps
    end
  end
end
