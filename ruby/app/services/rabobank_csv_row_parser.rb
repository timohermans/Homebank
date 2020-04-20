require 'digest/md5'

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
    to_account_number = row[@to_account_number_index]
    date = DateTime.parse(row[@date_index])
    payee = row[@payee_index]
    memo = parse_memo_text_from(row)
    inflow = parse_inflow_from(row)
    outflow = parse_outflow_from(row)
    code = generate_code(to_account_number, date, payee, memo, inflow, outflow)
    
    Transaction.new(
      to_account_number: to_account_number, 
      code: code,
      date: date, 
      payee: payee, 
      memo: memo, 
      inflow: inflow, 
      outflow: outflow
    )
  end

  private

  def parse_memo_text_from(row)
    incasso_id = row[@automatic_incasso_id_index]
    incasso_text = incasso_id.strip.blank? ? '' : " (Incasso: #{incasso_id})"

    "#{row[@memo_index]}#{incasso_text}"
  end

  def parse_inflow_from(row)
    amount = parse_amount_from row

    @is_positive_amount ? amount : nil
  end

  def parse_outflow_from(row)
    amount = parse_amount_from row

    !@is_positive_amount ? amount : nil
  end

  def parse_amount_from(row)
    amount_string = row[@amount_index]
    amount_string = amount_string.gsub(',', '.')
    @is_positive_amount = amount_string[0] == @positive_amount_character
    parseable_amount_string = amount_string[1..-1]

    parseable_amount_string.to_d
  end

  def generate_code(*transaction_params)
    variables = transaction_params.join("|")
    Digest::MD5.hexdigest(variables)
  end
end
