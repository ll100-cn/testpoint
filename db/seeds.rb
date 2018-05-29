# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.where(email: "testpoint@gmail.com").first_or_create do |u|
  u.name = "testpoint"
  u.password = u.password_confirmation = "testpoint"
end

Component.where(name: "Default Component").first_or_create if Component.none?
Platform.where(name: "Default Platform").first_or_create if Platform.none?
