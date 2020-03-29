# frozen_string_literal: true

class TransactionBlueprint < Blueprinter::Base
  identifier :id

  fields :memo,
         :inflow,
         :outflow

  association :category, blueprint: CategoryBlueprint
end
