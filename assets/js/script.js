// Dark Mode 

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode")
}


// Inicio codigo!

const btn = document.querySelector("#enviar")
const input = document.querySelector("#tarefa")
const listaCompleta = document.querySelector(".list-tarefas")

let MinhasTarefas = []

function novaTarefa() {
    if (input.value == "") {
        alert("Digite uma tarefa!")
    } else {
        MinhasTarefas.push({
            tarefa: input.value,
            concluido: false
        })
          
        input.value = ""

        mostrarTarefas()
    }


}

function mostrarTarefas() {
    let novaLi = ''

    MinhasTarefas.forEach((item, index) => {
        novaLi = novaLi + `
        <li class="${item.concluido && "done"}">
            <i class="fa-solid fa-check concluida"></i>
            <p>${item.tarefa}</p>
            <div class="icons">
                <i class="fa-solid fa-check" onclick="tarefaConcluida(${index})"></i>
                <i class="fa-solid fa-trash" onclick="deletarItem(${index})"></i>
            </div>
        </li> 
        
        <section class="clear_button">
            <div class="botao_clear" title="Limpar Tudo">
                <a class="link-clear" onclick="deletarAll(${index})">
                <div>
                    <i class="fa-solid fa-trash"></i>
                    <p>Limpar tudo</p>
                </div>
                </a>
            </div>
        </section>
        `
    })

    listaCompleta.innerHTML = novaLi


    localStorage.setItem('lista', JSON.stringify(MinhasTarefas))

}

function tarefaConcluida(index) {
    MinhasTarefas[index].concluido = !MinhasTarefas[index].concluido

    mostrarTarefas()
}

function deletarItem(index) {
    MinhasTarefas.splice(index, 1)

    mostrarTarefas()
}

function deletarAll(index) {
    MinhasTarefas.splice(MinhasTarefas  )

    mostrarTarefas()
}


function recarregarTarefas() {
    const tarefasLocal = localStorage.getItem('lista')

    if (tarefasLocal) {
        MinhasTarefas = JSON.parse(tarefasLocal)
    }
    mostrarTarefas()
}


function openColors(){
    const PainelCores = document.querySelector(".mudarCor")

    if(PainelCores.style.display === "none"){
        PainelCores.style.display = "block"
    } else {
        PainelCores.style.display = "none"
    }
}
recarregarTarefas()
btn.addEventListener("click", novaTarefa)