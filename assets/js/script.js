const image = document.getElementById("imagem"); // Elemento da imagem do QR Code
const inputError = document.getElementById("erro"); // Mensagem de erro do input
const btnTxt = document.getElementById("btn-txt");// Mensagem dos botões


// Aguarda o carregamento do DOM antes de adicionar eventos
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-link");

    // Evento para alterar o estilo do input quando recebe foco
    input.addEventListener("focus", () => {
        input.style.backgroundImage = "url('../assets/images/link-100.png')";
        input.style.borderColor = "var(--gray-100)";
        // Esconde a mensagem de erro
        inputError.style.opacity = "0";

    });

    // Evento para restaurar o estilo quando perde o foco
    input.addEventListener("blur", () => {
        input.style.backgroundImage = "url('../assets/images/link-400.png')";
        input.style.borderColor = "var(--gray-600)";
    });
});

// Função para gerar o QR Code
function gerarQrCode() {
    // Obtém os elementos do DOM
    const inputLink = document.getElementById("input-link").value.trim(); // Captura o valor do input e remove espaços extras
    const imageText = document.getElementById("img-txt"); // Texto do espaço onde será exibido o QR Code
    const input = document.getElementById("input-link"); // Input onde o usuário digita o link
    const qrContainer = document.getElementById("qr-code"); // Container do QR Code

    // Verifica se o campo do link não está vazio
    if (inputLink) {
        // Atualiza a imagem do QR Code com o link fornecido
        image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputLink)}`;
        image.alt = `QR Code para ${inputLink}`; // Melhora a acessibilidade

        // Esconde o texto informativo da imagem
        imageText.style.display = "none";

        // Remove o padding do container do QR Code
        qrContainer.style.padding = "0";

        // Restaura o estilo padrão do input
        input.style.backgroundImage = "url('../assets/images/link-400.png')";
        input.style.border = "1px solid var(--gray-600)";

        // Esconde a mensagem de erro
        inputError.style.opacity = "0";
        
    } else {
        // Se o campo estiver vazio, exibe erro visual e mensagem
        input.style.backgroundImage = "url('../assets/images/link-danger.png')";
        input.style.border = "1px solid var(--danger)";
        inputError.style.opacity = "1";
    }
}


//Função para baixar a imagem do QR Code 
function download() {

    if (!image.src) {
        btnError();
        return;
    }

    // Usa o Fetch API para buscar a imagem
    fetch(image.src)
    .then(response => response.blob()) // Converte a resposta em um Blob
    .then(blob => {
        // Cria um link temporário
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Cria uma URL para o Blob
        link.download = "qrcode.jpg"; // Define o nome do arquivo para download
        link.click(); // Simula o clique no link para iniciar o download

        // Libera a URL do Blob da memória
        URL.revokeObjectURL(link.href);

        btnTxt.style.color = "var(--gray-200)";
        btnTxt.textContent = "A imagem foi instalada com sucesso!";    
        btnTxtFade();
    })
    .catch(error => {
        console.error('Erro ao baixar a imagem:', error);
    });
}

async function copy() {

    if (!image.src) {
        btnError(); 
        return;
    }

    try {
        // Converte a imagem em um Blob
        const resposta = await fetch(imagem.src);
        const blob = await resposta.blob();

        // Copia o Blob para a área de transferência
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        btnTxt.textContent = "Imagem copiada para área de transferência.";
        btnTxt.style.color = "var(--gray-200)";
        btnTxtFade();

    } catch (error) {
        console.error("Erro ao copiar a imagem:", error);
    }
}

//Função para alertar o usuário em caso de erro nos botões
function btnError() {
    btnTxt.style.color = "var(--danger)";
    btnTxt.textContent = "Nenhum código foi gerado. Por favor, tente novamente!";
    btnTxtFade();
}

// Função para mostrar a mensagem dos botões de forma dinâmica
function btnTxtFade() {
    
    // Aparece
    btnTxt.classList.add('visible');

    //Desaparece depois de 3s
    setTimeout(() => {
        btnTxt.classList.remove('visible');
    }, 2000);
}