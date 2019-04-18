using Homebank.Core.Converters;
using Homebank.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace Homebank.Infrastructure.Converters
{
    public class RabobankCsvConverter : BaseCsvConverter, IRabobankCsvConverter
    {
        private readonly int DateIndex = 4;
        private readonly int AmountIndex = 6;
        private readonly int PayeeIndex = 9;
        private readonly int MemoIndex = 19;
        private readonly char PositiveAmount = '+';

        public RabobankCsvConverter()
        {
        }

        public override IEnumerable<Transaction> Convert(byte[] fileBytes)
        {
            using (var reader = new StreamReader(new MemoryStream(fileBytes)))
            {
                var isTransactionFromBank = true;

                reader.ReadLine();
                string row;

                while ((row = reader.ReadLine()) != null)
                {
                    string[] stringColumns = StripQuotes(row).Split(Seperator, StringSplitOptions.None);
                    string amountString = stringColumns[AmountIndex];
                    decimal amount = System.Convert.ToDecimal(amountString.Substring(1, amountString.Length - 1), new CultureInfo("nl-NL"));
                    bool isPositiveAmount = amountString[0] == PositiveAmount;

                    yield return new Transaction(
                        ConvertItemToDate(stringColumns[DateIndex]),
                        stringColumns[PayeeIndex],
                        null,
                        stringColumns[MemoIndex],
                        !isPositiveAmount ? amount : decimal.Zero,
                        isPositiveAmount ? amount : decimal.Zero,
                        isTransactionFromBank
                        );
                }
            }
        }

        private DateTime ConvertItemToDate(string item)
        {
            return DateTime.ParseExact(item, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        private string StripQuotes(string item)
        {
            var leftQuoteIndex = 1;
            var rightQuoteOffset = 2;

            return item.Substring(leftQuoteIndex, item.Length - rightQuoteOffset);
        }
    }
}