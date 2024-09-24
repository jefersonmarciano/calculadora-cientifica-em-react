import React from 'react';

function CalculadoraNormal({
  inputDigito,
  inputDecimal,
  adicionarParenteses,
  executarOperacao,
  calcularResultado,
  limpar,
  apagarUltimoDigito,
  alternarModoCientifico,
  limparHistorico
}) {
  return (
    <div className="teclado">
      <button onClick={alternarModoCientifico} className="modo-cientifico">
        Científica
      </button>
      <button onClick={() => adicionarParenteses('(')} className="funcao">(</button>
      <button onClick={() => adicionarParenteses(')')} className="funcao">)</button>
      <button onClick={() => executarOperacao('%')} className="funcao">%</button>
      <button onClick={() => executarOperacao('/')} className="funcao">/</button>
      <button onClick={() => inputDigito('7')}>7</button>
      <button onClick={() => inputDigito('8')}>8</button>
      <button onClick={() => inputDigito('9')}>9</button>
      <button onClick={() => executarOperacao('*')} className="funcao">*</button>
      <button onClick={() => inputDigito('4')}>4</button>
      <button onClick={() => inputDigito('5')}>5</button>
      <button onClick={() => inputDigito('6')}>6</button>
      <button onClick={() => executarOperacao('-')} className="funcao">-</button>
      <button onClick={() => inputDigito('1')}>1</button>
      <button onClick={() => inputDigito('2')}>2</button>
      <button onClick={() => inputDigito('3')}>3</button>
      <button onClick={() => executarOperacao('+')} className="funcao">+</button>
      <button onClick={() => inputDigito('0')}>0</button>
      <button onClick={inputDecimal}>.</button>
      <button onClick={calcularResultado} className="funcao">=</button>
      <button onClick={limpar} className="limpar">C</button>
      <button onClick={apagarUltimoDigito} className="apagar">←</button>
      <button onClick={limparHistorico}>Limpar Histórico</button>
    </div>
  );
}

export default CalculadoraNormal;
