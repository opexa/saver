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
	[RoutePrefix("api/Incomes")]
	public class IncomesController : BaseApiController
	{
		// POST api/Incomes/Add
		[HttpPost]
		[Route("Add")]
		public IHttpActionResult AddIncome(AddIncomeBindingModel model)
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

			Income newIncome = new Income
			{
				Amount = model.Amount,
				Date = model.Date,
				From = model.From,
				//FromWeek = week,
				User = user
			};

			month.Incomes.Add(newIncome);
			month.Balance = month.Balance + model.Amount;

			this.Data.SaveChanges();

			return this.Ok(new
			{
				success = true,
				message = "Income was added successfully."
			});
		}

		// GET api/Incomes/Recent
		[HttpGet]
		[Route("Recent")]
		public IHttpActionResult GetRecentIncomes()
		{
			User user = this.GetUser();

			IEnumerable<Income> incomes = user.MyIncomes.OrderByDescending(s => s.Date).Take(10);
			var data = incomes.Any() ? Mapper.Map<IEnumerable<ShortIncomeViewModel>>(incomes) : new List<ShortIncomeViewModel>();

			return this.Ok(data);
		}
	}
}