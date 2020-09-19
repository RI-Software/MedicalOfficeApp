using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace MedicalOfficeApp.API.Data
{
    public class ApiResult<T>
    {
        public List<T> Data { get; private set; }

        public int TotalCount { get; private set; }

        public int PageIndex { get; private set; }
        
        public int PageSize { get; private set; }

        public int TotalPages { get; private set; }

        public List<string> SortColums { get; private set; }

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

        private ApiResult(List<T> data, int count, int pageIndex, int pageSize, List<string> sortColums, string sortOrder)
        {
            Data = data;
            TotalCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
            SortColums = sortColums;
            SortOrder = sortOrder;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }

        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source, 
            int pageIndex, 
            int pageSize,
            List<string> sortColumns = null, 
            string sortOrder = null)
        {
            int count = await source.CountAsync();

            string orderByString = PrepareValidOrderByString(sortColumns);

            if(!string.IsNullOrEmpty(orderByString))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(string.Format("{0} {1}", orderByString, sortOrder));
            }

            source = source.Skip(pageIndex * pageSize).Take(pageSize);

            List<T> data = await source.ToListAsync();

            return new ApiResult<T>(data, count, pageIndex, pageSize, sortColumns, sortOrder);
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
