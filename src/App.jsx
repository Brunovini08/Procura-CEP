import './App.css'
import {FiSearch} from 'react-icons/fi'
import {useState} from "react";
import api from "./services/api.js";
function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({});
    async function handleSearch() {
        // 14871070

        if (input === '') {
            alert('Preencha com algum cep')
        }
        try {
          const res = await api.get(`${input}/json`);
          setCep(res.data);
          setInput('');
        } catch  {
            console.log("Ops ocorreu algum erro de digitação");
            setInput('')
        }
    }
  return (
    <div className="container">
        <h1 className="title">Buscador CEP</h1>
        <div className="containerInput">
            <input
            type="text"
            placeholder="Digite seu cep"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button className="buttonSearch" onClick={handleSearch}>
                <FiSearch size={25} color="#fff"></FiSearch>
            </button>
        </div>

        {Object.keys(cep). length > 0 && (
            <main className="main">
                <h2>CEP: {cep.cep}</h2>

                <span>{cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>
            </main>
        )}


    </div>
  )
}
export default App
