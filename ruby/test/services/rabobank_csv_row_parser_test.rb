# frozen_string_literal: true

require 'minitest/autorun'

class RabobankCsvRowParserTest < ActiveSupport::TestCase
  setup do
    @parser = RabobankCsvRowParser.new
  end

  test 'parses inflow transaction' do
    csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '+2,50', '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', '', '', '', 'Spotify', ' ', '', '', '', '', ''] # rubocop:disable Layout/LineLength

    transaction = @parser.parse csv_row

    assert transaction.valid?
    assert_equal 'NL11RABO0104955555', transaction.to_account_number
    assert_equal 2.5, transaction.inflow
    assert_equal 'J.M.G. Kerkhoffs eo', transaction.payee
    assert_equal DateTime.parse('2019-09-01'), transaction.date
    assert_equal 'Spotify', transaction.memo
  end

  test 'generates an unique identifier based on the row values' do
    csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '+2,50', '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', '', '', '', 'Spotify', ' ', '', '', '', '', '']  # rubocop:disable Layout/LineLength

    transaction = @parser.parse csv_row

    assert_equal '3df7f43bdd25eaf3438e755649b118c0', transaction.code
  end

  test 'parses outflow transaction' do
    csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '-2,50', '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', '', '', '', 'Spotify', ' ', '', '', '', '', '']  # rubocop:disable Layout/LineLength

    transaction = @parser.parse csv_row

    assert transaction.valid?
    assert_equal 2.5, transaction.outflow
  end

  test 'fails parsing a transaction' do
    csv_row = [0, 0, 0, 0, nil]

    assert_raises TypeError do
      @parser.parse csv_row
    end
  end

  test 'incasso ID get appended to the memo' do
    csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '-2,50', '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', 'abc-def-ghi', '', '', 'Sport abo', ' ', '', '', '', '', ''] # rubocop:disable Layout/LineLength

    transaction = @parser.parse csv_row

    assert_equal 'Sport abo (Incasso: abc-def-ghi)', transaction.memo
  end
end
