using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Saver.Services.Models.BindingModels
{
	public class AddSavingBindingModel
	{
		[Required]
		public bool Confirm { get; set; }

		public double Amount { get; set; }

		[Required]
		public int SourceType { get; set; }
	}
}