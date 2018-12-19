using AutoMapper;
using Microsoft.AspNet.Identity;
using Saver.Models;
using Saver.Services.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Saver.Services.Controllers
{
	[Authorize]
	[RoutePrefix("api/Progress")]
	public class ProgressController : BaseApiController
	{
		// GET api/Progress/Month
		[HttpGet]
		[Route("Month")]
		public IHttpActionResult GetMonthProgress()
		{
			User user = this.GetUser();

			MonthTicket monthTicket = user.AccountingHistory.Any() ? user.AccountingHistory.Last() : null;
			if (monthTicket == null)
			{
				return this.Ok(new
				{
					success = false,
					message = "You haven't started accounting yet."
				});
			}

			if (monthTicket.End < DateTime.Now)
			{
				return this.Ok(new
				{
					success = true,
					startNewMonth = true,
					monthProgress = Mapper.Map<MonthFinishedViewModel>(monthTicket)
				});
			}
			
			MonthProgressViewModel data = Mapper.Map<MonthProgressViewModel>(monthTicket);

			return this.Ok(new
			{
				success = true,
				monthProgress = data
			});
		}

		// GET api/Progress/Start
		[HttpGet]
		[Route("Start")]
		public IHttpActionResult StartProgress()
		{
			User user = this.GetUser();

			if (user.AccountingHistory.Any())
			{
				return this.Ok(new
				{
					success = false,
					redirectUrl = "/"
				});
			}

			if (!user.StrategiesHistory.Any())
			{
				return this.Ok(new
				{
					success = false,
					redirectUrl = "/"
				});
			}

			Strategy strategy = user.StrategiesHistory.Last();

			MonthTicket newMonth = this.GenerateNewMonth(strategy);

			user.AccountingHistory.Add(newMonth);
			this.Data.SaveChanges();
			return this.Ok(new
			{
				success = true
			});
		}

		// POST api/Progress/Finish
		[HttpPost]
		[Route("Finish")]
		public IHttpActionResult FinishMonthProgress()
		{
			User user = this.GetUser();

			bool hasNewMonthStarted = user.AccountingHistory.Any(m => m.Start >= DateTime.Now && DateTime.Now <= m.End);
			if (hasNewMonthStarted)
			{
				return this.Ok(new { success = false, message = "You tried to start accounting the next month" });
			}

			Strategy strategy = user.StrategiesHistory.Last();
			MonthTicket nextMonth = this.GenerateNewMonth(strategy);
			user.AccountingHistory.Add(nextMonth);
			this.Data.SaveChanges();
			return this.Ok(new
			{
				success = true,
				message = "Accounting for the next month started successfully."
			});  
		}

		private MonthTicket GenerateNewMonth(Strategy strategy)
		{
			DateTime monthStart = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
			DateTime monthEnd = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1, 23, 59, 59, 997).AddDays(-1);

			MonthTicket newMonth = new MonthTicket
			{
				Balance = strategy.MonthlyIncome - strategy.MonthlyAmount,
				Start = monthStart,
				End = monthEnd,
				Strategy = strategy
			};

			double weekLimit = strategy.MonthlyIncome / 4 - strategy.WeeklyAmount;

			for (int i = 0; i < 4; i++)
			{
				var startCopy = i == 0 ? monthStart : new DateTime(monthStart.Year, monthStart.Month, monthStart.Day).AddDays(i * 7);
				var endCopy = i < 3 ? new DateTime(startCopy.Year, startCopy.Month, startCopy.Day, 23, 59, 59, 997).AddDays(6) : monthEnd;

				WeekTicket week = new WeekTicket
				{
					Limit = weekLimit,
					Start = startCopy,
					End = endCopy,
					FromMonth = newMonth
				};

				newMonth.Weeks.Add(week);
			}

			Income firstIncome = new Income
			{
				Amount = strategy.MonthlyIncome,
				Date = DateTime.Now,
				From = "Salary",
				User = strategy.User
			};

			newMonth.Incomes.Add(firstIncome);

			return newMonth;
		}
	}
}
