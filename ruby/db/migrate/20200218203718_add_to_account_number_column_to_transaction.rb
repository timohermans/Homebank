class AddToAccountNumberColumnToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :to_account_number, :string
  end
end
