import React, { useState, useEffect } from 'react';
import './Calculadora.css';
import CalculadoraNormal from './CalculadoraNormal';
import CalculadoraCientifica from './CalculadoraCientifica';
import { evaluate } from 'mathjs'; // Adicione esta importação no topo do arquivo

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
        const resultado = evaluate(expressaoAtual);
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
    const valorAtual = parseFloat(display);
    let resultado;

    switch (operacao) {
      case 'sin':
        resultado = Math.sin(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        setExpressaoAtual(expressaoAtual + `sin(${valorAtual}${modoRadianos ? '' : '°'})`);
        break;
      case 'cos':
        resultado = Math.cos(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        setExpressaoAtual(expressaoAtual + `cos(${valorAtual}${modoRadianos ? '' : '°'})`);
        break;
      case 'tan':
        resultado = Math.tan(modoRadianos ? valorAtual : valorAtual * Math.PI / 180);
        setExpressaoAtual(expressaoAtual + `tan(${valorAtual}${modoRadianos ? '' : '°'})`);
        break;
      case 'log':
        resultado = Math.log10(valorAtual);
        setExpressaoAtual(expressaoAtual + `log(${valorAtual})`);
        break;
      case 'ln':
        resultado = Math.log(valorAtual);
        setExpressaoAtual(expressaoAtual + `ln(${valorAtual})`);
        break;
      case 'sqrt':
        resultado = Math.sqrt(valorAtual);
        setExpressaoAtual(expressaoAtual + `√(${valorAtual})`);
        break;
      case 'x^2':
        resultado = Math.pow(valorAtual, 2);
        setExpressaoAtual(expressaoAtual + `(${valorAtual})²`);
        break;
      case 'x^3':
        resultado = Math.pow(valorAtual, 3);
        setExpressaoAtual(expressaoAtual + `(${valorAtual})³`);
        break;
      case '1/x':
        resultado = 1 / valorAtual;
        setExpressaoAtual(expressaoAtual + `1/(${valorAtual})`);
        break;
      case 'pi':
        resultado = Math.PI;
        setExpressaoAtual(expressaoAtual + 'π');
        break;
      default:
        resultado = valorAtual;
    }

    setDisplay(String(resultado));
    setEsperandoSegundoNumero(true);
  };

  const adicionarParenteses = (parentese) => {
    setDisplay(display === '0' ? parentese : display + parentese);
    setExpressaoAtual(expressaoAtual + parentese);
  };

  return (
    <div className={`calculadora ${modoCientifico ? 'cientifica' : ''}`}>
      <div className="historico">
        {historico.length === 0 ? (
          <div className="historico-placeholder">
            Histórico de Cálculos
            <br />
            <span className="historico-subtext">Seus cálculos aparecerão aqui</span>
          </div>
        ) : (
          historico.map((calculo, index) => (
            <div key={index} className="calculo-historico">{calculo}</div>
          ))
        )}
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
          adicionarParenteses={adicionarParenteses} // Atualize aqui
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
          adicionarParenteses={adicionarParenteses} // Atualize aqui
        />
      )}
    </div>
  );
}

export default Calculadora;
