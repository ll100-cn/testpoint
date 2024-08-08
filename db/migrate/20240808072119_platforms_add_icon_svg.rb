class PlatformsAddIconSvg < ActiveRecord::Migration[7.0]
  def change
    change_table :platforms do |t|
      t.string :icon_svg
    end
  end
end
