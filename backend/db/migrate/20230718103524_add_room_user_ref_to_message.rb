class AddRoomUserRefToMessage < ActiveRecord::Migration[7.0]
  def up
    remove_column :messages, :user_id, :string
    remove_column :messages, :room_id, :string
    add_reference :messages, :user, foreign_key: true
    add_reference :messages, :room, foreign_key: true
  end

  def down
    remove_reference :messages, :user, foreign_key: true
    remove_reference :messages, :room, foreign_key: true
    add_column :messages, :user_id, :string
    add_column :messages, :room_id, :string
  end
end
