require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  test 'must have date, payee, memo, inflow' do
    transaction = transactions(:one)

    assert transaction.valid?
  end

  test 'must have either inflow or outflow' do
    transaction = transactions(:one)
    transaction.inflow = nil

    transaction.outflow = 10

    assert transaction.valid?

    transaction.inflow = 10

    assert transaction.invalid?

    transaction.outflow = nil

    assert transaction.valid?

    transaction.inflow = nil

    assert transaction.invalid?
  end

  test 'in- and outflow are numbers' do
    transaction = transactions(:one)
    transaction.inflow = 'tien'
    assert transaction.invalid?

    transaction.inflow = nil
    transaction.outflow = 'tien'
    assert transaction.invalid?

    transaction.outflow = 10.50
    assert transaction.valid?

    transaction.outflow = nil
    transaction.inflow = 10.50
    assert transaction.valid?
  end

  test 'date must be valid' do
    transaction = transactions(:one)
    transaction.date = 'date'

    assert transaction.invalid?

    transaction.date = Date.new(2019, 10, 5)

    assert transaction.valid?
  end

  test 'assign a category to a transaction' do
    transaction = transactions(:one)
    transaction.category = Category.new(name: 'Category', icon_name: 'Danger')

    assert transaction.valid?
  end
end
