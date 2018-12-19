using Microsoft.AspNet.Identity;
using Saver.Data;
using Saver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Saver.Services.Controllers
{
	public class BaseApiController : ApiController
	{
		protected SaverDbContext Data { get; set; }

		public BaseApiController()
		{
			this.Data = new SaverDbContext();
		}

		protected User GetUser ()
		{
			string userId = this.User.Identity.GetUserId();
			User user = this.Data.Users.Find(userId);

			return user;
		}

		protected IHttpActionResult RedirectToUrl (string url)
		{
			Uri uri = new System.Uri(url);
			return Redirect(uri);
		}
	}
}
