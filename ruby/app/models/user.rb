class User < ApplicationRecord
    has_many :categories
    validates :email, presence: true
    validates :name, presence: true
end
