class Category < ApplicationRecord
    belongs_to :user
    validates :name, length: { maximum: 50 }, presence: true
end
