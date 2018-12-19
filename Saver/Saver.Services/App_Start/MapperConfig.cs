using AutoMapper;
using Saver.Models;
using Saver.Services.Models.BindingModels;
using Saver.Services.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Saver.Services.App_Start
{
	public class MapperConfig : Profile
	{
		public MapperConfig()
		{
			// USER MODELS
			CreateMap<User, UserPersonalInfoViewModel>();
			CreateMap<EditProfileBindingModel, User>();

			// PROGRESS MODELS
			CreateMonthProgressMap();
			CreateMonthFinishedMap();

			// WEEK MODELS
			CreateMap<WeekTicket, ShortWeekViewModel>()
				.ForMember(model => model.SpendingsTotal, config => { config.MapFrom(m => m.Spendings.Sum(s => s.Amount)); });

			// STRATEGY MODELS
			CreateMap<Strategy, CurrentStrategyViewModel>();

			// SPENDING MODELS
			CreateMap<Spending, ShortSpendingViewModel>()
				.ForMember(model => model.Date, config => { config.MapFrom(s => s.Date.ToString("MM/dd/yyyy")); });

			// INCOME MODELS
			CreateMap<Income, ShortIncomeViewModel>()
				.ForMember(model => model.Date, config => { config.MapFrom(s => s.Date.ToString("MM/dd/yyyy")); });
		}

		public void CreateMonthProgressMap ()
		{
			CreateMap<MonthTicket, MonthProgressViewModel>()
				.ForMember(model => model.Month, config => { config.MapFrom(m => m.Start.ToString("MMMM", CultureInfo.InvariantCulture)); })
				.ForMember(model => model.MonthLimit, config => 
				{
					config.MapFrom(m => m.Incomes.Sum(i => i.Amount) - m.Strategy.MonthlyAmount);
				})
				.ForMember(model => model.CurrentWeek, config =>
				{
					config.MapFrom(m => Mapper.Map<ShortWeekViewModel>(
							m.Weeks.FirstOrDefault(w => (w.Start <= DateTime.Now && w.End >= DateTime.Now))
						));
				})
				.ForMember(model => model.MonthSpendingsTotal, config =>
				{
					config.MapFrom(m => m.Weeks.Sum(w => w.Spendings.Sum(s => s.Amount)));
				})
				.ForMember(model => model.DailySpendingsTotal, config =>
				{
					config.MapFrom(
						m => m.Weeks.FirstOrDefault(w => (w.Start <= DateTime.Now && w.End >= DateTime.Now))
									.Spendings
									.Where(s => s.Date.Date == DateTime.Now.Date)
									.Sum(s => s.Amount)
					);
				})
				.ForMember(model => model.RecentSpendings, config =>
				{
					config.MapFrom(m => Mapper.Map<IEnumerable<ShortSpendingViewModel>>(m.Spendings.OrderByDescending(s => s.Date).Take(5)));
				});
		}

		public void CreateMonthFinishedMap ()
		{
			CreateMap<MonthTicket, MonthFinishedViewModel>()
				.ForMember(model => model.Month, config => { config.MapFrom(m => m.Start.ToString("MMMM", CultureInfo.InvariantCulture)); })
				.ForMember(model => model.MonthSpendingsTotal, config =>
				{
					config.MapFrom(m => m.Weeks.Sum(w => w.Spendings.Sum(s => s.Amount)));
				})
				.ForMember(model => model.LeftAmount, config => { config.MapFrom(m => m.Balance); })
				.ForMember(model => model.MonthLimit, config => { config.MapFrom(m => m.Incomes.Sum(i => i.Amount) - m.Strategy.MonthlyAmount); })
				.ForMember(model => model.RecentSpendings, config => 
				{
					config.MapFrom(m => Mapper.Map<IEnumerable<ShortSpendingViewModel>>(m.Spendings.OrderByDescending(s => s.Date).Take(7)));
				})
				.ForMember(model => model.RecentIncomes, config =>
				{
					config.MapFrom(m => Mapper.Map<IEnumerable<ShortIncomeViewModel>>(m.Incomes.OrderByDescending(s => s.Date).Take(7)));
				});
		}
	}
}