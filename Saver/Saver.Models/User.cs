using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Saver.Models
{
	public class User : IdentityUser
	{
		public User()
		{
			this.MyIncomes = new HashSet<Income>();
			this.MySpendings = new HashSet<Spending>();
			this.MySavings = new HashSet<Saving>();
			this.StrategiesHistory = new HashSet<Strategy>();
		}

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public double CurrentBalance { get; set; }

		public double TotalSavings { get; set; }
		
		public virtual ICollection<MonthTicket> AccountingHistory { get; set; }

		public virtual ICollection<Income> MyIncomes { get; set; }
		
		public virtual ICollection<Spending> MySpendings { get; set; }

		public virtual ICollection<Saving> MySavings { get; set; }

		public virtual ICollection<Strategy> StrategiesHistory { get; set; }

		public async Task<ClaimsIdentity> GenerateUserIdentityAsync(
			UserManager<User> manager,
			string authenticationType)
		{
			var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

			return userIdentity;
		}
	}
}
