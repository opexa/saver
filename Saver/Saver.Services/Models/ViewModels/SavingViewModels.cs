using Saver.Models;
using System;
using System.Linq.Expressions;

namespace Saver.Services.Models.ViewModels
{
	public class ShortSavingViewModel
	{
		public double Amount { get; set; }

		public DateTime Date { get; set; }

		public string From { get; set; }

		public static Expression<Func<Saving, ShortSavingViewModel>> Create
		{
			get
			{
				return s => new ShortSavingViewModel
				{
					Amount = s.Amount,
					Date = s.Date,
					From = ((SavingSourceTypes)s.Source).ToString()
				};
			}
		}
	}
}