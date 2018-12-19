namespace Saver.Models
{
	using System;
	using System.ComponentModel.DataAnnotations;

	public class Spending
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[Required]
		public double Amount { get; set; }

		public virtual User User { get; set; }

		public virtual WeekTicket Week { get; set; }

		public virtual MonthTicket Month { get; set; }

		[Required]
		public string Subject { get; set; }

		[Required]
		public SpendingSourceTypes SourceUsed { get; set; }
	}
}
