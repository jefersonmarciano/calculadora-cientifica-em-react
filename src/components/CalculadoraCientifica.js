import React from 'react';
import './CalculadoraCientifica.css';

const CalculadoraCientifica = ({ 
  inputDigito,
  inputDecimal,
  adicionarParenteses,
  executarOperacao,
  calcularResultado,
  limpar,
  apagarUltimoDigito,
  alternarModoCientifico,
  alternarUnidade,
  executarOperacaoCientifica,
  modoRadianos
}) => {
  return (
    <div className="teclado-cientifico">
      <div className="linha">
        <button onClick={alternarModoCientifico} className="modo-cientifico">Normal</button>
        <button onClick={alternarUnidade} className="alternar-unidade">{modoRadianos ? 'Rad' : 'Deg'}</button>
        <button onClick={limpar} className="limpar">C</button>
        <button onClick={apagarUltimoDigito} className="apagar">←</button>
      </div>
      <div className="linha">
        <button onClick={() => executarOperacaoCientifica('sin')} className="funcao">sin</button>
        <button onClick={() => executarOperacaoCientifica('cos')} className="funcao">cos</button>
        <button onClick={() => executarOperacaoCientifica('tan')} className="funcao">tan</button>
        <button onClick={() => executarOperacao('%')} className="funcao">%</button>
        <button onClick={() => adicionarParenteses('(')} className="funcao">(</button>
      </div>
      <div className="linha">
        <button onClick={() => executarOperacaoCientifica('asin')} className="funcao">sin⁻¹</button>
        <button onClick={() => executarOperacaoCientifica('acos')} className="funcao">cos⁻¹</button>
        <button onClick={() => executarOperacaoCientifica('atan')} className="funcao">tan⁻¹</button>
        <button onClick={() => executarOperacaoCientifica('x^2')} className="funcao">x²</button>
        <button onClick={() => adicionarParenteses(')')} className="funcao">)</button>
      </div>
      <div className="linha">
        <button onClick={() => executarOperacaoCientifica('log')} className="funcao">log</button>
        <button onClick={() => executarOperacaoCientifica('ln')} className="funcao">ln</button>
        <button onClick={() => executarOperacaoCientifica('sqrt')} className="funcao">√</button>
        <button onClick={() => executarOperacaoCientifica('x^3')} className="funcao">x³</button>
        <button onClick={() => executarOperacao('/')} className="funcao">/</button>
      </div>
      <div className="linha">
        <button onClick={() => inputDigito('7')}>7</button>
        <button onClick={() => inputDigito('8')}>8</button>
        <button onClick={() => inputDigito('9')}>9</button>
        <button onClick={() => executarOperacaoCientifica('10^x')} className="funcao">10ˣ</button>
        <button onClick={() => executarOperacao('*')} className="funcao">*</button>
      </div>
      <div className="linha">
        <button onClick={() => inputDigito('4')}>4</button>
        <button onClick={() => inputDigito('5')}>5</button>
        <button onClick={() => inputDigito('6')}>6</button>
        <button onClick={() => executarOperacaoCientifica('e^x')} className="funcao">eˣ</button>
        <button onClick={() => executarOperacao('-')} className="funcao">-</button>
      </div>
      <div className="linha">
        <button onClick={() => inputDigito('1')}>1</button>
        <button onClick={() => inputDigito('2')}>2</button>
        <button onClick={() => inputDigito('3')}>3</button>
        <button onClick={() => executarOperacaoCientifica('1/x')} className="funcao">1/x</button>
        <button onClick={() => executarOperacao('+')} className="funcao">+</button>
      </div>
      <div className="linha">
        <button onClick={() => inputDigito('0')} className="zero">0</button>
        <button onClick={inputDecimal}>.</button>
        <button onClick={() => executarOperacaoCientifica('pi')} className="funcao">π</button>
        <button onClick={calcularResultado} className="igual">=</button>
      </div>
    </div>
  );
};

export default CalculadoraCientifica;
