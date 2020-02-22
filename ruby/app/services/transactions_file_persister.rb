require 'csv'

class TransactionsFilePersister
  def initialize(file, parser)
    @file = file
    @parser = parser
  end

  def persist
    extracted_transactions = extract_transactions
    save_transactions extracted_transactions

    extracted_transactions
  end

  private

  def extract_transactions
    transactions = []
    CSV.foreach @file.open, headers: true do |row|
      transactions << (@parser.parse row)
    end

    transactions
  end

  def save_transactions(transactions)
    transactions.each do |transaction|
      transaction.save
    end
  end
end
