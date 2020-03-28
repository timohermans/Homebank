# frozen_string_literal: true

require 'test_helper'
require 'json'

class TransactionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @transaction = transactions(:one)
  end

  test 'should get index' do
    get transactions_url, as: :json
    assert_response :success
  end

  test 'should show transaction' do
    get transaction_url(@transaction), as: :json
    assert_response :success
  end

  test 'should update transaction' do
    patch transaction_url(@transaction), params: {
      transaction: {
        to_account_number: @transaction.to_account_number,
        date: @transaction.date,
        inflow: @transaction.inflow,
        memo: @transaction.memo,
        payee: @transaction.payee
      }
    }, as: :json
    assert_response 200
  end

  test 'should destroy transaction' do
    assert_difference('Transaction.count', -1) do
      delete transaction_url(@transaction), as: :json
    end

    assert_response 204
  end

  test 'should process a file of new, good transactions' do
    assert_difference('Transaction.count', 3) do
      csv = fixture_file_upload('files/dummy.csv')

      post upload_transactions_url, params: { file: csv }
    end

    assert_response 201
    assert_equal({
      amount_successful: 3,
      amount_duplicate: 0,
      amount_faulty: 0
    }.to_json,
                 response.body)
  end

  test 'should process a file of duplicate, faulty transactions' do
    assert_difference('Transaction.count', 1) do
      csv = fixture_file_upload('files/bad-dummy.csv')

      post upload_transactions_url, params: { file: csv }
    end

    assert_response 201
    assert_equal({
      amount_successful: 1,
      amount_duplicate: 1,
      amount_faulty: 1
    }.to_json, response.body)
  end
end
