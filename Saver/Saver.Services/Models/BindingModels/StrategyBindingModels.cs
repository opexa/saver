using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Saver.Services.Models.BindingModels
{
	public class AddStrategyBindingModel
	{
		[Required]
		public double MonthlyIncome { get; set; }
		
		[Required]
		public double AnnualAmount { get; set; } 
		
		[Required]
		public double MonthlyAmount { get; set; }
		
		[Required]
		public double WeeklyAmount { get; set; }
	}
}