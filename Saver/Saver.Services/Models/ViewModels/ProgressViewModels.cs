using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Saver.Services.Models.ViewModels
{
	public class MonthProgressViewModel
	{
		public double Balance { get; set; }

		public string Month { get; set; }

		public double MonthLimit { get; set; }

		public double DailySpendingsTotal { get; set; }

		public double MonthSpendingsTotal { get; set; }

		public ShortWeekViewModel CurrentWeek { get; set; }

		public IEnumerable<ShortSpendingViewModel> RecentSpendings { get; set; }
	}

	public class MonthFinishedViewModel
	{
		public double LeftAmount { get; set; }

		public string Month { get; set; }

		public double MonthSpendingsTotal { get; set; }

		public double MonthLimit { get; set; }

		public IEnumerable<ShortSpendingViewModel> RecentSpendings { get; set; }

		public IEnumerable<ShortIncomeViewModel> RecentIncomes { get; set; }
	}
}