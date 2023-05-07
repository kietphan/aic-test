class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :name
      t.date :date_of_birth
      t.string :class_name
      t.references :grade, null: false, foreign_key: false

      t.timestamps
    end
  end
end
