using Saver.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Saver.Services.Models.ViewModels
{
	public class CurrentStrategyViewModel
	{
		public double MonthlyIncome { get; set; }
		
		public double AnnualAmount { get; set; }
		
		public double MonthlyAmount { get; set; }
		
		public double WeeklyAmount { get; set; }

		public static Expression<Func<Strategy, CurrentStrategyViewModel>> Create
		{
			get
			{
				return s => new CurrentStrategyViewModel
				{
					MonthlyIncome = s.MonthlyIncome,
					AnnualAmount = s.AnnualAmount,
					MonthlyAmount = s.MonthlyAmount,
					WeeklyAmount = s.WeeklyAmount
				};
			}
		}
	}
}