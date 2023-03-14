using ProAtividade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo
    {
        Task<IEnumerable<Atividade>> PegarTodasAsync();
        Task<IEnumerable<Atividade>> PegarPorIdAsync();
        Task<IEnumerable<Atividade>> PegarPorTituloAsync();
    }
}
