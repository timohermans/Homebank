# frozen_string_literal: true

class TransactionsController < ApplicationController
  before_action :set_transaction, only: %i[show update destroy]

  # GET /transactions
  def index
    @transactions = Transaction.all

    render json: @transactions
  end

  # GET /transactions/1
  def show
    render json: @transaction
  end

  # PATCH/PUT /transactions/1
  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1
  def destroy
    @transaction.destroy
  end

  # POST /transactions/upload
  def upload
    persister = TransactionsFilePersister.new params[:file], RabobankCsvRowParser.new

    render json: persister.persist, status: :created
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def transaction_params
    params.require(:transaction).permit(:to_account_number, :date, :payee, :memo, :outflow, :inflow)
  end
end
