using AutoMapper;
using Saver.Services.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace Saver.Services
{
	public class WebApiApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			Mapper.Initialize(c => c.AddProfile<MapperConfig>());
			GlobalConfiguration.Configure(WebApiConfig.Register);
		}
	}
}
