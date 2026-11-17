function iniciarCadastro(chave, campoChamado) {
    const form = document.querySelector("#form-" + campoChamado);
    const campo = document.querySelector("#nome-" + campoChamado);
    const lista = document.querySelector("#lista-" + campoChamado + "s");
    let registros = lerRegistros(chave);
    if (!registros) return;

    function listar() {
        lista.replaceChildren();
        if (registros.length === 0) {
            const item = document.createElement("li");
            item.className = "list-group-item text-secondary";
            item.textContent = "Nenhum registro cadastrado.";
            lista.appendChild(item);
        }
        for (const registro of registros) {
            const item = document.createElement("li");
            item.className = "list-group-item d-flex justify-content-between align-items-center gap-2 text-break";
            const nome = document.createElement("span");
            nome.textContent = registro.nome;
            const excluir = document.createElement("button");
            excluir.type = "button";
            excluir.className = "btn btn-sm btn-outline-danger";
            excluir.textContent = "Excluir";
            excluir.addEventListener("click", function() {
                const chamados = lerChamados();
                const atuais = lerRegistros(chave);
                if (!chamados || !atuais) return;
                if (chamados.some(chamado => chamado[campoChamado] === registro.nome)) {
                    alert("Este cadastro está vinculado a um chamado e não pode ser excluído.");
                    return;
                }
                if (!confirm("Excluir " + registro.nome + "?")) return;
                const restantes = atuais.filter(atual => atual.nome !== registro.nome);
                if (gravarRegistros(chave, restantes)) {
                    registros = restantes;
                    listar();
                }
            });
            item.append(nome, excluir);
            lista.appendChild(item);
        }
    }

    form.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nome = campo.value.trim();
        if (!nome) {
            alert("Informe um nome válido.");
            return;
        }
        const atuais = lerRegistros(chave);
        if (!atuais) return;
        if (atuais.some(registro => registro.nome.toLowerCase() === nome.toLowerCase())) {
            alert("Esse nome já está cadastrado.");
            return;
        }

        atuais.push({ nome });
        if (gravarRegistros(chave, atuais)) {
            registros = atuais;
            form.reset();
            listar();
            campo.focus();
        }
    });
    listar();
}

iniciarCadastro("tecnicos", "tecnico");
iniciarCadastro("equipamentos", "equipamento");
