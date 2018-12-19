using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saver.Models
{
	public class MonthTicket
	{
		public MonthTicket ()
		{
			this.Weeks = new HashSet<WeekTicket>();
			this.Incomes = new HashSet<Income>();
			this.Spendings = new HashSet<Spending>();
		}

		[Key]
		public int Id { get; set; }

		[Required]
		public double Balance { get; set; }

		[Required]
		public DateTime Start { get; set; }

		[Required]
		public DateTime End { get; set; }

		[Required]
		public virtual User User { get; set; }

		[Required]
		public virtual Strategy Strategy { get; set; }
		
		public virtual ICollection<WeekTicket> Weeks { get; set; }

		public virtual ICollection<Income> Incomes { get; set; }

		public virtual ICollection<Spending> Spendings { get; set; }
	}
}
