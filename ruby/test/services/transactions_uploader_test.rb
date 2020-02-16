require 'minitest/autorun'

# MiniTest::Unit::TestCase

class TransactionsUploaderTest < ActiveSupport::TestCase
  test 'inserts transactions from csv file into db' do
    csv = file_fixture('dummy.csv')

    uploader = TransactionsUploader.new csv

    assert_difference 'Transaction.count', 3 do
      uploader.upload
    end
  end
end