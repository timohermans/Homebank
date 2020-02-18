class RabobankCsvRowParser
  def initialize
    @to_account_number_index = 0
    @date_index = 4
    @amount_index = 6
    @payee_index = 9
    @memo_index = 19
    @automatic_incasso_id_index = 16
    @positive_amount_character = '+'
  end

  def parse(row)
    date = DateTime.parse(row[@date_index])
    payee = row[@payee_index]

    incasso_id = row[@automatic_incasso_id_index]
    incasso_text = incasso_id.strip.blank? ? '' : " (Incasso: #{incasso_id})";
    memo = "#{row[@memo_index]}#{incasso_text}"

    amount_string = row[@amount_index]
    amount_string = amount_string.gsub(',', '.')
    is_positive_amount = amount_string[0] == @positive_amount_character
    amount = amount_string.to_d

    Transaction.new(
        to_account_number: row[@to_account_number_index],
        date: date,
        payee: payee,
        memo: memo,
        inflow: is_positive_amount ? amount : nil,
        outflow: !is_positive_amount ? amount : nil,
        )
  end
end