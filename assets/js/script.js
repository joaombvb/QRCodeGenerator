// Aguarda o carregamento do DOM antes de adicionar eventos
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-link");

    // Evento para alterar o estilo do input quando recebe foco
    input.addEventListener("focus", () => {
        input.style.backgroundImage = "url('../assets/images/link-100.png')";
        input.style.borderColor = "var(--gray-100)";
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
    const link = document.getElementById("input-link").value.trim(); // Captura o valor do input e remove espaços extras
    const image = document.getElementById("imagem"); // Elemento da imagem do QR Code
    const imageText = document.getElementById("img-txt"); // Texto do espaço onde será exibido o QR Code
    const input = document.getElementById("input-link"); // Input onde o usuário digita o link
    const inputError = document.getElementById("erro"); // Mensagem de erro
    const qrContainer = document.getElementById("qr-code"); // Container do QR Code

    // Verifica se o campo do link não está vazio
    if (link) {
        // Atualiza a imagem do QR Code com o link fornecido
        image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`;
        image.alt = `QR Code para ${link}`; // Melhora a acessibilidade

        // Esconde o texto informativo da imagem
        imageText.style.display = "none";

        // Remove o padding do container do QR Code
        qrContainer.style.padding = "0";

        // Restaura o estilo padrão do input
        input.style.backgroundImage = "url('../assets/images/link-400.png')";
        input.style.border = "1px solid var(--gray-600)";

        // Esconde a mensagem de erro
        inputError.style.display = "none";
        
    } else {
        // Se o campo estiver vazio, exibe erro visual e mensagem
        input.style.backgroundImage = "url('../assets/images/link-danger.png')";
        input.style.border = "1px solid var(--danger)";
        inputError.style.display = "block";
    }
}
