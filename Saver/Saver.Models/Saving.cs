using System;
using System.ComponentModel.DataAnnotations;

namespace Saver.Models
{
	public class Saving
	{ 
		[Key]
		public int Id { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[Required]
		public double Amount { get; set; }
		
		public string UserId { get; set; }

		[Required]
		public SavingSourceTypes Source { get; set; }

		public virtual User User { get; set; }
	}
}
