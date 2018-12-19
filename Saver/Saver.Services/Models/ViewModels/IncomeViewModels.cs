using Saver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Saver.Services.Models.ViewModels
{
	public class ShortIncomeViewModel
	{
		public double Amount { get; set; }

		public string Date { get; set; }

		public string From { get; set; }
	}
}