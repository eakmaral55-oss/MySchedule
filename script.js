const schedule={
"ПН":[
["12:00","Математические основы создания систем ИИ","Миткин Е.Л.","ЛЕК","213",1],
["13:00","Компьютерный английский язык","Сыргабаева А.М.","ЛЕК","Красный зал",1],
["14:00","Компьютерный английский язык","Сыргабаева А.М.","ЛЕК","Красный зал",1],
["15:00","Теория вероятности","Мусакулова М.А.","ЛЕК","213",1],
["16:00","Основы теории управления","Миркин Е.Л.","ЛЕК","213",1],
["17:00","Основы теории управления","Миркин Е.Л.","ЛЕК","213",1]],
"ВТ":[
["12:00","Компьютерная графика и дизайн","Ост Н.В.","ЛЕК","213",1],
["13:00","База данных","Ост Н.В.","ЛАБ","104",1],
["14:00","База данных","Ост Н.В.","ЛАБ","104",1],
["15:00","Теория вероятности","Мусакулова М.А.","ЛЕК","105",1],
["16:00","Электротехника, электроника и схематика","Айдаргалиев А.О.","ЛЕК","105",1],
["17:00","Электротехника, электроника и схематика","Айдаргалиев А.О.","ЛЕК","105",1]],
"СР":[
["12:00","Математические основы создания систем ИИ","Миткин Е.Л.","ЛЕК","213",1],
["13:00","Основы теории управления","Миркин Е.Л.","ЛАБ","105",1],
["14:00","Основы теории управления","Миркин Е.Л.","ЛАБ","105",1],
["15:00","База данных","Ост Н.В.","ЛЕК","213",1]],
"ЧТ":[
["13:00","База данных","Ост Н.В.","ЛЕК","213",1],
["14:00","Теория вероятности","Мусакулова М.А.","ЛЕК","213",1],
["15:00","Компьютерная графика и дизайн","Ост Н.В.","ЛАБ","404",1]],
"ПТ":[
["09:00","Теория вероятности","Мусакулова М.А.","ЛАБ","105",1],
["10:00","Компьютерная графика и дизайн","Ост Н.В.","ЛАБ","107",1],
["11:00","Компьютерная графика и дизайн","Ост Н.В.","ЛАБ","107",1],
["12:00","Электротехника, электроника и схематика","Айдаргалиев А.О.","ЛЕК","213",1],
["13:00","Электротехника, электроника и схематика","Айдаргалиев А.О.","ЛЕК","213",1],
["14:00","Программа личностного роста (Модуль 5)","Талатбаева А.А.","ТРЕН.","602",1],
["15:00","Программа личностного роста (Модуль 5)","Талатбаева А.А.","ТРЕН.","602",1]],
"СБ":[
["09:00","Сеть и телекоммуникации","Каныбеков К.К.","ЛЕК","104",1],
["10:00","Сеть и телекоммуникации","Каныбеков К.К.","ЛАБ","104",1],
["11:00","Сеть и телекоммуникации","Каныбеков К.К.","ЛАБ","104",1],
["12:00","Математические основы создания систем ИИ","Миткин Е.Л.","ЛАБ","105",1],
["13:00","Математические основы создания систем ИИ","Миткин Е.Л.","ЛАБ","105",1],
["14:00","Математические основы создания систем ИИ","Миткин Е.Л.","ЛАБ","105",1]]
};

const days=["ПН","ВТ","СР","ЧТ","ПТ","СБ"];
const dayNames={ПН:"Понедельник",ВТ:"Вторник",СР:"Среда",ЧТ:"Четверг",ПТ:"Пятница",СБ:"Суббота"};
let selectedDay=todayDay();
let selectedLesson=null;
let calendarDate=new Date();

function todayDay(){
 const d=new Date().getDay();
 return ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"][d];
}
function mins(t){let a=t.split(":").map(Number);return a[0]*60+a[1]}
function time(m){return `${String(Math.floor(m/60)%24).padStart(2,"0")}:${String(m%60).padStart(2,"0")}`}
function endTime(l){
 return time(mins(l[0])+l[5]*50+(l[5]-1)*10);
}
function totalSecondsForLesson(l){
 return (l[5]*50+(l[5]-1)*10)*60;
}
function setCircle(el, percent){
 if(!el)return;
 const p=Math.max(0,Math.min(100,percent));
 el.style.setProperty("--progress",p);
 el.style.background=`conic-gradient(#72b7ff calc(var(--progress)*1%), rgba(255,255,255,.12) 0)`;
}
function todayDateFor(day){
 const now=new Date(), cur=now.getDay()||7, target=days.indexOf(day)+1;
 const x=new Date(now);x.setDate(now.getDate()+target-cur);return x;
}
function formatDate(d){
 return new Intl.DateTimeFormat("ru-RU",{weekday:"long",day:"numeric",month:"long"}).format(d);
}
function esc(s){const d=document.createElement("div");d.textContent=s||"";return d.innerHTML}

let subjects=JSON.parse(localStorage.getItem("subjects")||"[]");
function renderSubjects(){const b=document.getElementById("subjectsList");if(!b)return;b.innerHTML=subjects.length?subjects.map((x,i)=>`<button class="subject-card" onclick="editSubject(${i})"><div class="subject-head"><span class="subject-name">${esc(x.name)}</span><span class="subject-exam">${x.exam?new Date(x.exam+"T00:00:00").toLocaleDateString("ru-RU"):"Экзамен не указан"}</span></div><div class="subject-questions">${esc(x.questions||"Нет записей")}</div></button>`).join(""):`<div class="empty-state"><div class="empty-title">Предметов пока нет</div><div class="empty-text">Добавь экзамен, вопросы и задания.</div></div>`}
function addSubject(){document.getElementById("subjectName").value="";document.getElementById("subjectExam").value="";document.getElementById("subjectQuestions").value="";document.getElementById("subjectModal").dataset.index="";document.getElementById("subjectModal").classList.add("open")}
function editSubject(i){let x=subjects[i];document.getElementById("subjectName").value=x.name;document.getElementById("subjectExam").value=x.exam||"";document.getElementById("subjectQuestions").value=x.questions||"";document.getElementById("subjectModal").dataset.index=i;document.getElementById("subjectModal").classList.add("open")}
function saveSubject(){let n=document.getElementById("subjectName").value.trim();if(!n)return;let x={name:n,exam:document.getElementById("subjectExam").value,questions:document.getElementById("subjectQuestions").value.trim()};let i=document.getElementById("subjectModal").dataset.index;if(i!=="")subjects[+i]=x;else subjects.push(x);localStorage.setItem("subjects",JSON.stringify(subjects));closeModal("subjectModal");renderSubjects()}
function init(){
 applyTheme();
 document.querySelectorAll(".day-button").forEach(b=>b.onclick=()=>selectDay(b.dataset.day));
 selectDay(selectedDay);
 renderTasks();renderNotes();renderWeek();renderCalendar();renderSubjects();
 setInterval(updateState,1000);
 document.getElementById("notificationToggle").onchange=async e=>{
   localStorage.setItem("notifications",e.target.checked?"1":"0");
   if(e.target.checked&&"Notification"in window&&Notification.permission!=="granted") await Notification.requestPermission();
 };
 document.getElementById("notificationToggle").checked=localStorage.getItem("notifications")==="1";
}
function selectDay(day){
 selectedDay=day;
 document.querySelectorAll(".day-button").forEach(b=>b.classList.toggle("active",b.dataset.day===day));
 document.getElementById("selectedDay").textContent=dayNames[day];
 document.getElementById("currentDate").textContent=formatDate(todayDateFor(day));
 renderSchedule();updateState();
}
function lessonObj(x){return {start:x[0],name:x[1],teacher:x[2],type:x[3],room:x[4],hours:x[5]}}
function renderSchedule(){
 const list=document.getElementById("scheduleList"), arr=schedule[selectedDay]||[];
 list.innerHTML=arr.map((x,i)=>{
   const l=lessonObj(x);
   return `<button class="lesson-card" onclick="openLesson(${i})">
    <div class="lesson-time"><strong>${l.start}</strong>${l.hours} акад. ч.</div>
    <div class="lesson-info"><div class="lesson-name">${esc(l.name)}</div><div class="lesson-details"><span>📍 ${esc(l.room)}</span><span>${esc(l.type)}</span></div></div>
    <div class="lesson-arrow">›</div></button>`
 }).join("")||`<div class="empty-state"><div class="empty-title">Сегодня пар нет</div></div>`;
}
function openLesson(i){
 selectedLesson={day:selectedDay,index:i};
 const l=lessonObj(schedule[selectedDay][i]);
 document.getElementById("detailTime").textContent=`${l.start} — ${endTime(schedule[selectedDay][i])}`;
 document.getElementById("detailName").textContent=l.name;
 document.getElementById("detailRoom").textContent=l.room;
 document.getElementById("detailTeacher").textContent=l.teacher||"Не указан";
 document.getElementById("detailType").textContent=l.type;
 document.getElementById("lessonNote").value=localStorage.getItem("note_"+selectedDay+"_"+i)||"";
 openScreen("lessonScreen");
}
function saveLessonNote(){
 if(!selectedLesson)return;
 localStorage.setItem("note_"+selectedLesson.day+"_"+selectedLesson.index,document.getElementById("lessonNote").value);
 alert("Заметка сохранена");
}
function updateState(){
 const currentCard=document.getElementById("currentCard"),breakCard=document.getElementById("breakCard"),nextCard=document.getElementById("nextCard");
 currentCard.classList.add("hidden");breakCard.classList.add("hidden");nextCard.classList.add("hidden");
 if(selectedDay!==todayDay())return;
 const arr=schedule[selectedDay]||[],now=new Date(),n=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;
 for(let i=0;i<arr.length;i++){
   const l=arr[i],s=mins(l[0]),e=mins(endTime(l));
   if(n>=s&&n<e){
     currentCard.classList.remove("hidden");
     document.getElementById("currentTime").textContent=`${l[0]} — ${endTime(l)}`;
     document.getElementById("currentSubject").textContent=l[1];
     document.getElementById("currentRoom").textContent="📍 "+l[4];
     document.getElementById("currentTeacher").textContent=l[2]||l[3];
     const currentSeconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
     const endSeconds=e*60;
     document.getElementById("remainingTime").textContent=left(endSeconds-currentSeconds);
     const currentRing=document.getElementById("currentRing");
     if(currentRing){
       const startSeconds=s*60;
       const total=endSeconds-startSeconds;
       setCircle(currentRing,total>0?((currentSeconds-startSeconds)/total)*100:0);
     }
     return;
   }
   if(i<arr.length-1){
     const ns=mins(arr[i+1][0]);
     if(n>=e&&n<ns){
       breakCard.classList.remove("hidden");
       document.getElementById("breakText").textContent=`Следующая пара в ${arr[i+1][0]}`;
       document.getElementById("breakCountdown").textContent=left(ns*60-(now.getHours()*3600+now.getMinutes()*60+now.getSeconds()));
       return;
     }
   }
 }
 const next=arr.find(x=>mins(x[0])>n);
 if(next){
   nextCard.classList.remove("hidden");
   document.getElementById("nextTime").textContent=next[0];
   document.getElementById("nextName").textContent=next[1];
   document.getElementById("nextRoom").textContent="📍 "+next[4];
   const secondsToNext=mins(next[0])*60-(now.getHours()*3600+now.getMinutes()*60+now.getSeconds());
   document.getElementById("nextCountdown").textContent="через "+left(secondsToNext);
   const ring=document.getElementById("nextRing");
   const prev=arr[arr.indexOf(next)-1];
   if(ring && prev){
      const previousEnd=mins(endTime(prev))*60;
      const total=mins(next[0])*60-previousEnd;
      setCircle(ring, total>0 ? ((total-secondsToNext)/total)*100 : 0);
   } else if(ring) {
      const dayStart=8*3600;
      const total=mins(next[0])*60-dayStart;
      setCircle(ring,total>0?((total-secondsToNext)/total)*100:0);
   }
 }
}
function left(sec){
 sec=Math.max(0,Math.floor(sec));let h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
 return h?`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function openScreen(id){
 document.getElementById(id).classList.add("active");
 document.body.style.overflow="hidden";
 if(id==="weekScreen")renderWeek();
 if(id==="calendarScreen")renderCalendar();if(id==="subjectsScreen")renderSubjects();
}
function closeScreen(id){document.getElementById(id).classList.remove("active");document.body.style.overflow=""}
function showMain(){
 document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
 document.body.style.overflow="";
 document.querySelectorAll(".nav-button").forEach(x=>x.classList.toggle("active",x.dataset.page==="schedule"));
}
function renderWeek(){
 document.getElementById("weekList").innerHTML=days.map(d=>{
   const a=schedule[d]||[];
   return `<button class="week-day-card" onclick="selectDay('${d}');showMain()"><div class="week-day-head"><div class="week-day-name">${dayNames[d]}</div><div class="week-day-count">${a.length} ${a.length===1?"пара":"пар"}</div></div>${a.map(x=>`<div class="week-mini-item"><span class="week-mini-time">${x[0]}</span><span>${esc(x[1])}</span></div>`).join("")}</button>`
 }).join("");
}
let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");
function renderTasks(){
 document.getElementById("tasksList").innerHTML=tasks.length?tasks.map((t,i)=>`<div class="task-card ${t.done?"done":""}"><button class="task-check ${t.done?"done":""}" onclick="toggleTask(${i})">${t.done?"✓":""}</button><div><div class="task-title">${esc(t.title)}</div><div class="task-subtitle">${esc(t.subject)}${t.date?" · "+t.date:""}</div></div></div>`).join(""):`<div class="empty-state"><div class="empty-title">Заданий пока нет</div><div class="empty-text">Добавь домашние задания и лабораторные.</div></div>`;
}
function addTask(){document.getElementById("taskModal").classList.add("open")}
function saveTask(){
 const title=document.getElementById("taskTitle").value.trim();if(!title)return;
 tasks.push({title,subject:document.getElementById("taskSubject").value.trim(),date:document.getElementById("taskDate").value,done:false});
 localStorage.setItem("tasks",JSON.stringify(tasks));closeModal("taskModal");renderTasks();
}
function toggleTask(i){tasks[i].done=!tasks[i].done;localStorage.setItem("tasks",JSON.stringify(tasks));renderTasks()}
let notes=JSON.parse(localStorage.getItem("notes")||"[]");
function renderNotes(){
 document.getElementById("notesList").innerHTML=notes.length?notes.map((n,i)=>`<button class="note-card" onclick="editNote(${i})"><div class="note-title">${esc(n.title)}</div><div class="note-text">${esc(n.text)}</div></button>`).join(""):`<div class="empty-state"><div class="empty-title">Заметок пока нет</div><div class="empty-text">Добавь важную информацию.</div></div>`;
}
function addNote(){document.getElementById("noteTitle").value="";document.getElementById("noteText").value="";document.getElementById("noteModal").dataset.index="";document.getElementById("noteModal").classList.add("open")}
function editNote(i){document.getElementById("noteTitle").value=notes[i].title;document.getElementById("noteText").value=notes[i].text;document.getElementById("noteModal").dataset.index=i;document.getElementById("noteModal").classList.add("open")}
function saveNote(){
 const t=document.getElementById("noteTitle").value.trim(),x=document.getElementById("noteText").value.trim();if(!t&&!x)return;
 const i=document.getElementById("noteModal").dataset.index;
 if(i!=="")notes[Number(i)]={title:t,text:x};else notes.push({title:t,text:x});
 localStorage.setItem("notes",JSON.stringify(notes));closeModal("noteModal");renderNotes();
}
function closeModal(id){document.getElementById(id).classList.remove("open")}
function renderCalendar(){
 const y=calendarDate.getFullYear(),m=calendarDate.getMonth();
 document.getElementById("calendarMonth").textContent=new Intl.DateTimeFormat("ru-RU",{month:"long",year:"numeric"}).format(calendarDate);
 const first=(new Date(y,m,1).getDay()||7)-1, total=new Date(y,m+1,0).getDate();
 let h="";for(let i=0;i<first;i++)h+=`<div></div>`;
 for(let d=1;d<=total;d++){let dt=new Date(y,m,d),w=dt.getDay()||7,key=days[w-1],has=(schedule[key]||[]).length;h+=`<button class="calendar-day ${has?"has-lessons":""}" onclick="calendarSelect(${d})">${d}</button>`}
 document.getElementById("calendarGrid").innerHTML=h;
}
function openNextWeek(){calendarDate.setDate(calendarDate.getDate()+7);openScreen("calendarScreen");renderCalendar()}
function changeMonth(n){calendarDate.setMonth(calendarDate.getMonth()+n);renderCalendar()}
function calendarSelect(d){let dt=new Date(calendarDate.getFullYear(),calendarDate.getMonth(),d),w=dt.getDay()||7;if(w<=6){selectDay(days[w-1]);showMain()}}
function setTheme(theme){
 document.body.classList.toggle("light",theme==="light");
 localStorage.setItem("theme",theme);
}
function applyTheme(){setTheme(localStorage.getItem("theme")||"dark")}
init();
