using AutoMapper;
using Saver.Models;
using Saver.Services.Models;
using Saver.Services.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Saver.Services.Controllers
{
	[Authorize]
	[RoutePrefix("api/Spendings")]
	public class SpendingsController : BaseApiController
	{
		// POST api/Spendings/Add
		[HttpPost]
		[Route("Add")]
		public IHttpActionResult AddSpending(AddSpendingBindingModel model)
		{
			if (!this.ModelState.IsValid)
			{
				return this.BadRequest();
			}
			
			User user = this.GetUser();
			MonthTicket month = user.AccountingHistory.FirstOrDefault(m => m.Start <= model.Date && model.Date <= m.End);

			if (month == null)
			{
				return this.Ok(new
				{
					success = false,
					message = "You can't account for this month."
				});
			}

			WeekTicket week = month.Weeks.FirstOrDefault(w => w.Start <= model.Date && model.Date <= w.End);

			
			Spending newSpending = new Spending
			{
				Amount = model.Amount,
				Date = model.Date,
				SourceUsed = SpendingSourceTypes.Income,
				Subject = model.Subject,
				//FromWeek = week,
				User = user
			};

			week.Spendings.Add(newSpending);
			month.Balance = month.Balance - model.Amount;
			
			this.Data.SaveChanges();
			
			return this.Ok(new
			{
				success = true,
				message = "New spending was added successfully."
			});
		}

		// GET api/Spendings/Recent
		[HttpGet]
		[Route("Recent")]
		public IHttpActionResult GetRecentSpendings()
		{
			User user = this.GetUser();

			IEnumerable<Spending> spendings = user.MySpendings.OrderByDescending(s => s.Date).Take(10);
			var data = spendings.Any() ? Mapper.Map<IEnumerable<ShortSpendingViewModel>>(spendings) : new List<ShortSpendingViewModel>();

			return this.Ok(data);
		}
	}
}
