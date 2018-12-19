using Microsoft.AspNet.Identity;
using Saver.Models;
using Saver.Services.Models.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Saver.Services.Controllers
{
	[Authorize]
	[RoutePrefix("api/Strategy")]
	public class StrategyController : BaseApiController
	{
		// POST api/Strategy/Add
		[HttpPost]
		[Route("Add")]
		public IHttpActionResult Add(AddStrategyBindingModel model)
		{
			if (!this.ModelState.IsValid)
			{
				this.ModelState.AddModelError("error", "An error occured. Please fill the form again and try again.");
				return this.BadRequest(ModelState);
			}

			Strategy newStrategy = new Strategy
			{
				AnnualAmount = model.AnnualAmount,
				MonthlyAmount = model.MonthlyAmount,
				WeeklyAmount = model.WeeklyAmount,
				MonthlyIncome = model.MonthlyIncome,
				CreatedOn = DateTime.Now
			};

			string loggedUserId = this.User.Identity.GetUserId();
			User loggedUser = this.Data.Users.Find(loggedUserId);
			loggedUser.StrategiesHistory.Add(newStrategy);
			this.Data.SaveChanges();
			
			return this.Ok(new
			{
				success = "true",
				message = "Your strategy has been updated successfuly"
			});
		}
	}
}
