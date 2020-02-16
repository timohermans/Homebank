class Transaction < ApplicationRecord
  belongs_to :category, optional: true, autosave: true

  validates :memo, presence: true
  validates :payee, presence: true
  validates :outflow, numericality: true, allow_nil: true
  validates :inflow, numericality: true, allow_nil: true
  validates :date, date: true # gem date_validator
  validate :either_in_or_outflow

  private

  def either_in_or_outflow
    if inflow.nil? && outflow.nil?
      errors.add(:inflow, 'Either supply inflow or outflow')
      errors.add(:outflow, 'Either supply inflow or outflow')
    end

    if !inflow.nil? && !outflow.nil?
      errors.add(:inflow, 'Cannot supply both inflow and outflow')
      errors.add(:outflow, 'Cannot supply both inflow and outflow')
    end
  end
end
