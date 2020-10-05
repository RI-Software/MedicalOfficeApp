using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using MedicalOfficeApp.API.Dtos.AdminDtos;

namespace MedicalOfficeApp.API.Data
{
    public class ApiResult<T>
    {
        public List<T> Data { get; private set; }

        public int TotalCount { get; private set; }

        public int PageIndex { get; private set; }
        
        public int PageSize { get; private set; }

        public int TotalPages { get; private set; }

        public List<WhereStatement> WhereStatements { get; private set; }

        public List<string> SortColumns { get; private set; }

        public string SortOrder { get; private set; }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (PageIndex + 1) < PageSize;
            }
        }

        private ApiResult(
            List<T> data,
            int count,
            int pageIndex,
            int pageSize,
            List<WhereStatement> whereStatements,
            List<string> sortColumns,
            string sortOrder)
        {
            Data = data;
            TotalCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
            WhereStatements = whereStatements;
            SortColumns = sortColumns;
            SortOrder = sortOrder;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }

        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source, 
            int pageIndex, 
            int pageSize,
            List<WhereStatement> whereStatements = null,
            List<string> sortColumns = null, 
            string sortOrder = null)
        {
            #region Where logic

            if (whereStatements != null)
            {
                whereStatements = RemoveInvalidStatements(whereStatements);

                foreach (var statement in whereStatements)
                {
                    source = source.Where(statement.Column + " == @0", statement.Value);
                }
            }
            #endregion

            #region Ordering logic

            string orderByString = PrepareValidOrderByString(sortColumns);

            if(!string.IsNullOrEmpty(orderByString))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(string.Format("{0} {1}", orderByString, sortOrder));
            }
            #endregion

            int count = await source.CountAsync();

            source = source.Skip(pageIndex * pageSize).Take(pageSize);

            List<T> data = await source.ToListAsync();

            return new ApiResult<T>(data, count, pageIndex, pageSize, whereStatements, sortColumns, sortOrder);
        }

        private static List<WhereStatement> RemoveInvalidStatements (List<WhereStatement> statements)
        {
            statements.RemoveAll(s => !IsValidProperty(s.Column));

            return statements;
        }

        private static string PrepareValidOrderByString(List<string> columns)
        {
            columns.RemoveAll((col) => !IsValidProperty(col));

            if(columns.Count > 0)
                return string.Join(", ", columns);

            return string.Empty;
        }

        private static bool IsValidProperty(string propertyName, bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Instance);

            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    $"Property {propertyName} does not exists");
            return prop != null;
        }
    }
}
