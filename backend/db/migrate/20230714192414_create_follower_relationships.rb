class CreateFollowerRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :follower_relationships do |t|

      t.timestamps
    end
  end
end
