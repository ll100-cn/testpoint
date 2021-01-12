# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_12_034926) do

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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "title"
    t.bigint "attachmentable_id"
    t.string "attachmentable_type"
    t.string "content_type"
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
    t.bigint "issue_id"
    t.datetime "last_edited_at"
    t.boolean "collapsed", default: false
    t.bigint "member_id"
    t.index ["issue_id"], name: "index_comments_on_issue_id"
    t.index ["member_id"], name: "index_comments_on_member_id"
  end

  create_table "folders", force: :cascade do |t|
    t.string "name"
    t.string "ancestry"
    t.bigint "project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "syscode"
    t.index ["ancestry"], name: "index_folders_on_ancestry"
    t.index ["project_id"], name: "index_folders_on_project_id"
  end

  create_table "issue_activities", force: :cascade do |t|
    t.integer "issue_id"
    t.integer "member_id"
    t.string "property"
    t.string "before_value"
    t.string "after_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_issue_activities_on_issue_id"
    t.index ["member_id"], name: "index_issue_activities_on_member_id"
  end

  create_table "issue_attachments", force: :cascade do |t|
    t.bigint "issue_id"
    t.bigint "attachment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_id"], name: "index_issue_attachments_on_attachment_id"
    t.index ["issue_id"], name: "index_issue_attachments_on_issue_id"
  end

  create_table "issue_infos", force: :cascade do |t|
    t.bigint "issue_id", null: false
    t.bigint "template_id", null: false
    t.string "state"
    t.json "values", default: {}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "remark"
    t.index ["issue_id"], name: "index_issue_infos_on_issue_id"
    t.index ["template_id"], name: "index_issue_infos_on_template_id"
  end

  create_table "issue_relationships", force: :cascade do |t|
    t.bigint "target_id"
    t.bigint "source_id"
    t.bigint "member_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_issue_relationships_on_member_id"
    t.index ["source_id"], name: "index_issue_relationships_on_source_id"
    t.index ["target_id"], name: "index_issue_relationships_on_target_id"
  end

  create_table "issue_template_inputs", force: :cascade do |t|
    t.bigint "template_id"
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["template_id"], name: "index_issue_template_inputs_on_template_id"
  end

  create_table "issue_templates", force: :cascade do |t|
    t.string "name"
    t.bigint "project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_issue_templates_on_project_id"
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "milestone_id"
    t.bigint "bak_creator_id"
    t.bigint "bak_assignee_id"
    t.bigint "project_id"
    t.datetime "last_edited_at"
    t.bigint "creator_id"
    t.bigint "assignee_id"
    t.index ["assignee_id"], name: "index_issues_on_assignee_id"
    t.index ["bak_assignee_id"], name: "index_issues_on_bak_assignee_id"
    t.index ["bak_creator_id"], name: "index_issues_on_bak_creator_id"
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

  create_table "login_codes", force: :cascade do |t|
    t.string "code"
    t.integer "retry_times"
    t.boolean "expired"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["resource_type", "resource_id"], name: "index_login_codes_on_resource_type_and_resource_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "role"
    t.bigint "project_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nickname"
    t.boolean "receive_mail", default: false
    t.index ["project_id"], name: "index_members_on_project_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "milestones", force: :cascade do |t|
    t.string "title"
    t.datetime "published_at"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.bigint "creator_id", null: false
    t.index ["creator_id"], name: "index_plans_on_creator_id"
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

  create_table "subscriptions", force: :cascade do |t|
    t.integer "user_id"
    t.integer "issue_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_subscriptions_on_issue_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
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
    t.datetime "test_case_version"
    t.text "content"
    t.index ["issue_id"], name: "index_tasks_on_issue_id"
    t.index ["plan_id"], name: "index_tasks_on_plan_id"
    t.index ["platform_id"], name: "index_tasks_on_platform_id"
    t.index ["test_case_id"], name: "index_tasks_on_test_case_id"
  end

  create_table "test_case_label_links", force: :cascade do |t|
    t.bigint "test_case_label_id", null: false
    t.bigint "test_case_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["test_case_id"], name: "index_test_case_label_links_on_test_case_id"
    t.index ["test_case_label_id"], name: "index_test_case_label_links_on_test_case_label_id"
  end

  create_table "test_case_labels", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_test_case_labels_on_project_id"
  end

  create_table "test_cases", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "folder_id"
    t.boolean "archived", default: false
    t.bigint "project_id"
    t.index ["folder_id"], name: "index_test_cases_on_folder_id"
    t.index ["project_id"], name: "index_test_cases_on_project_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
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
    t.string "remember_token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "version_associations", force: :cascade do |t|
    t.integer "version_id"
    t.string "foreign_key_name", null: false
    t.integer "foreign_key_id"
    t.string "foreign_type"
    t.index ["foreign_key_name", "foreign_key_id", "foreign_type"], name: "index_version_associations_on_foreign_key"
    t.index ["version_id"], name: "index_version_associations_on_version_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.integer "transaction_id"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
    t.index ["transaction_id"], name: "index_versions_on_transaction_id"
  end

  add_foreign_key "comments", "issues"
  add_foreign_key "comments", "members"
  add_foreign_key "folders", "projects"
  add_foreign_key "issue_infos", "issue_templates", column: "template_id"
  add_foreign_key "issue_infos", "issues"
  add_foreign_key "issue_relationships", "issues", column: "source_id"
  add_foreign_key "issue_relationships", "issues", column: "target_id"
  add_foreign_key "issue_relationships", "members"
  add_foreign_key "issue_templates", "projects"
  add_foreign_key "issues", "members", column: "assignee_id"
  add_foreign_key "issues", "members", column: "creator_id"
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
  add_foreign_key "test_case_label_links", "test_case_labels"
  add_foreign_key "test_case_label_links", "test_cases"
  add_foreign_key "test_case_labels", "projects"
  add_foreign_key "test_cases", "projects"
end
