using Homebank.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Homebank.Core
{
    public interface IUnitOfWork
    {
        ICategoryRepository Categories { get; }
        ICategoryGroupRepository CategoryGroups { get; }
        Task Complete();
    }
}
