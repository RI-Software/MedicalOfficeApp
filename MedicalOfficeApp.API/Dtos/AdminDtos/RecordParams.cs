using System.Collections.Generic;

namespace MedicalOfficeApp.API.Models
{
    public class RecordParams
    {
        private int pageSize = 10;

        private int maxPageSize = 50;

        private int minPageSize = 1;

        public int PageIndex { get; set; } = 0;

        public int PageSize {
            get =>
                pageSize;

            set
            {
                if (value > maxPageSize)
                {
                    pageSize = maxPageSize;
                    return;
                }

                if (value < minPageSize)
                {
                    pageSize = minPageSize;
                    return;
                }

                pageSize = value;
            }
        }

        public List<string> SortColumns { get; set; } = null;

        public string? SortOrder { get; set; } = null;
    }
}
