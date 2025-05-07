<script>
    const mensagens = [
      "você é a luz que ilumina nossas vidas. Seu amor e carinho são inestimáveis. Queremos que saiba o quanto somos gratos e o quanto amamos você.",
      "seu amor é o que nos guia todos os dias. Obrigado por ser essa pessoa maravilhosa em nossas vidas.",
      "você é o alicerce da nossa família. Seu amor incondicional nos fortalece e nos inspira.",
      "não existem palavras para expressar o quanto você é importante para nós. Te amamos mais que tudo!",
      "seu abraço é o lugar mais seguro do mundo. Obrigado por sempre nos proteger e amar.",
      "você merece todo o amor e felicidade do mundo. Hoje e sempre, celebramos você!",
      "sua força e dedicação são admiráveis. Você é nossa heroína todos os dias.",
      "seu sorriso ilumina nossos dias. Que você seja sempre tão feliz quanto nos faz.",
      "você é a pessoa mais especial do mundo. Obrigado por todo seu amor e paciência.",
      "seu coração é maior que o universo. Obrigado por nos amar tanto."
    ];

    let typingInterval = null;

    // Função para gerar a mensagem automaticamente
    function gerarMensagemAutomatica() {
      const nome = $("#nomeMae").val().trim();

      if (!nome) {
        alert("Por favor, digite o nome da sua mãe.");
        return;
      }

      const aleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
      const mensagemFinal = `Querida ${nome},\n\n${aleatoria}`;
      digitarTexto(mensagemFinal, "#mensagem", () => {
        gerarImagemMensagem();
      });
    }

    // Função para digitar o texto com efeito
    function digitarTexto(texto, destino, callback) {
      if (typingInterval) clearInterval(typingInterval);
      $(destino).html("");
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < texto.length) {
          $(destino).append(texto.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          typingInterval = null;
          if (callback) callback();
        }
      }, 50);
    }

    // Função para gerar imagem com a mensagem
    function gerarImagemMensagem() {
      const mensagemDiv = document.getElementById("mensagem");
      const container = document.createElement("div");
      container.className = "message-style";

      const texto = mensagemDiv.innerText;
      const linhas = texto.split('\n');

      // Adiciona o título "Querida Mamãe"
      const titulo = document.createElement("div");
      titulo.className = "message-title";
      titulo.textContent = "Querida Mamãe";
      container.appendChild(titulo);

      // Adiciona o conteúdo da mensagem
      const conteudo = document.createElement("div");
      conteudo.className = "message-content";
      for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].trim() !== '') {
          const paragrafo = document.createElement("p");
          paragrafo.textContent = linhas[i];
          conteudo.appendChild(paragrafo);
        }
      }
      container.appendChild(conteudo);

      const preview = document.getElementById("imagemPreview");
      preview.innerHTML = "";
      preview.appendChild(container);

      document.fonts.ready.then(() => {
        html2canvas(container, { scale: 2 }).then(canvas => {
          preview.innerHTML = "";
          preview.appendChild(canvas);
          const btnDownload = document.getElementById("btnDownload");
          btnDownload.style.display = "inline-block";
          btnDownload.setAttribute("aria-hidden", "false");

          btnDownload.onclick = () => {
            const link = document.createElement('a');
            link.download = 'mensagem-dia-das-maes.png';
            link.href = canvas.toDataURL("image/png");
            link.click();
          };
        });
      });
    }

    // Função para compartilhar no WhatsApp
    function compartilhar() {
      const texto = $("#mensagem").text().trim();
      if (!texto) {
        alert("Por favor, gere ou envie uma mensagem primeiro.");
        return false;
      }
      const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
      window.open(link, "_blank");
      return false;
    }

    // Função para enviar a mensagem
    function enviar() {
      const nome = $("#nomeMae").val().trim();
      const manual = $("#mensagemManual").val().trim();

      if (!nome) {
        alert("Por favor, digite o nome da sua mãe.");
        return;
      }

      if (!manual) {
        alert("Por favor, escreva uma mensagem personalizada.");
        return;
      }

      const mensagemFinal = `Querida ${nome},\n\n${manual}`;
      digitarTexto(mensagemFinal, "#mensagem", () => {
        gerarImagemMensagem();
      });
    }
  </script>
