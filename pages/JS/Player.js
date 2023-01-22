export default function createAudio(src,conteiner,mainClass,audio){
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
    valumeRange.className = 'valueRange'
    valumeRange.type = 'range'
    valumeRange.min = '0'
    valumeRange.max = '100'
    valumeRange.step = '1'
    valumeRange.value = '30'
    let muteBtn = document.createElement('img')
    muteBtn.src = '../../assets/icons/volume_on.png'
    muteBtn.className = 'play-btn'
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
          imgPlay.src = '../../assets/icons/play.png'
      }else {
        imgPlay.src = '../../assets/icons/pause_icon.png'
          audio.pause()
      }
    })
    duration.addEventListener('input',()=>{
      audio.currentTime = duration.value
    })
    audio.addEventListener('timeupdate',()=>{
      duration.value = audio.currentTime
      curTime.textContent = setTime(audio.currentTime)+ " /"
    })
    valumeRange.addEventListener('input',()=>{
      audio.volume = valumeRange.value/100
    })
    muteBtn.addEventListener("click",()=>{
      if(audio.volume==0){
          audio.volume = valumeRange.value/100
          muteBtn.src = '../../assets/icons/volume_on.png'
      }else {
        audio.volume = 0
        muteBtn.src = '../../assets/icons/volume_off.png'
      }
     })
  }