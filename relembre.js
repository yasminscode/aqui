const studyData = window.RELEMBRE_DATA || [];
const studyToc = document.getElementById("studyToc");
const studyIconLine = document.getElementById("studyIconLine");
const studyTitle = document.getElementById("studyTitle");
const studyContent = document.getElementById("studyContent");
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
  studyIconLine.textContent = `${topic.icon} tópico selecionado`;
  studyTitle.textContent = topic.title;
  studyContent.innerHTML = '';

  topic.content.forEach(block => {
    const el = document.createElement(block.type === 'h3' ? 'h3' : 'p');
    el.textContent = block.text;
    studyContent.appendChild(el);
  });

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
