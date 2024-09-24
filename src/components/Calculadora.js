import React, { useState, useEffect } from 'react';
import './Calculadora.css';
import CalculadoraNormal from './CalculadoraNormal';
import CalculadoraCientifica from './CalculadoraCientifica';

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [primeiroNumero, setPrimeiroNumero] = useState(null);
  const [operador, setOperador] = useState(null);
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [modoRadianos, setModoRadianos] = useState(true);
  const [modoCientifico, setModoCientifico] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, operador, primeiroNumero, esperandoSegundoNumero]);

  const handleKeyDown = (event) => {
    if (event.key >= '0' && event.key <= '9') {
      inputDigito(event.key);
    } else if (event.key === '.') {
      inputDecimal();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      executarOperacao(event.key);
    } else if (event.key === 'Enter') {
      calcularResultado();
    } else if (event.key === 'Backspace') {
      apagarUltimoDigito();
    } else if (event.key === 'Escape') {
      limpar();
    }
  };

  const inputDigito = (digito) => {
    if (esperandoSegundoNumero) {
      setDisplay(digito);
      setEsperandoSegundoNumero(false);
    } else {
      setDisplay(display === '0' ? digito : display + digito);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const limpar = () => {
    setDisplay('0');
    setPrimeiroNumero(null);
    setOperador(null);
    setEsperandoSegundoNumero(false);
  };

  const apagarUltimoDigito = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const executarOperacao = (op) => {
    if (primeiroNumero === null) {
      setPrimeiroNumero(parseFloat(display));
      setOperador(op);
      setEsperandoSegundoNumero(true);
    } else if (operador) {
      const resultado = calcular(primeiroNumero, parseFloat(display), operador);
      setDisplay(String(resultado));
      setPrimeiroNumero(resultado);
      setOperador(op);
      setEsperandoSegundoNumero(true);
    }
  };

  const calcular = (num1, num2, op) => {
    switch (op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: return num2;
    }
  };

  const calcularResultado = () => {
    if (operador && primeiroNumero !== null) {
      const segundoNumero = parseFloat(display);
      const resultado = calcular(primeiroNumero, segundoNumero, operador);
      const novoCalculo = `${primeiroNumero} ${operador} ${segundoNumero} = ${resultado}`;
      setHistorico([...historico, novoCalculo]);
      setDisplay(String(resultado));
      setPrimeiroNumero(null);
      setOperador(null);
      setEsperandoSegundoNumero(true);
    }
  };

  const alternarModoCientifico = () => {
    setModoCientifico(!modoCientifico);
  };

  const alternarUnidade = () => {
    setModoRadianos(!modoRadianos);
  };

  const executarOperacaoCientifica = (operacao) => {
    const valorAtual = parseFloat(display);
    let resultado;

    switch (operacao) {
      case 'sin':
        resultado = Math.sin(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        break;
      case 'cos':
        resultado = Math.cos(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        break;
      case 'tan':
        resultado = Math.tan(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        break;
      case 'log':
        resultado = Math.log10(valorAtual);
        break;
      case 'ln':
        resultado = Math.log(valorAtual);
        break;
      case 'sqrt':
        resultado = Math.sqrt(valorAtual);
        break;
      case 'x^2':
        resultado = Math.pow(valorAtual, 2);
        break;
      case 'x^3':
        resultado = Math.pow(valorAtual, 3);
        break;
      case '1/x':
        resultado = 1 / valorAtual;
        break;
      case 'pi':
        resultado = Math.PI;
        break;
      default:
        resultado = valorAtual;
    }

    const novoCalculo = `${operacao}(${valorAtual}) = ${resultado}`;
    setHistorico([...historico, novoCalculo]);
    setDisplay(String(resultado));
    setEsperandoSegundoNumero(true);
  };

  return (
    <div className={`calculadora ${modoCientifico ? 'cientifica' : ''}`}>
      <div className="historico">
        {historico.map((calculo, index) => (
          <div key={index} className="calculo-historico">{calculo}</div>
        ))}
      </div>
      <div className="display">{display}</div>
      {modoCientifico ? (
        <CalculadoraCientifica
          inputDigito={inputDigito}
          inputDecimal={inputDecimal}
          executarOperacao={executarOperacao}
          calcularResultado={calcularResultado}
          limpar={limpar}
          apagarUltimoDigito={apagarUltimoDigito}
          alternarModoCientifico={alternarModoCientifico}
          alternarUnidade={alternarUnidade}
          executarOperacaoCientifica={executarOperacaoCientifica}
          modoRadianos={modoRadianos}
        />
      ) : (
        <CalculadoraNormal
          inputDigito={inputDigito}
          inputDecimal={inputDecimal}
          executarOperacao={executarOperacao}
          calcularResultado={calcularResultado}
          limpar={limpar}
          apagarUltimoDigito={apagarUltimoDigito}
          alternarModoCientifico={alternarModoCientifico}
        />
      )}
    </div>
  );
}

export default Calculadora;
