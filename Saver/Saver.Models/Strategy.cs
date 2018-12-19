using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saver.Models
{
	public class Strategy
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public double MonthlyIncome { get; set; }

		[Required]
		public double AnnualAmount { get; set; }

		[Required]
		public double MonthlyAmount { get; set; }

		[Required]
		public double WeeklyAmount { get; set; }

		[Required]
		public DateTime CreatedOn { get; set; }

		public virtual User User { get; set; }
	}
}
