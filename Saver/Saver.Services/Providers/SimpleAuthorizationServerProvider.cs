using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.OAuth;
using Saver.Models;
using Saver.Services.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Saver.Services.Providers
{
	public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
	{
		public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
		{
			context.Validated();
		}
		public override Task TokenEndpoint(OAuthTokenEndpointContext context)
		{
			context.AdditionalResponseParameters.Add("username", context.Identity.Claims.First(cl => cl.Type == "username").Value);
			context.AdditionalResponseParameters.Add("hasStrategy", context.Identity.Claims.First(cl => cl.Type == "hasStrategy").Value);

			return Task.FromResult<object>(null);
		}

		public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
		{

			context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
			User user = null;
			var hasStrategy = "False";

			using (AuthRepository _repo = new AuthRepository())
			{
				user = await _repo.FindUser(context.UserName, context.Password);
				hasStrategy = user.StrategiesHistory.Any().ToString().ToLower();

				if (user == null)
				{
					context.SetError("invalid_grant", "The user name or password isk incorrect.");
					return;
				}
			}

			var identity = new ClaimsIdentity(context.Options.AuthenticationType);
			identity.AddClaim(new Claim("username", context.UserName));
			identity.AddClaim(new Claim("role", "user"));
			identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
			identity.AddClaim(new Claim("hasStrategy", hasStrategy));

			context.Validated(identity);
		}
	}
}