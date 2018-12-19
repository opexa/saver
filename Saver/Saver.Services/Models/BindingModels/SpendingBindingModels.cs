using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Saver.Services.Models
{
	public class AddSpendingBindingModel
	{
		[Required]
		[Range(0.01, double.MaxValue, ErrorMessage = "Please be serious")]
		public double Amount { get; set; }

		public string Subject { get; set; }

		[Required]
		public DateTime Date { get; set; }

		//[Required]
		//public int SourceType { get; set; }
	}
}