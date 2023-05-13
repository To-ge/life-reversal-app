class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name, null: false
      t.string :email, unique: true

      t.timestamps null: false
    end
  end
end
