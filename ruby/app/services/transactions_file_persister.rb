# frozen_string_literal: true

require 'csv'

# Parses a csv file into transactions and tries to save them into the database
class TransactionsFilePersister
  def initialize(file, parser)
    @file = file
    @parser = parser
    @transactions_succesful = 0
    @transactions_failed = 0
    @transactions_duplicate = 0
  end

  def persist
    extracted_transactions = extract_transactions
    save extracted_transactions

    {
      amount_successful: @transactions_succesful,
      amount_duplicate: @transactions_duplicate,
      amount_faulty: @transactions_failed
    }
  end

  private

  def extract_transactions
    transactions = []
    CSV.foreach @file.open, headers: true do |row|
      transactions << @parser.parse(row)
    rescue TypeError
      @transactions_failed += 1
    end

    transactions
  end

  def save(transactions)
    transactions.each do |transaction|
      if transaction.valid?
        @transactions_succesful += 1
        transaction.save
      else
        determine_invalid_transaction_type transaction
      end
    end
  end

  def determine_invalid_transaction_type(transaction)
    if transaction.errors[:code].include? 'has already been taken'
      @transactions_duplicate += 1
    else
      @transactions_failed += 1
    end
  end
end
