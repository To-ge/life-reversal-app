class AddFollowerAndFollowingId < ActiveRecord::Migration[7.0]
  def up
    add_reference :follower_relationships, :follower, null: false, foreign_key: { to_table: :users }
    add_reference :follower_relationships, :following, null: false, foreign_key: { to_table: :users }
  end

  def down
    remove_reference :follower_relationships, :follower, null: false, foreign_key: { to_table: :users }
    remove_reference :follower_relationships, :following, null: false, foreign_key: { to_table: :users }
  end
end
