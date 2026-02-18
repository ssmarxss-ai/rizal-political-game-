let level = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;

const levels = [
  {q:"National Hero of the Philippines", j:"L A Z I R O J E S", a:"JOSE RIZAL"},
  {q:"First novel of Rizal", j:"L E N I M O T E R G E G A", a:"NOLI ME TANGERE"},
  {q:"Second novel of Rizal", j:"F L E I B I L U T S E R O S M I", a:"EL FILIBUSTERISMO"},
  {q:"Organization founded in 1892", j:"L A I L G A N I I L P I F A", a:"LA LIGA FILIPINA"},
  {q:"Town where Rizal was exiled", j:"A D T I P N A", a:"DAPITAN"},
  {q:"Birthplace of Rizal", j:"A C L A B M A", a:"CALAMBA"},
  {q:"Movement of Rizal abroad", j:"R P O P A A G A D N", a:"PROPAGANDA"},
  {q:"Rizal demanded this in Spanish Cortes", j:"N E P S E R E T N A T I O R", a:"REPRESENTATION"},
  {q:"Political philosophy of love for country", j:"A N T I O N A L I S M", a:"NATIONALISM"},
  {q:"Rizal believed this leads to reform", j:"N D U A C T I O E", a:"EDUCATION"},
  {q:"Peaceful change instead of revolution", j:"M E O F R R", a:"REFORM"},
  {q:"His execution made him a political ___", j:"R A T R Y M", a:"MARTYR"}
];

const chapters = [

`<p>José Rizal must be understood not merely as a national hero, but as a political reformist shaped by colonial inequality. Growing up in Calamba, he witnessed firsthand how racial hierarchy structured governance. Spaniards occupied positions of power, while Filipinos were treated as inferior subjects rather than citizens.</p>

<p>His exposure to European liberalism transformed his thinking. Rizal absorbed ideas about civil rights, constitutional government, and representation. He concluded that oppression persisted not only because of force, but because ignorance prevented collective resistance.</p>

<p>Thus, his political awakening began with a belief: that enlightenment of the Filipino mind would eventually challenge colonial authority itself.</p>`,

`<p>Noli Me Tangere was not simply a novel—it was a political document disguised as fiction. Through characters like Padre Damaso and the suffering Crisostomo Ibarra, Rizal illustrated how friars manipulated religious authority to maintain political control.</p>

<p>The novel criticized systemic injustice rather than isolated individuals. It revealed how institutions perpetuated inequality, silenced dissent, and sustained colonial dominance.</p>

<p>In doing so, Rizal weaponized literature. His pen became a method of political resistance, exposing truths that official institutions attempted to conceal.</p>`,

`<p>El Filibusterismo presented a darker political argument. While Noli hoped for reform, El Fili warned of the consequences when reform is denied. Through the character of Simoun, Rizal explored how oppression can radicalize even the most idealistic reformist.</p>

<p>The novel suggests that when peaceful reform is consistently rejected, revolutionary sentiment intensifies. Yet Rizal did not glorify violence; instead, he portrayed it as a tragic outcome of political stubbornness.</p>

<p>This work stands as a warning to governments that ignore legitimate grievances.</p>`,

`<p>La Liga Filipina, founded in 1892, reflected Rizal’s belief in organized civic action. It aimed to unite Filipinos under peaceful reform, economic cooperation, and mutual protection.</p>

<p>Rather than inciting rebellion, the organization sought structured advocacy. It encouraged civic responsibility and collective political awareness.</p>

<p>Although short-lived, La Liga laid intellectual foundations for later nationalist movements.</p>`,

`<p>Rizal’s exile in Dapitan was not a period of silence but of civic productivity. Even under surveillance, he established a school, practiced medicine, and engaged in community development.</p>

<p>This demonstrated that political reform begins locally. Empowerment of citizens through education and self-governance was, for Rizal, a sustainable path toward national dignity.</p>

<p>Dapitan proved that reformist politics could be practiced even under constraint.</p>`,

`<p>Calamba, Rizal’s birthplace, shaped his awareness of agrarian injustice. The land disputes involving Dominican friars exposed how economic control reinforced political domination.</p>

<p>These experiences revealed to Rizal that colonial power extended beyond governance into property rights and economic exploitation.</p>

<p>Thus, his nationalism was rooted not in abstract theory but lived experience.</p>`,

`<p>The Propaganda Movement united Filipino intellectuals abroad who demanded reform through writing and advocacy. Rizal collaborated with thinkers like Marcelo H. del Pilar and Graciano López Jaena.</p>

<p>They used newspapers such as La Solidaridad to demand equality before law, secularization of parishes, and representation.</p>

<p>This movement emphasized intellectual resistance rather than armed insurrection.</p>`,

`<p>Representation in the Spanish Cortes was central to Rizal’s reform agenda. He believed Filipinos deserved a political voice within the empire.</p>

<p>Without representation, governance lacked legitimacy. For Rizal, taxation without representation symbolized structural injustice.</p>

<p>Political participation was therefore not privilege—but right.</p>`,

`<p>Nationalism for Rizal was civic rather than racial. He envisioned a Filipino identity built upon shared dignity and collective responsibility.</p>

<p>His nationalism did not advocate hatred of Spain but demanded equality within a modern constitutional framework.</p>

<p>It was inclusive, rational, and reform-oriented.</p>`,

`<p>Education stood at the core of Rizal’s philosophy. Ignorance enabled tyranny; knowledge weakened it.</p>

<p>He believed that educated citizens could challenge abusive structures peacefully and effectively.</p>

<p>Thus, schools, books, and civic learning became instruments of political transformation.</p>`,

`<p>Reform, for Rizal, was strategic. He calculated that premature revolution could lead to chaos without structural preparation.</p>

<p>He argued that moral and intellectual readiness must precede political independence.</p>

<p>This gradualist view distinguished him from revolutionary contemporaries.</p>`,

`<p>Rizal’s execution in 1896 transformed him into a political martyr. His death exposed colonial intolerance toward reformist dissent.</p>

<p>Ironically, by silencing him, colonial authorities amplified his influence.</p>

<p>His martyrdom intensified revolutionary consciousness and solidified his legacy as the intellectual architect of Filipino nationalism.</p>`

];

function typeTitle() {
  let text = "RIZAL: The Political Archive";
  let i = 0;
  let typing = setInterval(() => {
    document.getElementById("typingTitle").innerText += text[i];
    i++;
    if(i >= text.length) clearInterval(typing);
  }, 80);
}
typeTitle();

function startGame(){
  document.querySelector(".start").classList.remove("active");
  document.querySelector(".game").classList.add("active");
  loadLevel();
}

function loadLevel(){
  if(level >= levels.length){
    document.querySelector(".game").classList.remove("active");
    document.querySelector(".complete").classList.add("active");
    return;
  }

  document.getElementById("question").innerText = levels[level].q;
  document.getElementById("jumbled").innerText = levels[level].j;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";

  timeLeft = 20;
  document.getElementById("timer").innerText = timeLeft;

  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timerInterval);
      document.querySelector(".game").classList.remove("active");
      document.querySelector(".fail").classList.add("active");
    }
  },1000);
}

function submitAnswer(){
  let ans = document.getElementById("answer").value.toUpperCase();
  if(ans === levels[level].a){
    score += 10;
    document.getElementById("score").innerText = score;
    document.getElementById("correctSound").play();
    showChapter();
  } else {
    document.getElementById("feedback").innerText = "Incorrect. Try again.";
  }
}

function showChapter(){
  clearInterval(timerInterval);
  document.querySelector(".game").classList.remove("active");
  document.querySelector(".chapter").classList.add("active");
  document.getElementById("chapterTitle").innerText = "Chapter " + (level+1);
  document.getElementById("chapterContent").innerHTML = chapters[level];
  launchConfetti();
}

function nextLevel(){
  level++;
  document.querySelector(".chapter").classList.remove("active");
  document.querySelector(".game").classList.add("active");
  loadLevel();
}

function retryLevel(){
  document.querySelector(".fail").classList.remove("active");
  document.querySelector(".game").classList.add("active");
  loadLevel();
}

function launchConfetti(){
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for(let i=0;i<120;i++){
    ctx.fillStyle = "hsl("+Math.random()*360+",100%,50%)";
    ctx.fillRect(Math.random()*canvas.width,
                 Math.random()*canvas.height,
                 5,5);
  }
  setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),1000);
}