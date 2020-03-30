# frozen_string_literal: true

class TransactionBlueprint < Blueprinter::Base
  identifier :id

  fields :to_account_number,
         :memo,
         :payee,
         :date,
         :inflow,
         :outflow

  association :category, blueprint: CategoryBlueprint
end
