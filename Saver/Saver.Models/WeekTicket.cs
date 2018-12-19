using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saver.Models
{
	public class WeekTicket
	{
		public WeekTicket ()
		{
			this.Spendings = new HashSet<Spending>();
		}

		[Key]
		public int Id { get; set; }

		public virtual MonthTicket FromMonth { get; set; }

		[Required]
		public DateTime Start { get; set; }

		[Required]
		public DateTime End { get; set; }

		public double Limit { get; set; }

		public virtual ICollection<Spending> Spendings { get; set; }
	}
}
