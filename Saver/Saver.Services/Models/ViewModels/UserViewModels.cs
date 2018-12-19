using AutoMapper;
using Saver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Saver.Services.Models.ViewModels
{
	public class UserAccountInfoViewModel
	{
		public double CurrentBalance { get; set; }

		public double TotalSavings { get; set; }

		public IEnumerable<ShortIncomeViewModel> Incomes { get; set; }

		public IEnumerable<ShortSpendingViewModel> Spendings { get; set; }

		public IEnumerable<ShortSavingViewModel> Savings { get; set; }

		public static Expression<Func<User, UserAccountInfoViewModel>> Create
		{
			get
			{
				return u => new UserAccountInfoViewModel
				{
					CurrentBalance = u.CurrentBalance,
					TotalSavings = u.TotalSavings,
					Incomes = Mapper.Map<IEnumerable<ShortIncomeViewModel>>(u.MyIncomes.Take(6)),
					Spendings = Mapper.Map<IEnumerable<ShortSpendingViewModel>>(u.MySpendings.Take(6)),
					Savings = u.MySavings.Take(6).AsQueryable().Select(ShortSavingViewModel.Create)
				};
			}
		}
	}

	public class UserPersonalInfoViewModel
	{
		public string Email { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public static Expression<Func<User, UserPersonalInfoViewModel>> Create
		{
			get
			{
				return u => new UserPersonalInfoViewModel
				{
					Email = u.Email,
					FirstName = u.FirstName,
					LastName = u.LastName
				};
			}
		}
	}
}