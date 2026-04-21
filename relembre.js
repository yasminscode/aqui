const studyData = window.RELEMBRE_DATA || [];
const studyToc = document.getElementById("studyToc");
const studyTopicCount = document.getElementById("studyTopicCount");
const studyCurrentCount = document.getElementById("studyCurrentCount");
const studyIconLine = document.getElementById("studyIconLine");
const studyTitle = document.getElementById("studyTitle");
const studySubtitle = document.getElementById("studySubtitle");
const studyFundamentos = document.getElementById("studyFundamentos");
const studyEssenciais = document.getElementById("studyEssenciais");
const studyImportancia = document.getElementById("studyImportancia");
const studyConexao = document.getElementById("studyConexao");
const studyPrev = document.getElementById("studyPrev");
const studyNext = document.getElementById("studyNext");

let currentStudyIndex = 0;

function buildStudyToc(){
  studyToc.innerHTML = "";
  studyData.forEach((topic, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topic-select-btn";
    btn.innerHTML = `<span>${topic.icon}</span><span>${topic.title}</span>`;
    btn.addEventListener("click", () => {
      currentStudyIndex = index;
      renderStudyTopic();
    });
    studyToc.appendChild(btn);
  });
}

function renderStudyTopic(){
  const topic = studyData[currentStudyIndex];
  [...studyToc.querySelectorAll('.topic-select-btn')].forEach((btn, idx) => btn.classList.toggle('active', idx === currentStudyIndex));

  studyTopicCount.textContent = studyData.length;
  studyCurrentCount.textContent = `${currentStudyIndex + 1}/${studyData.length}`;
  studyIconLine.textContent = `${topic.icon} tópico selecionado`;
  studyTitle.textContent = topic.title;
  studySubtitle.textContent = topic.subtitle;

  studyFundamentos.innerHTML = "";
  topic.fundamentos.forEach(par => {
    const p = document.createElement('p');
    p.textContent = par;
    studyFundamentos.appendChild(p);
  });

  studyEssenciais.innerHTML = "";
  topic.essenciais.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    studyEssenciais.appendChild(li);
  });

  studyImportancia.textContent = topic.importancia;
  studyConexao.textContent = topic.conexao;

  studyPrev.disabled = currentStudyIndex === 0;
  studyNext.textContent = currentStudyIndex === studyData.length - 1 ? 'Voltar ao primeiro tópico ↺' : 'Próximo tópico →';
}

studyPrev.addEventListener('click', () => {
  if(currentStudyIndex > 0){
    currentStudyIndex -= 1;
    renderStudyTopic();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

studyNext.addEventListener('click', () => {
  currentStudyIndex = currentStudyIndex === studyData.length - 1 ? 0 : currentStudyIndex + 1;
  renderStudyTopic();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

buildStudyToc();
renderStudyTopic();
