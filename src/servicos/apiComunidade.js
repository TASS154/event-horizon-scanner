const tiposDocumento = [
  { titulo: "Contrato de prestação de serviços", categoria: "Contratos" },
  { titulo: "Contrato de locação residencial", categoria: "Contratos" },
  { titulo: "Termo de confidencialidade", categoria: "Contratos" },
  { titulo: "Artigo sobre visão computacional", categoria: "Artigos" },
  { titulo: "Parecer técnico de infraestrutura", categoria: "Artigos" },
  { titulo: "Edital de bolsa de pesquisa", categoria: "Artigos" },
  { titulo: "Apostila de Cálculo I", categoria: "Apostilas" },
  { titulo: "Apostila de Álgebra Linear", categoria: "Apostilas" },
  { titulo: "Manual do usuário", categoria: "Apostilas" },
  { titulo: "Relatório de estágio supervisionado", categoria: "Outros" },
  { titulo: "Ata de reunião de condomínio", categoria: "Outros" }
];

function gerarDocumento(faker, tipo) {
  return {
    id: faker.string.uuid(),
    titulo: tipo.titulo,
    categoria: tipo.categoria,
    paginas: faker.number.int({ min: 2, max: 40 }),
    confianca: faker.number.int({ min: 85, max: 100 }),
    autor: faker.person.fullName(),
    data: faker.date.recent({ days: 30 }).toLocaleDateString("pt-BR")
  };
}

function esperar(milissegundos) {
  return new Promise(function (resolver) {
    setTimeout(resolver, milissegundos);
  });
}

export async function buscarDocumentosComunidade() {
  // O import dinâmico mantém o FakerJS fora do bundle inicial: ele só é baixado
  // quando a Central é aberta, do mesmo jeito que uma API só responde quando chamada.
  const [{ faker }] = await Promise.all([
    import("@faker-js/faker/locale/pt_BR"),
    esperar(700)
  ]);

  const sorteados = faker.helpers.arrayElements(tiposDocumento, 6);

  return sorteados.map(function (tipo) {
    return gerarDocumento(faker, tipo);
  });
}
