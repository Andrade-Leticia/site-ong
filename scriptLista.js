
window.onload = function() {
    var editarBtn = document.getElementById('btn-editar');
    var salvarBtn = document.getElementById('btn-salvar');
    var fichas = document.querySelectorAll('.ficha');

    // Função para habilitar a edição dos campos
    function habilitarEdicao() {
        fichas.forEach(function(ficha) {
            var inputs = ficha.querySelectorAll('input, select');
            inputs.forEach(function(input) {
                input.removeAttribute('disabled');
            });
        });
        editarBtn.style.display = 'none';
        salvarBtn.style.display = 'block';
    }

    // Função para salvar os dados e desabilitar a edição dos campos
    function salvarDados() {
        fichas.forEach(function(ficha) {
            var inputs = ficha.querySelectorAll('input, select');
            inputs.forEach(function(input) {
                input.setAttribute('disabled', true);
                localStorage.setItem(input.id, input.value); // Salvar os dados no localStorage
            });
        });
        editarBtn.style.display = 'block';
        salvarBtn.style.display = 'none';
    }

    // Verificar se há dados salvos no localStorage e preencher os campos
    fichas.forEach(function(ficha) {
        var inputs = ficha.querySelectorAll('input, select');
        inputs.forEach(function(input) {
            var valorSalvo = localStorage.getItem(input.id);
            if (valorSalvo) {
                input.value = valorSalvo;
            }
        });
    });

    editarBtn.addEventListener('click', habilitarEdicao);
    salvarBtn.addEventListener('click', salvarDados);

    // Adicionar evento de escuta para a barra de pesquisa
    var searchBar = document.getElementById('search');
    searchBar.addEventListener('input', function() {
        pesquisarFichas();
    });

    // Adicionar evento de escuta para a tecla "Enter"
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pesquisarFichas();
        }
    });

    // Função para pesquisar fichas
    function pesquisarFichas() {
        var termoPesquisa = searchBar.value.toLowerCase().trim(); // Obter o termo de pesquisa e formatá-lo
        fichas.forEach(function(ficha) {
            var nomeGato = ficha.querySelector('input[name="nome"]').value.toLowerCase(); // Obter o nome do gato na ficha
            var idadeGato = ficha.querySelector('input[name="idade"]').value.toLowerCase(); // Obter a idade do gato na ficha
            var sexoGato = ficha.querySelector('select[name="sexo"]').value.toLowerCase(); // Obter o sexo do gato na ficha
            var prioridade = ficha.querySelector('select[name="prioridade"]').value.toLowerCase(); // Obter a prioridade na ficha
            var larTemporario = ficha.querySelector('input[name="lar_temporario"]').value.toLowerCase(); // Obter o lar temporário na ficha
            
            // Verificar se o nome, idade, sexo, prioridade ou lar temporário contém o termo de pesquisa
            if (nomeGato.includes(termoPesquisa) || idadeGato.includes(termoPesquisa) || sexoGato.includes(termoPesquisa) || prioridade.includes(termoPesquisa) || larTemporario.includes(termoPesquisa)) {
                ficha.style.display = 'block'; // Se corresponder, mostrar a ficha
            } else {
                ficha.style.display = 'none'; // Caso contrário, ocultar a ficha
            }
        });
    }

}
function redirectMenu() {
    window.location.href = "file:///Users/brebarbosa/Documents/expCriativaONG/crazyCatGang/menu.html";
}
