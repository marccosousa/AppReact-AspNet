import {useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm'
import AtividadeLista from './components/AtividadeLista';

function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  const [index, setIndex] = useState(0); 

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : setIndex(Math.max.apply(Math, atividades.map(item => item.id)) + 1); 
  }, [atividades])

  function addAtividade(ativ) {
        setAtividades([...atividades, {...ativ, id: index }]);        
  }

  function deleteAtividade(id) {
        const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id); 
        setAtividades([...atividadesFiltradas]); 
  }

  function pegarAtividade(id) {
        const atividade = atividades.filter(ativ => ativ.id === id)
        setAtividade(atividade[0]); 
  }

  function atualizarAtividade(ativ) {
      setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item)); 
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
