using System;
using System.ComponentModel.DataAnnotations;

namespace Saver.Services.Models
{
	public class AddIncomeBindingModel
	{
		[Required]
		public int Amount { get; set; }

		public string From { get; set; }

		[Required]
		public DateTime Date { get; set; }
	}
}