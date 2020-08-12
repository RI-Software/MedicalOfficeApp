using MedicalOfficeApp.API.Core.RecordCollection;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core
{
    public class DateRecordCollection
    {
        public ConcurrentBag<DateRecord> Records { get; }

        public DateRecordCollection() =>
            Records = new ConcurrentBag<DateRecord>();
    }
}
