class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.date :date
      t.string :payee
      t.string :memo
      t.decimal :outflow
      t.decimal :inflow

      t.timestamps
    end
  end
end
