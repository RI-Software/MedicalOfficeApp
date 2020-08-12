using MedicalOfficeApp.API.Core.RecordCollection;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace MedicalOfficeApp.API.Core
{
    public class DateRecordCollection
    {
        //public ConcurrentBag<DateRecord> Records { get; }
        public List<DateRecord> Records { get; }

        public DateRecordCollection() =>
            Records = new List<DateRecord>();
    }
}
