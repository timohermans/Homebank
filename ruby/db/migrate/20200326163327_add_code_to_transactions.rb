class AddCodeToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :code, :string
    add_index :transactions, :code, name: 'index_unique_transaction', unique: true
  end
end
