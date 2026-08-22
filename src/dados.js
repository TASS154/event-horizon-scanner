export const slides = [
  {
    src: "/img/slide-scan.svg",
    alt: "Ilustração de documento sendo escaneado",
    titulo: "Scan inteligente",
    texto: "A câmera detecta a folha e prepara a imagem para leitura."
  },
  {
    src: "/img/slide-ia.svg",
    alt: "Ilustração de texto tratado com inteligência artificial",
    titulo: "Texto com IA",
    texto: "O OCR extrai o conteúdo e a IA corrige, resume ou traduz."
  },
  {
    src: "/img/slide-audio.svg",
    alt: "Ilustração de exportação para áudio e PDF",
    titulo: "Áudio e PDF",
    texto: "O resultado pode virar PDF ou áudio para consulta rápida."
  }
];

export const usuariosTeste = [
  {
    email: "aluno@fiap.com.br",
    senha: "fiap123",
    nome: "Aluno FIAP"
  },
  {
    email: "admin@scanner.com",
    senha: "admin123",
    nome: "Administrador"
  }
];

export const categorias = ["Contratos", "Artigos", "Apostilas", "Outros"];

/*
  Revisão da IA
  Antes: os três cartões de problema estavam copiados no JSX da página inicial.
  Agora: a lista vive neste array e a página só percorre com map.
  Motivo: incluir ou mudar um cartão passa a ser um item a mais aqui, sem repetir a marcação.
*/
export const problemas = [
  {
    titulo: "Muito texto",
    texto: "Várias folhas somam tempo e atenção."
  },
  {
    titulo: "Fadiga",
    texto: "Horas na tela desgastam a leitura."
  },
  {
    titulo: "Urgência",
    texto: "Você quer o essencial rápido, não só o arquivo estático."
  }
];

export const solucoes = [
  {
    titulo: "Scan inteligente",
    texto: "Detecta a folha na câmera e corrige a perspectiva antes de ler os caracteres."
  },
  {
    titulo: "Texto com IA",
    texto: "Correção e formatação; opção de traduzir para inglês ou espanhol."
  },
  {
    titulo: "Áudio",
    texto: "Leitura integral ou versão resumida para ouvir no lugar de ler."
  },
  {
    titulo: "Arquivo",
    texto: "Exporta PDF para guardar ou compartilhar o resultado."
  }
];

export const passos = [
  {
    numero: "Passo 1",
    titulo: "Enquadre o documento",
    texto: "A câmera mostra a imagem ao vivo. O app tenta desenhar um contorno verde em volta da folha quando acha um retângulo parecido com uma página."
  },
  {
    numero: "Passo 2",
    titulo: "Escolha o modo de IA",
    texto: "No painel inferior você escolhe se quer só corrigir o português ou traduzir para inglês ou espanhol — isso muda o texto final e a voz do áudio."
  },
  {
    numero: "Passo 3",
    titulo: "Capture",
    texto: "Ao tocar no botão redondo (captura), a tela mostra “processando” e a imagem atual é enviada para OCR + IA. Se não houver texto detectado, aparece mensagem de erro."
  },
  {
    numero: "Passo 4",
    titulo: "Leia o resultado",
    texto: "O texto corrigido (ou traduzido) aparece na caixa grande. Você pode voltar à câmera para tirar outra foto de outra página."
  },
  {
    numero: "Passo 5",
    titulo: "PDF ou áudio",
    texto: "Com o texto pronto, dá para salvar PDF, gerar áudio da leitura completa ou pedir um resumo à IA e então gerar o áudio resumido."
  }
];

export const tecnologias = [
  "OpenCV",
  "NumPy",
  "pytesseract",
  "google-genai",
  "CustomTkinter",
  "Pillow",
  "FPDF",
  "edge-tts",
  "asyncio",
  "threading"
];
