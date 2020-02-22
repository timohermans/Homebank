require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  test 'must at least have a name and icon name' do
    assert Category.new(name: 'verplicht').invalid?
    assert Category.new.invalid?
    assert Category.new(name: 'verplicht', icon_name: 'danger').valid?
  end

  test 'The category name is unique' do
    Category.new(name: 'verplicht', icon_name: 'danger').save

    category_fail = Category.new(name: 'Verplicht', icon_name: 'person')
    assert_not category_fail.save
    assert_includes category_fail.errors.messages[:name], 'has already been taken'
  end
end
