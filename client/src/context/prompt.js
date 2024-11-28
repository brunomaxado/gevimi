import { unstable_useBlocker as useBlocker } from 'react-router-dom';

function Prompt({ when, message }) {
  useBlocker(() => {
    if (when) {
      // Exibe o confirm antes de navegar
      return !window.confirm(message);
    }
    return false;
  }, [when]);

  return null; // Não precisa renderizar nada visualmente
}

export default Prompt;
