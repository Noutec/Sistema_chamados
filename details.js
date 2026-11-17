const chamados = lerChamados();
const chamado = chamados && buscarChamado(chamados);

if (chamado) {
    const prioridades = { baixa: "Baixa", media: "Média", alta: "Alta" };
    const categorias = { hardware: "Hardware", software: "Software", rede: "Rede", outros: "Outros" };

    document.querySelector("#numero-chamado").textContent = "Chamado #" + chamado.id;
    preencherStatus(document.querySelector("#detalhe-status"), chamado.status);
    const campos = {
        nome: chamado.nome,
        setor: chamado.setor,
        equipamento: chamado.equipamento,
        prioridade: prioridades[chamado.prioridade] || "Não informada",
        categoria: categorias[chamado.categoria] || "Não informada",
        problema: chamado.problema,
        data: chamado.data,
        prazo: mostrarPrazo(chamado),
        tecnico: chamado.tecnico || "Sem técnico definido",
        solucao: chamado.solucao || "Sem solução registrada"
    };
    for (const [campo, valor] of Object.entries(campos)) {
        document.getElementById("detalhe-" + campo).textContent = valor;
    }

    document.querySelector("#link-editar").href = "edit.html?id=" + chamado.id;
    document.querySelector("#link-status").href =
        situacoes[chamado.status].pagina + ".html#chamado-" + chamado.id;
    document.querySelector("#detalhe-chamado").hidden = false;
} else {
    const mensagem = document.querySelector("#detalhe-mensagem");
    mensagem.textContent = chamados ? "Chamado não encontrado." : "Não foi possível carregar o chamado.";
    mensagem.hidden = false;
    document.querySelector("#detalhe-voltar").hidden = false;
}
