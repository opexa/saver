using System;
using System.ComponentModel.DataAnnotations;

namespace Saver.Models
{
	public class Income
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[Required]
		public double Amount { get; set; }

		public virtual User User { get; set; }

		public string From { get; set; }
	}
}
