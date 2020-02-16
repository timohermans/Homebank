require 'csv'

class TransactionsUploader
  def initialize(file)
    @file = file
    @date_index = 4
    @amount_index = 6
    @payee_index = 9
    @memo_index = 19
    @automatic_incasso_id_index = 16
    @positive_amount_character = '+'
  end

  def upload
    extracted_transactions = extract_transactions
    save_transactions extracted_transactions
  end

  private

  def extract_transactions
    transactions = []
    CSV.foreach @file.open, headers: true do |row|
      transactions << (create_transaction_from row)
    end

    transactions
  end

  def create_transaction_from(row)
    date = DateTime.parse(row[@date_index])
    payee = row[@payee_index]

    incasso_id = row[@automatic_incasso_id_index]
    incasso_text = incasso_id.strip.blank? ? '' : " (Incasso: #{incasso_id})";
    memo = "#{row[@memo_index]}#{incasso_text}"

    amount_string = row[@amount_index]
    is_positive_amount = amount_string[0] == @positive_amount_character
    amount = amount_string.to_d

    Transaction.new(
        date: date,
        payee: payee,
        memo: memo,
        inflow: is_positive_amount ? amount : nil,
        outflow: !is_positive_amount ? amount : nil,
    )
  end

  def save_transactions(transactions)
    transactions.each do |transaction|
      transaction.save
    end
  end
end