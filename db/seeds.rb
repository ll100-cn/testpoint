# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.first_or_create! do |u|
  u.email = "testpoint@gmail.com"
  u.name = "testpoint"
  u.password = u.password_confirmation = "testpoint"
  u.superadmin = true
  u.skip_confirmation!
end

if Project.none?
  project = Project.create!(name: "Default Project")
  Folder.create!(name: "学生", project: project)
  Platform.create!(name: "Default Platform", project: project)
  Member.create!(role: "owner", project: project, user: user)
end
