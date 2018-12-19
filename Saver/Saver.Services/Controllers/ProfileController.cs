using AutoMapper;
using Microsoft.AspNet.Identity;
using Saver.Models;
using Saver.Services.Models.BindingModels;
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
	[RoutePrefix("api/Profile")]
	public class ProfileController : BaseApiController
	{
		// GET api/Profile/Info
		[HttpGet]
		[Route("Info")]
		public IHttpActionResult GetInfo ()
		{
			string userId = this.User.Identity.GetUserId();

			if (userId == null)
				return this.BadRequest();

			User user = this.Data.Users.Find(userId);
			Strategy currentStrategy = null;

			if (user.StrategiesHistory.Any())
				currentStrategy = user.StrategiesHistory.Last();

			return this.Ok(new
			{
				personalInfo = Mapper.Map<User, UserPersonalInfoViewModel>(user),
				currentStrategy = currentStrategy != null ? Mapper.Map<Strategy, CurrentStrategyViewModel>(currentStrategy) : null
			});
		}

		// GET api/Profile/PersonalInfo
		[HttpGet]
		[Route("PersonalInfo")]
		public IHttpActionResult GetPersonalInfo ()
		{
			string userId = this.User.Identity.GetUserId();

			if (userId == null)
				return this.Unauthorized();

			User user = this.Data.Users.Find(userId);

			return this.Ok(Mapper.Map<User, UserPersonalInfoViewModel>(user));
		}

		// PUT api/Profile/PersonalInfo
		[HttpPut]
		[Route("PersonalInfo")]
		public IHttpActionResult EditPersonalInfo(EditProfileBindingModel model)
		{
			if (!this.ModelState.IsValid)
			{
				return this.BadRequest("Check your form and try again.");
			}

			string userId = this.User.Identity.GetUserId();
			if (userId == null)
				return this.Unauthorized();

			User user = this.Data.Users.Find(userId);
			user = Mapper.Map<EditProfileBindingModel, User>(model, user);
			this.Data.SaveChanges();
			return this.Ok(new
			{
				success = "true",
				message = "Profile updated successfully"
			});
		}
	}
}
