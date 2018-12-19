using Saver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Saver.Services.Models.ViewModels
{
	public class ShortSpendingViewModel
	{
		public double Amount { get; set; }

		public string Subject { get; set; }

		//public string SourceUsed { get; set; }

		public string Date { get; set; }
	}
}