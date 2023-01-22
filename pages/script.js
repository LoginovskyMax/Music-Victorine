let container = document.createElement('div')
let playCheck = true
let inGame = false
let counterMoves = 0
let timer = '00:00'
let seconds = 0
let minutes = 0
let sizeNumber = 4
container.classList.add('container')
document.body.append(container)
let btnsDiv = document.createElement('div')
btnsDiv.classList.add('btns_div')
let startBtn = document.createElement('button'),
stopBtn = document.createElement('button'),
saveBtn = document.createElement('button'),
continueBtn = document.createElement('button'),
easyBtn = document.createElement('button'),
resultsBtn = document.createElement('button');
let activeZone = document.createElement('div')
activeZone.classList.add('btns_div')
let moves,time,Id
let fieldSize = document.createElement('div')
fieldSize.classList.add('sizes')
let label3 = document.createElement('label')
let radio3 = document.createElement('input')
let label4 = document.createElement('label')
let radio4 = document.createElement('input')
let label5 = document.createElement('label')
let radio5 = document.createElement('input')
let label6 = document.createElement('label')
let radio6 = document.createElement('input')
let label7 = document.createElement('label')
let radio7 = document.createElement('input')
let label8 = document.createElement('label')
let radio8 = document.createElement('input')
let currentSizeText = document.createElement('p')
let soundImage = document.createElement('img')
container.prepend(btnsDiv,activeZone)
container.after(currentSizeText)
container.after(fieldSize)
let radioArr = []
let labelArr = []
let media1 = window.matchMedia('(min-width: 1281px)')
let media2 = window.matchMedia('(min-width: 769px) and (max-width: 1280px)')
let media3 = window.matchMedia('(min-width: 320px) and (max-width: 450px)')
let media4 = window.matchMedia('(min-width: 451px) and (max-width: 768px)')


//функция создания радиокнопок
function createRadio(element,value,name,element2,text){
    element.setAttribute('type','radio')
    element.setAttribute('name',name)
    element.setAttribute('value',value)
    element.classList.add('radio')
    radioArr.push(element)
    element2.textContent = text
    element2.classList.add('label')
    element2.append(element)
    labelArr.push(element2)
    fieldSize.append(element2)
}
createRadio(radio3,3,'size',label3,'3x3')
createRadio(radio4,4,'size',label4,'4x4')
createRadio(radio5,5,'size',label5,'5x5')
createRadio(radio6,6,'size',label6,'6x6')
createRadio(radio7,7,'size',label7,'7x7')
createRadio(radio8,8,'size',label8,'8x8')

//отрисовка блока с размерами окон
function drawCurrentSize(){
   let curRadio = radioArr.find(item=>item.checked)
   soundImage.classList.add('sound_img')
   if(playCheck){
    soundImage.src = './assets/volume_on.png'
    }else{ soundImage.src = './assets/volume_off.png'}
   fieldSize.append(soundImage)
   currentSizeText.classList.add('text_size')
   currentSizeText.textContent = 'Размер рамки : ' + curRadio.parentNode.textContent
   fieldSize.before(currentSizeText)
}

//отрисовка блока с тааймером
function printTimer(){
    time = document.createElement('p')
    time.textContent = 'Время:' + timer
    activeZone.append(time)
}
//отрисовка блока с ходами
function printMoves(){
    moves = document.createElement('p')
    moves.textContent = 'Ходы:' + counterMoves
    activeZone.prepend(moves)
}

//функция задавания стилей для кнопок
function createBtn(element,text){
    element.classList.add('button')
    element.textContent = text
    btnsDiv.append(element)
}
createBtn(startBtn,'Shafle & Start')
createBtn(stopBtn,'Stop')
createBtn(continueBtn,'Continue')
createBtn(saveBtn,'Save')
createBtn(resultsBtn,'Results')
createBtn(easyBtn,'Easy mode')


let numbers = []
//создание массива с числами необходимымыи для игры
function createNumbersArr(sizeNumber){
    if(numbers.length>0){numbers=[]}
    for(let i = 0;i<sizeNumber*sizeNumber;i++){
        numbers.push(i)
    }
}

//создание массива для проверки условия победы
let winArr = []
function createWinArr(){
    if(winArr.length>0){winArr=[]}
    let newNumArr = [...numbers]
    let [first] = newNumArr.splice(0,1)
       newNumArr.push(first)
       for(let i=0;i<sizeNumber;i++){
        let arr = []
        for(let j=0;j<sizeNumber;j++){
         arr.push(newNumArr[j])
        }
        newNumArr.splice(0,sizeNumber)
        winArr.push(arr)
}
}

//создание массива с подмассивами из случайных чисел
let square = []
function createSquareArr(easy){
    let newNumArr = [...numbers]
    if(!easy){
    if(square.length>0){square=[]}
    let checkArr = []
    let rowofNull = 0
    for(let i=0;i<sizeNumber;i++){
        let arr = []
        for(let j=0;j<sizeNumber;j++){
         let random = Math.floor(Math.random() * (Math.floor(newNumArr.length) - 1)) + 0
         arr.push(newNumArr[random])
         if(newNumArr[random]==0){rowofNull=i+1}
         if(newNumArr[random]!=0){checkArr.push(newNumArr[random])}
         newNumArr.splice(random,1)
        }
        square.push(arr)
     }
     let counter = 0
     for(let i=0;i<checkArr.length;i++){
        for (let j = i+1 ; j < checkArr.length; j++) {
             if(checkArr[i]>checkArr[j]){counter++}
        }
     }
     if(sizeNumber%2==0){ counter+=rowofNull}
     if(counter%2!=0){createSquareArr()}
     } else {
       if(square.length>0){square=[]}
       let [first] = newNumArr.splice(0,1)
       let [last] = newNumArr.splice(newNumArr.length-1,1)
       newNumArr.push(first)
       newNumArr.push(last)
       for(let i=0;i<sizeNumber;i++){
        let arr = []
        for(let j=0;j<sizeNumber;j++){
         arr.push(newNumArr[j])
        }
        newNumArr.splice(0,sizeNumber)
        square.push(arr)
     }
     }
}

let field
let squareDiv = []
let cellWidth = 100
if(media2.matches && sizeNumber>6){cellWidth=70}
if(media3.matches && sizeNumber>5){cellWidth=30}
if(media3.matches && sizeNumber<5){cellWidth=50}
if(media3.matches && sizeNumber==8){cellWidth=25}
if(media4.matches && sizeNumber>5){cellWidth=45}
if(media4.matches && sizeNumber==8){cellWidth=45}
//Изменение размера ячеек при изменении
window.addEventListener('resize',()=>{
if(media1.matches){cellWidth=100}
if(media2.matches && sizeNumber>6){cellWidth=70}
if(media3.matches && sizeNumber>5){cellWidth=30}
if(media3.matches && sizeNumber<5){cellWidth=50}
if(media3.matches && sizeNumber==8){cellWidth=25}
if(media4.matches && sizeNumber>5){cellWidth=45}
if(media4.matches && sizeNumber==8){cellWidth=45}
moves.remove()
printMoves()
field.remove()
createSquare()
getActiveCell()
replaceCell(activeCellArr)                
},false)

//создание поля для игры со случайными числами
function createSquare() {
    if(squareDiv.length>0){squareDiv=[]}
    if(media1.matches){cellWidth=100}
    if(media2.matches && sizeNumber>6){cellWidth=70}
    if(media2.matches && sizeNumber<6){cellWidth=100}
    if(media3.matches && sizeNumber>5){cellWidth=30}
    if(media3.matches && sizeNumber<5){cellWidth=50}
    if(media3.matches && sizeNumber==8){cellWidth=25}
    if(media4.matches && sizeNumber>5){cellWidth=50}
    if(media4.matches && sizeNumber<5){cellWidth=70}
    if(media4.matches && sizeNumber==8){cellWidth=45}
    field = document.createElement('div')
    field.classList.add('field')
    field.style.width = (cellWidth+10)*sizeNumber +'px'
    square.forEach(item=>{
        item.forEach(cellNum=>{
            let cell = document.createElement('div')
            cell.style.width = cellWidth+'px'
            cell.style.height = cellWidth+'px'
            cell.classList.add('cell')
            if(cellNum==0){
                cell.textContent = ''
                cell.style.opacity = 0
            }else{
                cell.textContent = cellNum
            }
            field.append(cell)
            squareDiv.push(cell)
        })
    })
    container.append(field)
}
//Получение отдельной ячейке из масссива с дивами
function getFromNodeList(index){
    let item = squareDiv.find(item=>item.textContent==index)
    return item
}
//Получение активных ячеек, на которые можно кликать
let activeCellArr = []
function getActiveCell(){
    if(activeCellArr.length>0){activeCellArr=[]}
    square.forEach((item,i,arr2)=>{
        item.forEach((cell,j)=>{
            if(cell==0){
                if( arr2[i][j+1]!=undefined){
                    let activeCell = getFromNodeList(arr2[i][j+1])
                    activeCell.classList.add('active')
                    activeCell.classList.add('left')
                    activeCell.setAttribute('draggable',true)
                    activeCellArr.push(activeCell)
                }
                if( arr2[i][j-1]!=undefined){
                    let activeCell = getFromNodeList(arr2[i][j-1])
                    activeCell.classList.add('active')
                    activeCell.classList.add('right')
                    activeCell.setAttribute('draggable',true)
                    activeCellArr.push(activeCell)
                }
                if(arr2[i+1]!=undefined){
                    let activeCell = getFromNodeList(arr2[i+1][j])
                    activeCell.classList.add('active')
                    activeCell.classList.add('bottom')
                    activeCell.setAttribute('draggable',true)
                    activeCellArr.push(activeCell)
               }
                if(arr2[i-1]!=undefined){
                    let activeCell = getFromNodeList(arr2[i-1][j])
                    activeCell.classList.add('active')
                    activeCell.classList.add('top')
                    activeCell.setAttribute('draggable',true)
                    activeCellArr.push(activeCell)
               }
            }
        })
    })
}

//функция воспроизведения звука при перетасовке
function playSound(boolean){
    const sound = new Audio()
    sound.src = './assets/bumaga_sound.mp3'
    sound.autoplay = boolean
}

let bestResultsArr = []
//функция условия победы
function winCheck(){
    createWinArr()
    let win = square.every((value,i)=>value.every((num,j)=>num==winArr[i][j]))
    if(win){ 
        let modal = document.createElement('div')
        modal.classList.add('modal')
        let modalInfo = document.createElement('div')
        modalInfo.classList.add('modal_info')
        modalInfo.textContent ='Поздравляем с победой!'
        let winText = document.createElement('p')
        let closeBtn = document.createElement('button')
        closeBtn.textContent = 'X'
        closeBtn.classList.add('close_btn')
        winText.classList.add('win_text')
        winText.textContent = `Количество ходов : ${counterMoves}  Время прохождения : ${timer}`
        let obj = {
            counterMoves,timer
        }
        if(bestResultsArr.length==10){
               for(let i = 9;i>0;i--){
                if(bestResultsArr[i].counterMoves>obj.counterMoves){
                    bestResultsArr.splice(i,1,obj)
                    break
                }
               }
        }else{bestResultsArr.push(obj)}
        bestResultsArr.sort((a,b)=>a.counterMoves-b.counterMoves)
        localStorage.setItem('loginovsky_max_listOfBest',JSON.stringify(bestResultsArr))
        modalInfo.append(winText,closeBtn)
        modal.append(modalInfo)
        setTimeout(()=>modalInfo.style.height = '250px')
        document.body.append(modal)
        modalInfo.addEventListener('click',(e)=>{
                e.stopPropagation()
        })
        modal.addEventListener('click',()=>{
            modal.remove()
            Reshufle()
        })
        closeBtn.addEventListener('click',()=>{
            modal.remove()
            Reshufle()
        })
    }
}

//функция для замены активной ячейки но пустую ячейку
function replaceCell(arr){
    if(inGame){
    arr.forEach(item=>{
        item.addEventListener('dragstart',()=>{
            getFromNodeList(0).addEventListener('dragover',(e)=>{
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move';
            })
            getFromNodeList(0).addEventListener('drop',(e)=>{
                counterMoves++
                playSound(playCheck)
                e.stopPropagation()
                for(let i = 0;i<square.length;i++){
                  for(let j=0;j<square[i].length;j++){
                      if(square[i][j]==0){
                          square[i][j] = item.textContent
                      }else if(square[i][j]==item.textContent){
                        if(item.className == 'cell active left'){
                            item.style.transform = `translateX(-${cellWidth+10}px)`
                           }
                           if(item.className == 'cell active right'){
                            item.style.transform = `translateX(${cellWidth+10}px)`
                           }
                           if(item.className == 'cell active bottom'){
                            item.style.transform = `translateY(-${cellWidth+10}px)`
                           }
                           if(item.className == 'cell active top'){
                            item.style.transform = `translateY(${cellWidth+10}px)`
                           }
                          square[i][j] = 0
                      }
                  }
                }
                winCheck()
                setTimeout(()=>{
                  moves.remove()
                  printMoves()
                  field.remove()
                  createSquare()
                  getActiveCell()
                  replaceCell(activeCellArr)
                },600)
            })
        })
        item.addEventListener('click',()=>{
          playSound(playCheck)
            if(item.className == 'cell active left'){
                item.style.transform = `translateX(-${cellWidth+10}px)`
               }
               if(item.className == 'cell active right'){
                item.style.transform = `translateX(${cellWidth+10}px)`
               }
               if(item.className == 'cell active bottom'){
                item.style.transform = `translateY(-${cellWidth+10}px)`
               }
               if(item.className == 'cell active top'){
                item.style.transform = `translateY(${cellWidth+10}px)`
               }
          counterMoves++
          for(let i = 0;i<square.length;i++){
            for(let j=0;j<square[i].length;j++){
                if(square[i][j]==0){
                    square[i][j] = parseFloat(item.textContent) 
                }else if(square[i][j]==item.textContent){
                    square[i][j] = 0
                }
            }
          }
          winCheck()
          setTimeout(()=>{
            field.remove()
            moves.remove()
            printMoves()
            createSquare()
           
            getActiveCell()
            replaceCell(activeCellArr)
          },600)
        })
    })
  }
}
//кнопка решафла и начала игры
function Reshufle(){
    squareDiv.forEach(item=>{
        item.style.transform = 'rotateY(360deg)'
    })
    playSound(playCheck)
    minutes = 0
    seconds = 0
    timer = '00:00'
    counterMoves = 0
    moves.remove()
    printMoves()
    clearInterval(Id)
        setTimeout(()=>{
            createSquareArr()
            field.remove()
            createSquare()
            getActiveCell()
            replaceCell(activeCellArr)
        },500)
        inGame = true
        Id = setInterval(()=>{
        time.remove()
        printTimer()
        seconds++
        if(seconds<10 && minutes<10){
            timer = `0${minutes}:0${seconds}`
        }else if(minutes<10 && seconds>=10){
            timer = `0${minutes}:${seconds}`}else if(minutes>=10 && seconds<10){
                timer = `${minutes}:0${seconds}`
             }
        if(seconds>=59){
            seconds=-1
            minutes++
        }
        
     },1000)
}
startBtn.addEventListener('click',()=>{
    Reshufle()
})
//кнопка паузы
stopBtn.addEventListener('click',()=>{
    clearInterval(Id)
    inGame = false
    field.remove()
    moves.remove()
    printMoves()
    createSquare()
    getActiveCell()
    replaceCell(activeCellArr)
 })
//кнопка снятия с паузы
 continueBtn.addEventListener('click',()=>{
    if(!inGame){
        inGame = true
        field.remove()
        moves.remove()
        printMoves()
        createSquare()
        getActiveCell()
        replaceCell(activeCellArr)
        Id = setInterval(()=>{
            time.remove()
            seconds++
            if(seconds<10 && minutes<10){
                timer = `0${minutes}:0${seconds}`
            }else if(minutes<10 && seconds>=10){
                timer = `0${minutes}:${seconds}`}else if(minutes>=10 && seconds<10){
                    timer = `${minutes}:0${seconds}`
                 }
            if(seconds>=59){
                seconds=-1
                minutes++
            }
            printTimer()
         },1000)
    }
})
//rкнопка сохранения данных в localStorage
saveBtn.addEventListener('click',()=>{
    let saveObj ={seconds,minutes,timer,counterMoves,square,sizeNumber,playCheck}
    localStorage.setItem('loginovsky_max_game',JSON.stringify(saveObj))
})
//изменение размеров поля для игры
radioArr.forEach((radio,i)=>{
    radio.addEventListener('change',()=>{
    labelArr.forEach(item=>item.classList.remove('focus'))
    labelArr[i].classList.add('focus')
    sizeNumber = radio.value
    playSound(playCheck)
    createNumbersArr(sizeNumber)
    minutes = 0
    seconds = 0
    timer = '00:00'
    counterMoves = 0
    squareDiv.forEach(item=>{
        item.style.transform = 'rotateY(360deg)'
    })
    setTimeout(()=>{
        moves.remove()
        time.remove()
        printMoves()
        printTimer()
        drawCurrentSize()
        clearInterval(Id)
        field.remove()
        createSquareArr()
        createSquare()
    },500)
    })
})
//отключение и включение звука
soundImage.addEventListener('click',()=>{
    playCheck = !playCheck
    if(playCheck){
        soundImage.src = './assets/volume_on.png'
    }else{ soundImage.src = './assets/volume_off.png'}
})
//изменение поля для 1 хода до победыф
easyBtn.addEventListener('click',()=>{
    squareDiv.forEach(item=>{
        item.style.transform = 'rotateY(360deg)'
    })
    playSound(playCheck)
    minutes = 0
    seconds = 0
    timer = '00:00'
    counterMoves = 0
    moves.remove()
    printMoves()
    clearInterval(Id)
        setTimeout(()=>{
            createSquareArr(true)
            field.remove()
            createSquare()
            getActiveCell()
            replaceCell(activeCellArr)
        },500)
        inGame = true
        Id = setInterval(()=>{
        time.remove()
        printTimer()
        seconds++
        if(seconds<10 && minutes<10){
            timer = `0${minutes}:0${seconds}`
        }else if(minutes<10 && seconds>=10){
            timer = `0${minutes}:${seconds}`}else if(minutes>=10 && seconds<10){
                timer = `${minutes}:0${seconds}`
             }
        if(seconds>=59){
            seconds=-1
            minutes++
        }
     },1000)
})
//вывод лучших результатов в модальное окно
resultsBtn.addEventListener('click',()=>{
    let modal = document.createElement('div')
    modal.classList.add('modal')
    let modalInfo = document.createElement('div')
    modalInfo.classList.add('modal_info')
    modalInfo.textContent ='Топ 10 результатов'
    let winOl = document.createElement('ol')
    bestResultsArr.forEach((item,i)=>{
        let liElem = document.createElement('li')
        liElem.textContent = ' Ходов :  ' + item.counterMoves + '  Время :  ' + item.timer
        winOl.append(liElem)
    })
    let closeBtn = document.createElement('button')
    closeBtn.textContent = 'X'
    closeBtn.classList.add('close_btn')
    modalInfo.append(winOl,closeBtn)
    modal.append(modalInfo)
    setTimeout(()=>modalInfo.style.height = '250px')
    document.body.append(modal)
    modalInfo.addEventListener('click',(e)=>{
            e.stopPropagation()
    })
    modal.addEventListener('click',()=>{
        modal.remove()
        clearInterval(Id)
        inGame = false
    })
    closeBtn.addEventListener('click',()=>{
        modal.remove()
        clearInterval(Id)
        inGame = false
    })
})

function setCheckedRadio(){
    radioArr.forEach((item,i)=>{
        if(item.value == sizeNumber){
          item.setAttribute('checked',true)
          labelArr[i].classList.add('focus')
        }
      })
}
//проверка ls на список лидеров
if(localStorage.getItem('loginovsky_max_listOfBest')!=undefined){
    bestResultsArr  = JSON.parse(localStorage.getItem('loginovsky_max_listOfBest'))
}
//проверка на сохраненную игру
if(localStorage.getItem('loginovsky_max_game')!=undefined){
    let saveObj = JSON.parse(localStorage.getItem('loginovsky_max_game'))
    seconds = saveObj.seconds
    minutes = saveObj.minutes
    timer = saveObj.timer
    counterMoves = saveObj.counterMoves
    square = saveObj.square
    sizeNumber = parseFloat(saveObj.sizeNumber) 
    playCheck = saveObj.playCheck
    createNumbersArr(sizeNumber)
    setCheckedRadio()
    drawCurrentSize()
    printMoves()
    printTimer()
    createSquare()
    getActiveCell()
    replaceCell(activeCellArr)
}else{
    sizeNumber = 4
    createNumbersArr(sizeNumber)
    setCheckedRadio()
    drawCurrentSize()
    printMoves()
    printTimer()
    createSquareArr()
    createSquare()
    getActiveCell()
    replaceCell(activeCellArr)
    alert('Привет, игра начинается по клику на старт, иначе ячейки неактивны, тоже самое при смене размера поля,алгоритм просчета решаемости верный, при загрузке страницы после сохранения нужно нажать кнопку Continue, кнопка Easy Mode, создает поле с одним ходим до победы, если есть косяки напиши мне и я все исправлю, удачных проверок)))')
}

