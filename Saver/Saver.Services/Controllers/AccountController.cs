using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Saver.Data;
using Saver.Models;
using Saver.Services.Models.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Saver.Services.Controllers
{
	[RoutePrefix("api/Account")]
	public class AccountController : ApiController
	{
		private AuthRepository _repo = null;

		public AccountController()
		{
			_repo = new AuthRepository();
		}

		// POST api/Account/Register
		[AllowAnonymous]
		[Route("Register")]
		public async Task<IHttpActionResult> Register(RegisterBindingModel model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			IdentityResult result = await _repo.RegisterUser(model);

			IHttpActionResult errorResult = GetErrorResult(result);

			if (errorResult != null)
			{
				return errorResult;
			}

			return Ok(new
			{
				success = "true"
			});
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing)
			{
				_repo.Dispose();
			}

			base.Dispose(disposing);
		}

		private IHttpActionResult GetErrorResult(IdentityResult result)
		{
			if (result == null)
			{
				return InternalServerError();
			}

			if (!result.Succeeded)
			{
				if (result.Errors != null)
				{
					foreach (string error in result.Errors)
					{
						ModelState.AddModelError("error", error);
					}
				}

				if (ModelState.IsValid)
				{
					// No ModelState errors are available to send, so just return an empty BadRequest.
					return BadRequest();
				}

				return BadRequest(ModelState);
			}

			return null;
		}
	}

	public class AuthRepository : IDisposable
	{
		private SaverDbContext context;

		private UserManager<User> userManager;

		public AuthRepository()
		{
			context = new SaverDbContext();
			userManager = new UserManager<User>(new UserStore<User>(context));
		}

		public async Task<IdentityResult> RegisterUser(RegisterBindingModel userModel)
		{
			User user = new User
			{
				UserName = userModel.UserName,
				Email = userModel.Email,
				CurrentBalance = 0,
				TotalSavings = 0
			};

			var result = await userManager.CreateAsync(user, userModel.Password);

			return result;
		}

		public async Task<User> FindUser(string userName, string password)
		{
			User user = await userManager.FindAsync(userName, password);

			return user;
		}

		public void Dispose()
		{
			context.Dispose();
			userManager.Dispose();
		}
	}
}
