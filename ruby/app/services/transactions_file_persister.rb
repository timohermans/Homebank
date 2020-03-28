# frozen_string_literal: true

require 'csv'

# Parses a csv file into transactions and tries to save them into the database
class TransactionsFilePersister
  def initialize(file, parser)
    @file = file
    @parser = parser
    @transactions_failed = 0
    @transactions_duplicate = 0
  end

  def persist
    extracted_transactions = extract_transactions
    save_transactions extracted_transactions

    {
      amount_successful: extract_transactions.length,
      amount_duplicate: @transactions_duplicate,
      amount_faulty: @transactions_failed
    }
  end

  private

  def extract_transactions
    transactions = []
    CSV.foreach @file.open, headers: true do |row|
      transactions << (@parser.parse row)
    rescue TypeError
      @transactions_failed += 1
    end

    transactions
  end

  def save_transactions(transactions)
    transactions.each do |transaction|
      if transaction.invalid?
        if transaction.errors[:code].include? 'has already been taken'
          @transactions_duplicate += 1
        else
          @transactions_failed += 1
        end
      end
      transaction.save
    end
  end
end
