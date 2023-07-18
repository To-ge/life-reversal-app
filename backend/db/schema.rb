# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_14_223738) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "article_id"
    t.text "content", default: "[]"
    t.index ["article_id"], name: "index_cards_on_article_id"
  end

  create_table "follower_relationships", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "follower_id", null: false
    t.bigint "following_id", null: false
    t.index ["follower_id"], name: "index_follower_relationships_on_follower_id"
    t.index ["following_id"], name: "index_follower_relationships_on_following_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "content", null: false
    t.string "user_id", null: false
    t.string "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.string "name", null: false
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "password_salt", null: false
    t.string "password_hash", null: false
  end

  add_foreign_key "articles", "users"
  add_foreign_key "cards", "articles"
  add_foreign_key "follower_relationships", "users", column: "follower_id"
  add_foreign_key "follower_relationships", "users", column: "following_id"
end
