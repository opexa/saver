using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Saver.Services.Models.BindingModels
{
	public class EditProfileBindingModel
	{
		[Required]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }
	}
}