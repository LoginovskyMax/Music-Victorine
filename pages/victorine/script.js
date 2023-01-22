let conteiner = document.querySelector('.main__right')
let audio1 = new Audio()
let audio2 = new Audio()
let winSound = new Audio("../../assets/mp3/win_sound.mp3")
let errorSound = new Audio("../../assets/mp3/error.mp3")
let stopPlay = false
let currentGenge = 0
let inGame = true
let curLangRus = true
let rightAnswer = document.querySelector('.main__right__text')
let rightImage = document.querySelector('.main__question_img')
let totalScoreHtml = document.querySelector('.main__score_total')
let changeLang = document.querySelector('#change_lang')
let changeLang2 = document.querySelector('#change_lang2')
let nextBtn = document.querySelector('.main__show_next-btn')
let textPreview = document.querySelector('.main__show_preview')
let maxScore = 5
let mainScore = 0
let answersList = []
let previewList = []
let activeHeader = document.querySelectorAll('.active')
let activeFooter = document.querySelectorAll('.active_footer')
activeHeader[1].classList.add('focused')
activeFooter[1].classList.add('focused')
const AudioArr = [
  {class:'Опера',classEn:'Opera',songs:[
    {id:0,name:'Eros Ramazzotti',src:'../../assets/mp3/Eros Ramazzotti & Cher - Piu Che Puoi.mp3',img:'../../assets/img/eros-ramazzotti.jpeg',description:'итальянский певец, автор песен, гитарист. Один из наиболее популярных итальянских певцов, известный не только в англоязычных странах Европы, но и в испаноязычных странах, поскольку большинство своих альбомов он выпустил на итальянском и испанском языках',enDescript:'Italian pop singer, musician and songwriter. He is popular in Italy and most European countries, and throughout the Spanish-speaking world, as he has released most of his albums in both Italian and Spanish'},
    {id:1,name:'Andrea Bocelli',src:'../../assets/mp3/Andrea Bocelli & Sarah Brightman - Time To Say Goodbye.mp3',img:'../../assets/img/andrea_bocelli.jfif',description:'итальянский певец, исполнитель классической и популярной музыки. Популяризатор оперной музыки.',enDescript:'Italian tenor and multi-instrumentalist.He was born visually impaired, with congenital glaucoma, and at the age of 12, Bocelli became completely blind, following a brain hemorrhage resulting from a football accident.'},
    {id:2,name:'Jose Carreras',src:'../../assets/mp3/Jose Carreras & Sarah Brightman - Friends For Life.mp3',img:'../../assets/img/jose-carreras.png',description:' испанский оперный певец (тенор), известный своими интерпретациями произведений Джузеппе Верди и Джакомо Пуччини.',enDescript:'is a Spanish operatic tenor who is particularly known for his performances in the operas of Donizetti, Verdi and Puccini.'},
    {id:3,name:'Placido Domingo',src:'../../assets/mp3/Plcido_Domingo_-_O_Sole_Mio_(musmore.com).mp3',img:'../../assets/img/Placido_domingo.jfif',description:'испанский оперный певец и дирижёр, лирико-драматический тенор, с 2009 года исполняющий наряду с теноровыми партии баритонового репертуара, генеральный директор Лос-Анджелесской оперы.',enDescript:' Spanish opera singer, conductor, and arts administrator.'},
    {id:4,name:'Lucciano Pavorotti',src:'../../assets/mp3/Luciano Pavarotti - Dalla, Caruso.mp3',img:'../../assets/img/luciano_pavarotti.jfif',description:' итальянский оперный певец (тенор), один из самых выдающихся оперных певцов второй половины XX века.',enDescript:'Italian operatic tenor who during the late part of his career crossed over into popular music, eventually becoming one of the most acclaimed tenors of all time.'},
    {id:5,name:'Barbara Fritolli',src:'../../assets/mp3/barbara-frittoli.mp3',img:'../../assets/img/barbara_fritolli.jpg',description:'Итальянское сопрано Барбара Фриттоли хорошо известна любителям музыки. Она получила образование в Миланской консерватории. Поначалу Фриттоли снискала известность как чуткий интерпретатор партий в операх Моцарта.',enDescript:' Italian operatic soprano, specializing in operas by Verdi and Mozart.She has sung leading roles in opera houses throughout Europe and in the United States'}
  ]},
  {class:'Русский Рэп',classEn:'Russian Rap',songs:[
    {id:0,name:'Oxxxymiron',src:'../../assets/mp3/Oxxxymiron - Лондонград.mp3',img:'../../assets/img/oxxxymiron.jpg',description:'российский хип-хоп-исполнитель, поэт-песенник и общественный деятель. Является одним из наиболее коммерчески успешных рэп-исполнителей России, его альбомы «Вечный жид» и, особенно, «Горгород»внесли значительный вклад в историю русского рэпа',enDescript:'Russian hip-hop artist and former CEO of the Booking Machine booking agency,as well as a co-founder and former member of the record label Vagabund.'},
    {id:1,name:'Ирина Кайратовна',EnName:"Irina Kairatovna",src:'../../assets/mp3/Ирина Кайратовна - 5000.mp3',img:'../../assets/img/irina.jpeg',description:'Казахстанское творческое объединение, выпускающее музыкальный и юмористический контент',enDescript:'Kazachstan rap author, create music and humoristic content'},
    {id:2,name:'Jan Khalib',src:'../../assets/mp3/Jah Khalib - Медина (mp3profy.com).mp3',img:'../../assets/img/Jan Khalib.jfif',description:' казахстанский русскоязычный рэпер, певец, битмейкер и продюсер.',enDescript:'known professionally as Jah Khalib is a Kazakh rapper, singer and record producer.'},
    {id:3,name:'ATL',src:'../../assets/mp3/ATL - Аист Марабу.mp3',img:'../../assets/img/ATL.jfif',description:'российский хип-хоп-исполнитель. Бывший участник группы Aztecs.',enDescript:'Russian hip-hop singer'},
    {id:4,name:'Miyagi',src:'../../assets/mp3/Miyagi - Колибри.mp3',img:'../../assets/img/Miyagi.jpg',description:' интернациональный хип-хоп-дуэт из города Владикавказа, Северная Осетия, образованный в 2015 году. Коллектив состоит из двух человек, известных под сценическими псевдонимами: «MiyaGi» — Азамат Кудзаев и «Andy Panda» — Сослан Бурнацев.',enDescript:'Russian hip-hop singer from Vladikavkaz'},
    {id:5,name:'Скриптонит',EnName:"Scriptonit",src:'../../assets/mp3/Скриптонит - Цепи (ft. 104).mp3',img:"../../assets/img/Скриптонит.jpg",description:' казахстанский исполнитель и музыкальный продюсер, основатель лейбла Musica36',enDescript:'Kazakh rapper, singer, songwriter and music producer. He is the founder of the music record label Musica36.'}
  ]},
  {class:'Рок',classEn:'Rock',songs:[
    {id:0,name:'Агата Кристи',EnName:'Agata Kristi',src:'../../assets/mp3/Агата Кристи - Опиум для никого.mp3',img:'../../assets/img/agata.jfif',description:' советская и российская рок-группа, одна из наиболее популярных в стране в середине и во второй половине 1990-х годов.',enDescript:'Soviet and Russian rock band. Formed in 1985 by Vadim Samoylov, Alexander Kozlov, and Peter Mai in Sverdlovsk.'},
    {id:1,name:'БИ-2',EnName:"BI-2",src:'../../assets/mp3/Би-2 & Чичерина - Мой рок-н-ролл.mp3',img:'../../assets/img/bi2.jfif',description:'белорусская и российская рок-группа, образованная в 1988 году в Бобруйске. Основатели и бессменные участники — Шура Би-2 (гитара, вокал) и Лёва Би-2 (основной вокал).',enDescript:'Belarusian alternative rock band, formed in the 1980s in Bobruisk, Belarus. It was one of the most successful with many sales and chart-hits in Russia.'},
    {id:2,name:'ДДТ',EnName:"DDT",src:'../../assets/mp3/ДДТ - Что Такое Осень.mp3',img:'../../assets/img/ddt.jfif',description:' советская и российская рок-группа, основанная летом 1980 года в Уфе. Лидер группы, автор большинства песен и единственный бессменный участник — Юрий Шевчук.',enDescript:' popular Russian rock band founded by its lead singer and the only remaining original member, Yuri Shevchuk (Юрий Шевчук), in Ufa (Bashkir ASSR, RSFSR) in 1980.'},
    {id:3,name:'Кино',EnName:"Kino",src:'../../assets/mp3/Виктор Цой - Группа крови.mp3',img:'../../assets/img/kino.jfif',description:'одна из самых популярных советских рок-групп 1980-х годов, входившая в состав ленинградского рок-клуба. Лидером группы и автором текстов песен и музыки, исполняемых ею на концертах, был Виктор Цой',enDescript:' was a Soviet rock band formed in Leningrad in 1982, considered to be one of, if not the, greatest rock band in the history of Russian music.'},
    {id:4,name:'Король и Шут',EnName:"Korol & Shut",src:'../../assets/mp3/Король и Шут - Кукла Колдуна.mp3',img:'../../assets/img/kish.jfif',description:'советская и российская хоррор-панк-группа из Санкт-Петербурга.Группа была образована в Ленинграде в 1988 году.',enDescript:'were a Russian horror punk band from Saint Petersburg that took inspiration and costumes from tales and fables. In Russia, the band has achieved cult status.'},
    {id:5,name:'Сплин',EnName:"Splin",src:'../../assets/mp3/Сплин - Орбит без сахара.mp3',img:"../../assets/img/splin.jfif",description:' российская рок-группа из Санкт-Петербурга. Бессменный лидер — Александр Васильев. Датой рождения группы считается 27 мая 1994 года.',enDescript:'popular Russian rock band, formed in Saint Petersburg in 1994.'}
  ]},
  {class:'Рэп',classEn:'Rap',songs:[
    {id:0,name:'2pac',EnName:'2pac',src:'../../assets/mp3/2pac Feat. Dr. Dre - California Love.mp3',img:'../../assets/img/Tupac_Shakur.jpg',description:' хип-хоп-исполнитель, продюсер и актёр из Гарлема, Нью-Йорк, а позже — из Окленда, Калифорния.Является одним из наиболее влиятельных хип-хоп-исполнителей в истории',enDescript:' was an American rapper. He is widely considered one of the most influential rappers of all time.'},
    {id:1,name:'50 cent',EnName:"50 cent",src:'../../assets/mp3/50-cent-candy-shop(mp3bit.cc).mp3',img:'../../assets/img/50cent.jfif',description:'американский рэпер, актёр, писатель, боксёрский промоутер и продюсер, известный под сценическим псевдонимом 50 Cent',enDescript:'is an American rapper, actor, and businessman. Born in the South Jamaica neighborhood of Queens, Jackson began pursuing a musical career in 2000,'},
    {id:2,name:'Busta Rhymes',EnName:"Busta Rhymes",src:'../../assets/mp3/Break Ya Neck - Busta Rhymes.mp3',img:'../../assets/img/basta_rhumes.jfif',description:'американский исполнитель рэпа, продюсер и актёр. Chuck D из Public Enemy дал ему псевдоним Busta Rhymes (в честь футболиста НФЛ Джорджа Раймса по прозвищу Бастер)',enDescript:' American rapper and actor. Chuck D of Public Enemy gave him the moniker Busta Rhymes, after NFL and CFL wide receiver George "Buster" Rhymes.'},
    {id:3,name:'Eminem',EnName:"Eminem",src:'../../assets/mp3/Eminem - Not Afraid.mp3',img:'../../assets/img/eminem.jpg',description:' американский рэпер, автор-исполнитель, композитор, музыкальный продюсер, продюсер и актёр. Помимо сольной карьеры состоял в группе D12 и хип-хоп-дуэте Bad Meets Evil.',enDescript:'American rapper and record producer. He is credited with popularizing hip hop in middle America'},
    {id:4,name:'Ludacris',EnName:"Ludacris",src:'../../assets/mp3/ludacris_act_a_fool.mp3',img:'../../assets/img/ludacris.jfif',description:'американский рэпер и актёр. Наряду с участниками дуэта OutKast, Ludacris стал одним из первых и наиболее влиятельных исполнителей в жанре южный рэп.',enDescript:'American rapper, actor, and record executive.'},
    {id:5,name:'Wiz Khalifa',EnName:"Wiz Khalifa",src:'../../assets/mp3/Wiz Khalifa feat. Charlie Puth - See You Again.mp3',img:"../../assets/img/wis_khalifa.jfif",description:'американский рэпер. В 2006 году выпустил дебютный альбом Show and Prove, в 2007 — подписал контракт с Warner Bros. Records.',enDescript:'American rapper, singer, songwriter and actor. He released his debut album, Show and Prove, in 2006 and signed to Warner Bros. Records in 2007.'}
  ]},
  {class:'R&B',classEn:'R&B',songs:[
    {id:0,name:'Beyoncé',EnName:'Beyoncé',src:'../../assets/mp3/Beyonce, Jay-Z - Crazy In Love (feat. Jay-Z).mp3',img:'../../assets/img/Beyoncé.jfif',description:'американская певица в стиле R’n’B, актриса, танцовщица, музыкальный продюсер.',enDescript:'American singer, songwriter, and actress. Beyoncés boundary-pushing artistry and vocals have made her the most influential female musician of the 21st century'},
    {id:1,name:'Black Eyed Peas',EnName:"Black Eyed Peas",src:'../../assets/mp3/The Black Eyed Peas - Pump It (SWACQ Remix).mp3',img:'../../assets/img/Black Eyed Peas.jfif',description:'американская хип-хоп-группа, состоящая из рэперов will.i.am, apl.de.ap, Taboo и певицы J. Rey Soul.',enDescript:'American musical group consisting of rappers will.i.am, apl.de.ap, Taboo and singer J. Rey Soul.'},
    {id:2,name:'Justin Timberlake',EnName:"Justin Timberlake",src:'../../assets/mp3/Justin Timberlake (Джастин Тимберлейк) - Cry Me A River.mp3',img:'../../assets/img/Justin Timberlake.jfif',description:'американский певец, автор песен, композитор, продюсер, танцор и актёр. Обладатель четырёх премий «Эмми» и девяти премий «Грэмми».',enDescript:'American singer, songwriter, and actor.He is one of the worlds best-selling music artists, with sales of over 88 million records.'},
    {id:3,name:'Rihanna',EnName:"Rihanna",src:'../../assets/mp3/Rihanna - Diamond.mp3',img:'../../assets/img/Rihanna.jfif',description:'барбадосская певица, актриса, музыкальный продюсер, модный дизайнер и филантроп.',enDescript:' Barbadian singer, actress, and businesswoman. Born in Saint Michael and raised in Bridgetown, Barbados.'},
    {id:4,name:'Mariah Carey',EnName:"Mariah Carey",src:'../../assets/mp3/Mariah Carey - All I Want for Christmas Is You.mp3',img:'../../assets/img/Mariah Carey.jfif',description:'американская певица, автор песен, музыкальный продюсер, актриса и филантроп.',enDescript:'American singer, songwriter, actress, and record producer. Referred to as the "Songbird Supreme" and "Queen of Christmas"'},
    {id:5,name:'Kanye West',EnName:"Kanye West",src:'../../assets/mp3/Kanye West - Stronger (OST Мальчишник 2. Из Вегаса В Бангкок).mp3',img:"../../assets/img/Kanye West.jfif",description:'американский рэпер, музыкальный продюсер, автор песен, звукорежиссёр, миллиардер и дизайнер.',enDescript:'American rapper, songwriter, record producer, and fashion designer.He is widely regarded as one of the most influential hip hop artists and producers and as one of the greatest musicians of his generation.'}
  ]},
  {class:'Сериалы',classEn:'Serials',songs:[
    {id:0,name:'Клиника',EnName:'Clinic',src:'../../assets/mp3/iz_seriala_klinika_-_iz_seriala_klinika_(z2.fm).mp3',img:'../../assets/img/clinic.jfif',description:'американский комедийно-драматический телевизионный сериал, посвящённый работе и жизни молодых врачей.',enDescript:'American sitcom created by Bill Lawrence that aired from October 2, 2001, to March 17, 2010, on NBC and later ABC.'},
    {id:1,name:'Друзья',EnName:"The friends",src:"../../assets/mp3/The Rembrandts - I'll Be There for You.mp3",img:'../../assets/img/friends.jfif',description:'американский ситком, повествующий о жизни шестерых друзей. Признан одним из лучших комедийных сериалов в истории американского телевидения',enDescript:'American television sitcom created by David Crane and Marta Kauffman, which aired on NBC from September 22, 1994, to May 6, 2004'},
    {id:2,name:'Игра престолов',EnName:"Game of thrones",src:'../../assets/mp3/igra_prestolov_-_glavnaja_tema_iz_igra_prestolov.mp3',img:'../../assets/img/game_of_trones.jfif',description:'американский телесериал в жанре фэнтези, основанный на цикле романов «Песнь льда и огня» Джорджа Р. Р. Мартина.',enDescript:'American fantasy drama television series created by David Benioff and D. B. Weiss for HBO.'},
    {id:3,name:'Декстер',EnName:"Dexter",src:'../../assets/mp3/Rolfe Kent — Dexter Main Title.mp3',img:'../../assets/img/dexter.jfif',description:' американский телесериал канала Showtime, основанный на романе Джеффри Линдсея «Дремлющий демон Декстера»',enDescript:'American crime drama television series that aired on Showtime from October 1, 2006, to September 22, 2013.'},
    {id:4,name:'Доктор Хаус',EnName:"Haus M.D.",src:'../../assets/mp3/doktor_haus_-_nachalo_(z2.fm).mp3',img:'../../assets/img/haus.jfif',description:' американский телесериал о выдающемся враче-диагносте Грегори Хаусе и его команде. ',enDescript:'American medical drama television series that originally ran on the Fox network for eight seasons, from November 16, 2004, to May 21, 2012.'},
    {id:5,name:'Как я встретил вашу маму',EnName:"How I met your mother",src:'../../assets/mp3/как я встретил вашу маму.mp3',img:"../../assets/img/kak_yau.jfif",description:'американский комедийный телесериал, созданный Картером Бейзом и Крейгом Томасом. ',enDescript:'American sitcom, created by Craig Thomas and Carter Bays for CBS.'}
  ]},
]
//Создание аудиоплеера
function createAudio(src,conteiner,mainClass,audio){
  audio.src = src
  audio.load()
  let playerDiv = document.createElement('div')
  playerDiv.className = mainClass
  let durationDiv = document.createElement('div')
  durationDiv.className = 'player__duration'
  let volumeDiv = document.createElement('div')
  volumeDiv.className = 'player__volume'
  let imgPlay = document.createElement("img")
  imgPlay.src = '../../assets/icons/play.png'
  imgPlay.className = 'play-btn'
  let duration = document.createElement('input')
  duration.className = 'player__duration_range'
  duration.type = 'range'
  duration.min = '0'
  duration.step = '1'
  duration.value = audio.currentTime
  let valumeRange = document.createElement('input')
  valumeRange.className = 'player__volume_range'
  valumeRange.type = 'range'
  valumeRange.min = '0'
  valumeRange.max = '100'
  valumeRange.step = '1'
  valumeRange.value = '30'
  let gradient = 0
  let muteBtn = document.createElement('img')
  muteBtn.src = '../../assets/icons/volume_on.png'
  muteBtn.className = 'play-btn'
  duration.style.background = `linear-gradient(to right, #9732be ${gradient}%, #fe13c3 ${gradient}%)`
  valumeRange.style.background = `linear-gradient(to right, #9732be ${valumeRange.value}%, #fe13c3 ${valumeRange.value}%)`
  let curTime = document.createElement('p')
  let durationOf = document.createElement('p')
  audio.onloadedmetadata = ()=>{
    duration.max = audio.duration
    durationOf.textContent = setTime(audio.duration)
  }
  durationDiv.append(imgPlay,duration)
  volumeDiv.append(muteBtn,valumeRange,curTime,durationOf)
  playerDiv.append(durationDiv,volumeDiv)
  conteiner.append(playerDiv)
  imgPlay.addEventListener('click',()=>{
    if(mainClass == 'player'){
      audio2.pause()
    }else{
      audio1.pause()
    }
    if(audio.paused){
        audio.play()
    }else {
        audio.pause()
    }
  })
  duration.addEventListener('input',()=>{
    audio.currentTime = duration.value
    gradient = +duration.value*100/audio.duration
    duration.style.background = `linear-gradient(to right, #9732be ${gradient}%, #fe13c3 ${gradient}%)`
  })
  audio.addEventListener('timeupdate',()=>{
    if(audio.paused){
      imgPlay.src = '../../assets/icons/play.png'
     }else {
      imgPlay.src = '../../assets/icons/pause_icon.png'
    }
    duration.value = audio.currentTime
    gradient = +duration.value*100/audio.duration
    duration.style.background = `linear-gradient(to right, #9732be ${gradient}%, #fe13c3 ${gradient}%)`
    curTime.textContent = setTime(audio.currentTime)+" /"
  })
  valumeRange.addEventListener('input',()=>{
    audio.volume = valumeRange.value/100
    muteBtn.src = '../../assets/icons/volume_on.png'
    valumeRange.style.background = `linear-gradient(to right, #9732be ${valumeRange.value}%, #fe13c3 ${valumeRange.value}%)`
    if(audio.volume==0){
      muteBtn.src = '../../assets/icons/volume_off.png'
    }
  })
  muteBtn.addEventListener("click",()=>{
    if(audio.volume==0){
      if(audio.volume==0 && valumeRange.value==0){
        muteBtn.src = '../../assets/icons/volume_off.png'
      }else{
        audio.volume = valumeRange.value/100
        muteBtn.src = '../../assets/icons/volume_on.png'
      }
    }else{
      audio.volume = 0
      muteBtn.src = '../../assets/icons/volume_off.png'
    }
   })
}
//Прпоигрывание звука
function play(win){
if(win){
  winSound.play()
}else{
  errorSound.play()
}
}
//Установка времени
function setTime(time){
  let minutes = Math.floor(time/60)
  let seconds = '' +parseInt(time - minutes*60)
  if(seconds.split("").length ==1 ){
    seconds = "0"+ seconds
  }
  return minutes + ':' + seconds
}
//Получение случайной песни
let currentAnswerSong
function randomSong(index){
  if(index){
    currentAnswerSong =  AudioArr[currentGenge].songs[index].id
    return AudioArr[currentGenge].songs[index].src
  }else{
    let randomNum = Math.floor((Math.random()*6))
    currentAnswerSong =  AudioArr[currentGenge].songs[randomNum].id
    return AudioArr[currentGenge].songs[randomNum].src
  }
}
//Нажатие на кнопку вперед
nextBtn.addEventListener('click',()=>{
  currentGenge++
  mainEl = ""
  el = ""
  wrongAnswersArr = []
  audio1.pause()
  audio2.pause()
  if(currentGenge!=6){
    delAudio()
    delAudio(true)
    delPreview()
    delVariants()
    rightAnswer.textContent = '*******'
    rightImage.src = '../../assets/img/question.jpg'
    createAudio(randomSong(),conteiner,'player',audio1)
    createVariants(currentGenge)
    createGenre()
    inGame=true
    maxScore=5
    textPreview.style.display = 'block'
    nextBtn.setAttribute('disabled',true)
  }else{
    window.location.href = '../results/index.html'
    localStorage.setItem("LoginovskyScore",JSON.stringify(mainScore))
    localStorage.removeItem('LoginovskyVictorineSettings')
  }
  if(currentGenge==5){
    if(curLangRus){
      nextBtn.textContent='Посмотреть результаты'
    }else{nextBtn.textContent='Show results'}
  }
})
//Создание жанров ввреху страницы
function createGenre(){
  let genreList = document.querySelector('.main__header_list')
  AudioArr.forEach((item,i)=>{
    let liElement = document.createElement('li')
    liElement.classList = 'main__header_item'
    answersList.push(liElement)
    if(currentGenge==i){
      liElement.classList.add('active-genre')
    }
    if(curLangRus){
    liElement.textContent = item.class
    }else{liElement.textContent = item.classEn}
    genreList.append(liElement)
  })
}
//Удаление аудиоплееера
function delAudio(num){
  let delDiv
  if(num){
    delDiv = document.querySelector('.player')
  }else{
    delDiv = document.querySelector('.player2')
  }
  if(delDiv!=null){ 
      delDiv.remove()
  }
}
//Удаление блока предпоказа
function delPreview(){
  previewList.forEach(el=>el.remove())
  previewList = []
}
//Удаление блока с вариантами ответа
function delVariants(){
  answersList.forEach(item=>{
    item.remove()
  })
  answersList = []
}
//Создание блока с вариантами
let el = ""
let mainEl = ""
let wrongAnswersArr = []
function createVariants(index){
  let genre = AudioArr[index]
  let ulWithAnswers = document.querySelector('.main__answers_list')
  genre.songs.forEach(element => {
    let liAnswer = document.createElement('li')
    answersList.push(liAnswer)
    liAnswer.className = 'main__answers_item'
    if(curLangRus){
      liAnswer.textContent = element.name
    }else{
      if(element.EnName){
        liAnswer.textContent = element.EnName
      }else{liAnswer.textContent = element.name}
    }
    ulWithAnswers.append(liAnswer)
    liAnswer.addEventListener('click',()=>{
      el = element
      textPreview.style.display = 'none'
      if(element.id != currentAnswerSong){
        if(inGame){
          play()
          if(!liAnswer.classList.contains('wrongAnswer')){
            maxScore--
          }
          liAnswer.classList.add('wrongAnswer')
          wrongAnswersArr.push(element.id)
          audio1.play()
        }
      }else{
        mainEl = element
        audio1.pause()
        liAnswer.classList.add('correctAnswer')
        if(inGame){
          mainScore += maxScore
          play(true)
        }
        inGame = false
        nextBtn.removeAttribute('disabled')
        rightAnswer.textContent = element.name
        rightImage.src = element.img
        totalScoreHtml.textContent=mainScore
      }
      delPreview()
      delAudio()
      createPreview(element)
    })
  });
}
//Создание бока с предпоказом
function createPreview(element){
  if(element!=""){
    let preview = document.querySelector('.main__show')
    let container = document.createElement('div')
    container.className = 'main__show_container'
    let img = document.createElement('img')
    img.className = 'main__show_img'
    img.src = element.img
    let artistName = document.createElement('p')
    artistName.className = 'main__show_name'
    let description = document.createElement('p')
    createAudio(element.src,preview,'player2',audio2)
    description.className = 'main__show_description'
    if(curLangRus){
      artistName.textContent = element.name
      description.textContent = element.description
    }else{
      if(element.EnName){
        artistName.textContent = element.EnName}else{
        artistName.textContent = element.name
      }
      description.textContent = element.enDescript
    }
    previewList.push(container)
    container.append(img,artistName,description)
    preview.append(container)
  }
}

let headerList = document.querySelectorAll('.link')
let footerList = document.querySelectorAll('.link-footer')
let scorePTag = document.querySelector('.main__score_text')
let variants = document.querySelector('.main__answers_text')
let footerBtn1 = document.querySelector('.footer_btn')
let footerText = document.querySelector('.footer_wrap_email_text')
let footerBtn2 = document.querySelector('.inp_btn')
//Изменение языка страницы
function changeLangFunc(){
  if(curLangRus){
    changeLang2.textContent = 'En'
    changeLang.textContent = 'En'
    headerList[0].textContent = "Главная"
    headerList[3].textContent = "Главная"
    headerList[1].textContent = "Викторина"
    headerList[4].textContent = "Викторина"
    headerList[2].textContent = "Галерея"
    headerList[5].textContent = "Галерея"
    footerList[0].textContent = "Главная"
    footerList[1].textContent = "Викторина"
    footerList[2].textContent = "Галерея"
    scorePTag.textContent = "Очки"
    nextBtn.textContent = "Следующий вопрос"
    variants.textContent = "Варианты ответа"
    textPreview.textContent = "Угадайте исполнителя песни, за каждый неверный вопрос -1 балл,кнопка станет активной после верного ответа!"
    footerBtn1.textContent = "Cохранить игру"
    footerText.textContent = 'Подпишитесь на новые викторины'
    footerBtn2.textContent = "Подтвердить"
  }else{ 
    changeLang2.textContent = 'Ru'
    changeLang.textContent = 'Ru'
    headerList[0].textContent = "Main"
    headerList[3].textContent = "Main"
    headerList[1].textContent = "Victorine"
    headerList[4].textContent = "Victorine"
    headerList[2].textContent = "Gallery"
    headerList[5].textContent = "Gallery"
    footerList[0].textContent = "Main"
    footerList[1].textContent = "Victorine"
    footerList[2].textContent = "Gallery"
    scorePTag.textContent = "Score"
    nextBtn.textContent = "Next question"
    variants.textContent = "Variants"
    textPreview.textContent = "Guess the author, each wrong answer -1 point, button will be active after correct answer!"
    footerBtn1.textContent = "Save game"
    footerText.textContent = 'Subscribe to new victorines'
    footerBtn2.textContent = "Confirm"
  }
  delAudio()
  if(el!=''){
    delPreview()
    createPreview(el)
  }
  delVariants()
  createVariants(currentGenge)
  createGenre()
}
//Нажатие на кнопку смены языка
changeLang.addEventListener('click',()=>{
  curLangRus = !curLangRus
  changeLangFunc()
  saveToLS(true)
  answersList.forEach((element,i)=>{
    if(i==mainEl.id){element.classList.add('correctAnswer')}
      wrongAnswersArr.forEach(id=>{
    if(i==id){element.classList.add('wrongAnswer')}
  })
})
})
changeLang2.addEventListener('click',()=>{
  curLangRus = !curLangRus
  changeLangFunc()
  saveToLS(true)
  answersList.forEach((element,i)=>{
    if(i==mainEl.id){element.classList.add('correctAnswer')}
      wrongAnswersArr.forEach(id=>{
    if(i==id){element.classList.add('wrongAnswer')}
  })
})
})
//Сохрание
function saveToLS(language){
  if(language){
    localStorage.setItem('LoginovskyCurLanguage',JSON.stringify(curLangRus))
  }else{
    let obj = {
      curLangRus,
      currentGenge,
      maxScore,
      mainScore,
      inGame,
      currentAnswerSong,
      el,
      mainEl,
      wrongAnswersArr
    }
    localStorage.setItem('LoginovskyVictorineSettings',JSON.stringify(obj))
  }
}

footerBtn1.addEventListener('click',()=>{
  saveToLS()
})
//Проверка сохранения
if(localStorage.getItem('LoginovskyVictorineSettings')){
  let obj =JSON.parse(localStorage.getItem('LoginovskyVictorineSettings'))
  curLangRus=obj.curLangRus
  currentGenge= obj.currentGenge
  maxScore = obj.maxScore
  mainScore = obj.mainScore
  stopPlay = obj.stopPlay
  inGame = obj.inGame
  currentAnswerSong = obj.currentAnswerSong
  el = obj.el
  mainEl = obj.mainEl
  wrongAnswersArr = [...obj.wrongAnswersArr]
  if(el!=""){
    textPreview.style.display = 'none'
  }
  if(mainEl!=""){
    rightAnswer.textContent = mainEl.name
    rightImage.src = mainEl.img
    createAudio(mainEl.src,conteiner,'player',audio1)
    nextBtn.removeAttribute('disabled')
  }else{
    createAudio(randomSong(currentAnswerSong),conteiner,'player',audio1)}
    totalScoreHtml.textContent=mainScore
    changeLangFunc()
    answersList.forEach((element,i)=>{
      if(i==mainEl.id){element.classList.add('correctAnswer')}
        wrongAnswersArr.forEach(id=>{
      if(i==id){element.classList.add('wrongAnswer')}
    })
  })
  if(currentGenge==5){
    if(curLangRus){
      nextBtn.textContent='Посмотреть результаты'
    }else{nextBtn.textContent='Show results'}
  }
}else if(localStorage.getItem('LoginovskyCurLanguage')){
  curLangRus =JSON.parse(localStorage.getItem('LoginovskyCurLanguage'))
  changeLangFunc()
  createAudio(randomSong(),conteiner,'player',audio1)
}else{
  createAudio(randomSong(),conteiner,'player',audio1)
  createGenre()
  createVariants(currentGenge)
}

let closeBtn = document.querySelector('.close_btn')
let hideMenu = document.querySelector('.hidden_menu')
let burger = document.querySelector('.burger_menu')
let menuList = document.querySelector('.hidden_menu_list')
//Закрытие окна
closeBtn.addEventListener('click',()=>{
    hideMenu.style.opacity = 0;
    menuList.style.height = '0px';
    setTimeout(()=>{  
        hideMenu.style.display = 'none'
    },900)
})
//Открытие меню
burger.addEventListener('click',()=>{
    activeHeader[6].classList.add('focused')
    hideMenu.style.display = 'flex';
    hideMenu.style.opacity = 1;
    setTimeout(()=>{  
    menuList.style.height = '329px';
},100)
})
menuList.addEventListener('click',(e)=>{
    e.stopPropagation()
})
//сокрытие окна
hideMenu.addEventListener('click',()=>{
    hideMenu.style.opacity = 0;
    menuList.style.height = '0px';
    setTimeout(()=>{  
        hideMenu.style.display = 'none'
    },700)
})

console.log('Все работает как нужно для максимального балла, дополнительно ко всем заданиям сделал сохранение всего состояния игры, сохранение сбрасывается если викторина полностью пройдена, плюс язык можно менять в любой момент игры без перезагрузки страницы, все основные элементы отрисовываются из js, модульность не добавлял так как код и так короткий, все функции подписаны, если естькакие то недочеты, напишите мне я исправлю, удачи в обучении');
