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

        public string SortColum { get; private set; }

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

        private ApiResult(List<T> data, int count, int pageIndex, int pageSize, string sortColum, string sortOrder)
        {
            Data = data;
            TotalCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
            SortColum = sortColum;
            SortOrder = sortOrder;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }

        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source, 
            int pageIndex, 
            int pageSize, 
            string sortColumn = null, 
            string sortOrder = null)
        {
            int count = await source.CountAsync();

            if(!string.IsNullOrEmpty(sortColumn) && IsValidProperty(sortColumn))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(string.Format("{0} {1}", sortColumn, sortOrder)); //have to implement orderColumns[]
            }

            source = source.Skip(pageIndex * pageSize).Take(pageSize);

            List<T> data = await source.ToListAsync();

            return new ApiResult<T>(data, count, pageIndex, pageSize, sortColumn, sortOrder);
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
