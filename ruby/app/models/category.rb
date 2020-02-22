class Category < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :icon_name, presence: true
end
