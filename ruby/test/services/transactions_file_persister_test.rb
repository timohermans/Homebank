require 'minitest/autorun'

# MiniTest::Unit::TestCase

class TransactionsFilePersisterTest < ActiveSupport::TestCase
  test 'inserts transactions from csv file into db' do
    csv = file_fixture('dummy.csv')

    uploader = TransactionsFilePersister.new csv, RabobankCsvRowParser.new

    assert_difference 'Transaction.count', 3 do
      uploader.persist
    end
  end
end
