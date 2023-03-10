import React, { useEffect, useState } from 'react'
//rfc

const atividadeInicial = {
    id: 0, 
    titulo: '', 
    prioridade: 0,
    descricao: '',
}
export default function AtividadeForm(props) {
    const [atividade, setAtividade] = useState(atividadeAtual()); 
    
    useEffect(() => {
        if(props.atividadeEscolhida !== 0) {
            setAtividade(props.atividadeEscolhida); 
        }
      }, [props.atividadeEscolhida])
    
    const inputTextHandler = (e) => {
        const {name, value} = e.target; 
        setAtividade({...atividade, [name]: value}); 
    }

    const handleSalvar = (e) => {
        e.preventDefault(); 
        props.atualizarAtividade(atividade); 
    }

    const handleCancelar = (e) => {
        e.preventDefault(); 
        props.cancelarAtividade(); 
        setAtividade(atividadeInicial); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if(props.atividadeEscolhida.id !== 0) {
            props.atualizarAtividade(atividade); 
        } 
        else {
            props.addAtividade(atividade); 
        }
        setAtividade(atividadeInicial); 
    }

    function atividadeAtual() {
        if(props.atividadeEscolhida.id !== 0) {
            return props.atividadeEscolhida; 
        } else {
            return atividadeInicial; 
        }
        
    }

    return ( 
        <>    
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label className="form-label">
                    Título
                </label>
                <input 
                    name="titulo"
                    id="titulo" 
                    type="text" 
                    className="form-control"
                    value={atividade.titulo || ''}
                    onChange={inputTextHandler}
                    >                   
                </input>
            </div>
            <div className="col-md-6">
                <label className="form-label">Prioridade</label>
                <select 
                    name="prioridade"
                    id="prioridade" 
                    className="form-select"
                    value={atividade.prioridade}
                    onChange={inputTextHandler}>                   
                    <option defaultValue="NaoDefinida">Selecione...</option>
                    <option value="Baixa">Baixo</option>
                    <option value="Normal">Normal</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>         
            <div className="col-md-12">
                <label className="form-label">
                    Descrição
                </label>
                <textarea 
                    name="descricao"
                    id="descricao" 
                    type="text" 
                    className="form-control"
                    value={atividade.descricao || ''}
                    onChange={inputTextHandler}
                    >
                </textarea>
            <hr/>
            </div>
            <div className="col-12 mt-0">
                {
                    atividade.id === 0 ? 
                    (
                    <button 
                        type="submit" 
                        className="btn btn-outline-secondary me-2">
                        <i className="fas fa-plus me-1"></i>
                        Atividade
                    </button>
                    )
                    :
                    (
                    <>
                        <button 
                            type="submit" 
                            className="btn btn-outline-success me-2" 
                            onClick={handleSalvar}>
                            <i className="fas fa-plus me-1"></i>
                            Salvar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-outline-warning me-2" 
                            onClick={handleCancelar}>
                            <i className="fas fa-plus me-1"></i>
                            Cancelar
                        </button>                   
                    </>
                    )
                }   
            </div>
        </form>
        </>
    )
}
