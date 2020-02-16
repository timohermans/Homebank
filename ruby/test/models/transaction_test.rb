require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  test 'must have date, payee, memo, inflow' do
    transaction = Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', inflow: 0)

    assert transaction.valid?
  end

  test 'must have either inflow or outflow' do
    transaction = Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld')

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
    assert Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', inflow: 'tien').invalid?
    assert Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', outflow: 'tien').invalid?

    assert Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', inflow: 10.50).valid?
    assert Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', outflow: 10.50).valid?
  end

  test 'date must be valid' do
    assert Transaction.new(date: 'date', payee: 'Finn', memo: 'verjaardagsgeld', outflow: 10.50).invalid?
    assert Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', inflow: 10.50).valid?
  end

  test 'assign a category to a transaction' do
    transaction = Transaction.new(date: Date.new(2019, 10, 5), payee: 'Finn', memo: 'verjaardagsgeld', inflow: 10.50)
    transaction.category = Category.new(name: 'Category', icon_name: 'Danger')

    assert transaction.valid?
  end
end
