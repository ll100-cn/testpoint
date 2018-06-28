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

ActiveRecord::Schema.define(version: 2018_06_27_013810) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "attachments", force: :cascade do |t|
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "title"
    t.bigint "attachmentable_id"
    t.string "attachmentable_type"
    t.index ["attachmentable_id"], name: "index_attachments_on_attachmentable_id"
    t.index ["attachmentable_type"], name: "index_attachments_on_attachmentable_type"
  end

  create_table "comment_attachments", force: :cascade do |t|
    t.bigint "comment_id"
    t.bigint "attachment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_id"], name: "index_comment_attachments_on_attachment_id"
    t.index ["comment_id"], name: "index_comment_attachments_on_comment_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "issue_id"
    t.index ["issue_id"], name: "index_comments_on_issue_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "components", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ancestry"
    t.boolean "archived", default: false
    t.bigint "project_id"
    t.index ["ancestry"], name: "index_components_on_ancestry"
    t.index ["project_id"], name: "index_components_on_project_id"
  end

  create_table "issue_attachments", force: :cascade do |t|
    t.bigint "issue_id"
    t.bigint "attachment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_id"], name: "index_issue_attachments_on_attachment_id"
    t.index ["issue_id"], name: "index_issue_attachments_on_issue_id"
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "milestone_id"
    t.bigint "creator_id"
    t.bigint "assignee_id"
    t.bigint "project_id"
    t.index ["assignee_id"], name: "index_issues_on_assignee_id"
    t.index ["creator_id"], name: "index_issues_on_creator_id"
    t.index ["milestone_id"], name: "index_issues_on_milestone_id"
    t.index ["project_id"], name: "index_issues_on_project_id"
  end

  create_table "issues_labels", force: :cascade do |t|
    t.bigint "issue_id"
    t.bigint "label_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_issues_labels_on_issue_id"
    t.index ["label_id"], name: "index_issues_labels_on_label_id"
  end

  create_table "labels", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "project_id"
    t.index ["project_id"], name: "index_labels_on_project_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "role"
    t.bigint "project_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_members_on_project_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "milestones", force: :cascade do |t|
    t.string "title"
    t.datetime "end_time"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_time"
    t.bigint "project_id"
    t.index ["project_id"], name: "index_milestones_on_project_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived", default: false
    t.datetime "start_at"
    t.bigint "project_id"
    t.index ["project_id"], name: "index_plans_on_project_id"
  end

  create_table "platforms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived", default: false
    t.bigint "project_id"
    t.index ["project_id"], name: "index_platforms_on_project_id"
  end

  create_table "platforms_test_cases", id: false, force: :cascade do |t|
    t.bigint "platform_id"
    t.bigint "test_case_id"
    t.index ["platform_id"], name: "index_platforms_test_cases_on_platform_id"
    t.index ["test_case_id"], name: "index_platforms_test_cases_on_test_case_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects_users", force: :cascade do |t|
    t.bigint "project_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_projects_users_on_project_id"
    t.index ["user_id"], name: "index_projects_users_on_user_id"
  end

  create_table "task_attachments", force: :cascade do |t|
    t.bigint "task_id"
    t.bigint "attachment_id"
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
    t.bigint "project_id"
    t.index ["component_id"], name: "index_test_cases_on_component_id"
    t.index ["project_id"], name: "index_test_cases_on_project_id"
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
    t.string "name"
    t.boolean "superadmin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "issues"
  add_foreign_key "comments", "users"
  add_foreign_key "components", "projects"
  add_foreign_key "issues", "milestones"
  add_foreign_key "issues", "projects"
  add_foreign_key "issues_labels", "issues"
  add_foreign_key "issues_labels", "labels"
  add_foreign_key "labels", "projects"
  add_foreign_key "milestones", "projects"
  add_foreign_key "plans", "projects"
  add_foreign_key "platforms", "projects"
  add_foreign_key "platforms_test_cases", "platforms"
  add_foreign_key "platforms_test_cases", "test_cases"
  add_foreign_key "projects_users", "projects"
  add_foreign_key "projects_users", "users"
  add_foreign_key "tasks", "platforms"
  add_foreign_key "test_cases", "projects"
end
