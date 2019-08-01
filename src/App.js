import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from 'react';

function App() {
  // ex-state
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  const [newTech, setNewTech] = useState('');

  // executa uma única vez, pq não tem nada de monitoramento, DidMount
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }

    // ex componentDidMount, isso aqui é usado mais quando tem eventlistner
    // return () => {};
  }, []);

  // Executa toda vez que a variável tech sofrer alteração, DidUpdate
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // O UseCallback vai poupar processamento pq a cada letra digitada a
  // function é remontada, e com o callback isso não acontece
  // Usar mais quando for manipular stado, props do componentes ou variáveis globais
  const handleAdd = useCallback(() => {
    // setTech([...tech, 'Node.js']);
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  function handleChange(e) {
    const { value } = e.target;
    setNewTech(value);
  }

  // Suado mais para calculo. Isso vai ser executado quando o tech for alterado
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <Fragment>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input type="text" onChange={handleChange} value={newTech} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </Fragment>
  );
}

export default App;
