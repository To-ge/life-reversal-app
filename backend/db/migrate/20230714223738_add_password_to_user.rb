class AddPasswordToUser < ActiveRecord::Migration[7.0]
  def up
    add_column :users, :password_salt, :string, null: false
    add_column :users, :password_hash, :string, null: false
  end

  def down
    remove_column :users, :password_salt
    remove_column :users, :password_hash
  end
end
