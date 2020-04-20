class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, index: { unique: true }
      t.string :icon_name

      t.timestamps
    end
  end
end
