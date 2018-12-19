namespace Saver.Data
{
	using Microsoft.AspNet.Identity.EntityFramework;
	using Migrations;
	using Models;
	using System.Collections.Generic;
	using System.Data.Entity;
	using System.Data.Entity.Infrastructure;
	using System.Data.Entity.Validation;
	using System.Linq;

	public class SaverDbContext : IdentityDbContext<User>
	{
		public SaverDbContext() : base("SaverDbContext")
		{
			Database.SetInitializer(new MigrateDatabaseToLatestVersion<SaverDbContext, Configuration>());
		}

		public static SaverDbContext Create()
		{
			return new SaverDbContext();
		}

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
				.HasMany<Income>(u => u.MyIncomes);

			modelBuilder.Entity<User>()
				.HasMany<Spending>(u => u.MySpendings);

			modelBuilder.Entity<User>()
				.HasMany<Saving>(u => u.MySavings);

			modelBuilder.Entity<User>()
				.HasMany<Strategy>(u => u.StrategiesHistory);

			base.OnModelCreating(modelBuilder);
		}

		private static bool IsReferenceAndNotLoaded(DbEntityEntry entry, string memberName)
		{
			var reference = entry.Member(memberName) as DbReferenceEntry;
			return reference != null && !reference.IsLoaded;
		}

		protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items)
		{
			var result = base.ValidateEntity(entityEntry, items);
			if (result.IsValid || entityEntry.State != EntityState.Modified)
			{
				return result;
			}
			return new DbEntityValidationResult(entityEntry,
					result.ValidationErrors
								.Where(e => !IsReferenceAndNotLoaded(entityEntry, e.PropertyName)));
		}

		public virtual IDbSet<Income> Incomes { get; set; }

		public virtual IDbSet<Spending> Spendings { get; set; }

		public virtual IDbSet<Saving> Savings { get; set; }

		public virtual IDbSet<Strategy> Strategies { get; set; }
	}
}