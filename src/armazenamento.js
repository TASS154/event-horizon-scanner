export function lerLocalStorage(chave, padrao) {
  const bruto = localStorage.getItem(chave);
  if (!bruto) {
    return padrao;
  }

  /*
    Revisão da IA
    Antes: return JSON.parse(bruto); sem proteção.
    Agora: tenta converter e, se o texto estiver quebrado, devolve o valor padrão.
    Motivo: um localStorage antigo ou editado à mão derrubava a tela inteira no carregamento.
  */
  try {
    return JSON.parse(bruto);
  } catch (erro) {
    return padrao;
  }
}

export function salvarLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function criarId() {
  return Date.now();
}

export function calcularConfiancaOcr() {
  /*
    Revisão da IA
    Antes: Math.round(Math.random() * 100) — o OCR “acertava” 4% ou 99% no mesmo clique.
    Agora: sorteio só entre 85 e 100, depois arredonda.
    Motivo: a simulação precisa parecer um leitor de página, não um número qualquer de 0 a 100.
  */
  const valor = Math.random() * 15 + 85;
  return Math.round(valor);
}

export function calcularTempoLeitura(paginas) {
  /*
    Revisão da IA
    Antes: return paginas * 2; tempo fixo demais para uma simulação.
    Agora: cada página varia um pouco e Math.ceil evita segundo quebrado na tela.
    Motivo: o tempo cresce com o tamanho do documento, mas ainda muda a cada captura.
  */
  const segundos = paginas * (Math.random() * 1.5 + 0.8);
  return Math.ceil(segundos);
}

export function calcularValidadeDias() {
  return Math.round(Math.random() * 8) + 7;
}

export function tirarDaLista(lista, id) {
  const ficaram = [];
  let achado = null;

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      achado = lista[i];
    } else {
      ficaram.push(lista[i]);
    }
  }

  return {
    ficaram: ficaram,
    achado: achado
  };
}
