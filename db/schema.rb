# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171127035455) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attachments", force: :cascade do |t|
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "components", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ancestry"
    t.boolean "archived", default: false
    t.index ["ancestry"], name: "index_components_on_ancestry"
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived", default: false
  end

  create_table "platforms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived", default: false
  end

  create_table "platforms_test_cases", id: false, force: :cascade do |t|
    t.bigint "platform_id"
    t.bigint "test_case_id"
    t.index ["platform_id"], name: "index_platforms_test_cases_on_platform_id"
    t.index ["test_case_id"], name: "index_platforms_test_cases_on_test_case_id"
  end

  create_table "task_attachments", force: :cascade do |t|
    t.bigint "task_id"
    t.bigint "attachment_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_id"], name: "index_task_attachments_on_attachment_id"
    t.index ["task_id"], name: "index_task_attachments_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "test_case_id"
    t.bigint "plan_id"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "platform_id"
    t.bigint "issue_id"
    t.text "message"
    t.index ["issue_id"], name: "index_tasks_on_issue_id"
    t.index ["plan_id"], name: "index_tasks_on_plan_id"
    t.index ["platform_id"], name: "index_tasks_on_platform_id"
    t.index ["test_case_id"], name: "index_tasks_on_test_case_id"
  end

  create_table "test_cases", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "component_id"
    t.boolean "archived", default: false
    t.index ["component_id"], name: "index_test_cases_on_component_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "platforms_test_cases", "platforms"
  add_foreign_key "platforms_test_cases", "test_cases"
  add_foreign_key "tasks", "platforms"
end
