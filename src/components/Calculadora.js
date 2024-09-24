import React, { useState, useEffect } from 'react';
import './Calculadora.css';
import CalculadoraNormal from './CalculadoraNormal';
import CalculadoraCientifica from './CalculadoraCientifica';
import { evaluate, sqrt } from 'mathjs'; // Adicione sqrt à importação

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [primeiroNumero, setPrimeiroNumero] = useState(null);
  const [operador, setOperador] = useState(null);
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [modoRadianos, setModoRadianos] = useState(true);
  const [modoCientifico, setModoCientifico] = useState(false);
  const [expressaoAtual, setExpressaoAtual] = useState('');

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
      setExpressaoAtual(expressaoAtual + digito);
      setEsperandoSegundoNumero(false);
    } else {
      setDisplay(display === '0' ? digito : display + digito);
      setExpressaoAtual(expressaoAtual + digito);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpressaoAtual(expressaoAtual + '.');
    }
  };

  const limpar = () => {
    setDisplay('0');
    setPrimeiroNumero(null);
    setOperador(null);
    setEsperandoSegundoNumero(false);
    setExpressaoAtual('');
  };

  const apagarUltimoDigito = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const executarOperacao = (op) => {
    if (primeiroNumero === null && display !== '(') {
      setPrimeiroNumero(parseFloat(display));
      setOperador(op);
      setEsperandoSegundoNumero(true);
      setExpressaoAtual(expressaoAtual + ' ' + op + ' ');
    } else if (operador) {
      const resultado = calcular(primeiroNumero, parseFloat(display), operador);
      setDisplay(String(resultado));
      setPrimeiroNumero(resultado);
      setOperador(op);
      setEsperandoSegundoNumero(true);
      setExpressaoAtual(expressaoAtual + ' ' + op + ' ');
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
    if (expressaoAtual) {
      try {
        const expressaoParaCalcular = expressaoAtual.replace(/√/g, 'sqrt');
        const resultado = evaluate(expressaoParaCalcular);
        const novoCalculo = `${expressaoAtual} = ${resultado}`;
        setHistorico([...historico, novoCalculo]);
        setDisplay(String(resultado));
        setPrimeiroNumero(null);
        setOperador(null);
        setEsperandoSegundoNumero(true);
        setExpressaoAtual('');
      } catch (error) {
        setDisplay('Erro');
        setExpressaoAtual('');
      }
    }
  };

  const alternarModoCientifico = () => {
    setModoCientifico(!modoCientifico);
  };

  const alternarUnidade = () => {
    setModoRadianos(!modoRadianos);
  };

  const executarOperacaoCientifica = (operacao) => {
    if (display === '0' || display === '') return;

    let resultado;
    let expressao;

    switch (operacao) {
      case 'sin':
        resultado = Math.sin(modoRadianos ? parseFloat(display) : parseFloat(display) * Math.PI / 180);
        expressao = `sin(${display}${modoRadianos ? '' : '°'})`;
        break;
      case 'cos':
        resultado = Math.cos(modoRadianos ? parseFloat(display) : parseFloat(display) * Math.PI / 180);
        expressao = `cos(${display}${modoRadianos ? '' : '°'})`;
        break;
      case 'tan':
        resultado = Math.tan(modoRadianos ? parseFloat(display) : parseFloat(display) * Math.PI / 180);
        expressao = `tan(${display}${modoRadianos ? '' : '°'})`;
        break;
      case 'log':
        resultado = Math.log10(parseFloat(display));
        expressao = `log(${display})`;
        break;
      case 'ln':
        resultado = Math.log(parseFloat(display));
        expressao = `ln(${display})`;
        break;
      case 'sqrt':
        resultado = sqrt(parseFloat(display));
        expressao = `√(${display})`;
        break;
      case 'x^2':
        resultado = Math.pow(parseFloat(display), 2);
        expressao = `(${display})²`;
        break;
      case 'x^3':
        resultado = Math.pow(parseFloat(display), 3);
        expressao = `(${display})³`;
        break;
      case '1/x':
        resultado = 1 / parseFloat(display);
        expressao = `1/(${display})`;
        break;
      case 'pi':
        resultado = Math.PI;
        expressao = 'π';
        break;
      default:
        return;
    }

    setDisplay(String(resultado));
    setExpressaoAtual(expressaoAtual + expressao);
    setHistorico([...historico, `${expressao} = ${resultado}`]);
  };

  const adicionarParenteses = (parentese) => {
    setDisplay(display === '0' ? parentese : display + parentese);
    setExpressaoAtual(expressaoAtual + parentese);
  };

  // Adicione esta nova função
  const limparHistorico = () => {
    setHistorico([]);
  };

  return (
    <div className={`calculadora ${modoCientifico ? 'cientifica' : ''}`}>
      <div className="historico">
        <h3>Histórico</h3>
        <ul>
          {historico.map((calculo, index) => (
            <li key={index}>{calculo}</li>
          ))}
        </ul>
        {/* Adicione este botão para limpar o histórico */}
        <button onClick={limparHistorico}>Limpar Histórico</button>
      </div>
      <div className="display">
        <div className="expressao-atual">{expressaoAtual}</div>
        <div className="resultado">{display}</div>
      </div>
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
          adicionarParenteses={adicionarParenteses}
          limparHistorico={limparHistorico}
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
          adicionarParenteses={adicionarParenteses}
          limparHistorico={limparHistorico}
        />
      )}
    </div>
  );
}

export default Calculadora;
