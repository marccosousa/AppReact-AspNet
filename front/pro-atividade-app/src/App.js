import {useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm'
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade'

function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  const pegarTodasAtividades = async () => {
      const response = await api.get('atividade'); 
      return response.data; 
  }

  useEffect(() => {
      const getAtividades = async () => {
          const todasAtividades = await pegarTodasAtividades(); 
          if (todasAtividades) setAtividades(todasAtividades); 
      }
      getAtividades(); 
  }, [])
  
  const addAtividade = async (ativ) => {
      const response = await api.post('atividade', ativ); 
      setAtividades([...atividades, response.data]);        
  }

  const deleteAtividade = async (id) => {
        if (await api.delete(`atividade/${id}`)) {
          const atividadesFiltradas = atividades.filter((ativ) => ativ.id !== id);
          setAtividades([...atividadesFiltradas]); 
        }                     
  }

  function pegarAtividade(id) {
        const atividade = atividades.filter((ativ) => ativ.id === id)
        setAtividade(atividade[0]); 
  }

  const atualizarAtividade = async (ativ) => {
      const response = await api.put(`atividade/${ativ.id}`, ativ);
      const { id } = response.data; 
      setAtividades(atividades.map((item) => item.id === id ? response.data : item)); 
      setAtividade({id: 0}); 
  }
  

  function cancelarAtividade() {
      setAtividade({id: 0}); 
  }
  
  return (
    <>
      <AtividadeForm
          addAtividade = {addAtividade}
          atividadeEscolhida = {atividade}
          atividades = {atividades}
          atualizarAtividade = {atualizarAtividade}
          cancelarAtividade = {cancelarAtividade}
      />
      <AtividadeLista
          atividades = {atividades}
          deleteAtividade = {deleteAtividade}
          pegarAtividade = {pegarAtividade}
      />
    </>
  );
}
export default App;
