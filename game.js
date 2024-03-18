const canvas = document.querySelector('#game')
//botones movimiento
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
//Vidas
const spanLives = document.querySelector('#lives')
//tiempo
const spanTime = document.querySelector('#time')
//Resultados
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')
//canvas
const game = canvas.getContext('2d')
let canvasSize
let elementsSize
let level = 0
let lives = 3

//Manejo del tiempo
let timeStar 
let timePlayer
let timeInterval

//Posición incial del jugador
const playerPosition = {
    x: undefined,
    y: undefined,
} 
//posición inicial regalo
const giftPosition = {
    x: undefined,
    y: undefined,
}
//posición inicial enemigos
let enemyPositions = []

//Eventos
window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
/*No hay una función que llame al teclado, sin embargo podemos hacer uso de window, usamos el argumendo keydown para que se active una vez presionamos una tecla*/
window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }

    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function startGame() {
    game.font = elementsSize + 'px Verdana' //siempre debe ir antes del fillText
    game.textAlign = 'end'

    const map = maps[level]
    // ganaste el juego
    if (!map) {
        gameWin()
        return
    }

    //Tiempo de juego
    if (!timeStar) {
        timeStar = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))


    showLives()

    enemyPositions = []
    game.clearRect(0,0,canvasSize,canvasSize)
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }
            game.fillText(emoji, posX, posY)
        })
    });
    movePlayer()

}
//Función mover player
function movePlayer() {
    const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const giftColision = giftColisionX && giftColisionY
    if (giftColision) {
        winLevel();
    }
    const enemyColision = enemyPositions.find(enemy => {
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
        const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
        return enemyColisionX && enemyColisionY
    })
    if (enemyColision) {
        levelFail();
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

//Cambiar de mapa por subir de nivel
function winLevel() {
    console.log('subiste de nivel');
    level++
    startGame()
}
//Función cuando pierdes el nivel
function levelFail() {
    console.log('chocaste contra un enemigo, perdiste :c')
    lives--

    if (lives <= 0){
        level = 0
        lives = 3
    }
/*Cuando chocamos con un enemigo la posición de nuestro player vuelve a ser undefined, luego llamamos a la función starGame() para que ubique nuevamente a nuestro player en la puerta de salida */    
    playerPosition.x = undefined
    playerPosition.y = undefined

    startGame()
}
//Conpletaste el juego
function gameWin() {
    console.log('ganaste el juego');
    clearInterval(timeInterval)

    //Guardar tiempos para crear record
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStar;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record';
          } else {
            pResult.innerHTML = 'Sorry you are a manco';
          }
        } else {
          localStorage.setItem('record_time', playerTime);
          pResult.innerHTML = 'Nuevo record';
    }
    console.log({recordTime, playerTime});

}
//Mostrar vidas en html
function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])

    spanLives.innerHTML = ""

    heartsArray.forEach(heart => spanLives.append(heart))


}

function showTime() {
    spanTime.innerHTML = ((Date.now() - timeStar) / 1000)
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp()
    else if (event.key == 'ArrowLeft') moveLeft()
    else if (event.key == 'ArrowRight') moveRight()
    else if (event.key == 'ArrowDown') moveDown()
}

function moveUp(){
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('out')
    } else {
        playerPosition.y -= elementsSize
        startGame()
    }
}
function moveLeft(){
    if ((playerPosition.x - elementsSize)< elementsSize) {
        console.log('out')
    } else {
        playerPosition.x -= elementsSize
        startGame()
    }
}
function moveRight(){
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('out')
    } else {
        playerPosition.x += elementsSize
        startGame()
    }

}
function moveDown(){
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('out')
    } else {
        playerPosition.y += elementsSize
        startGame()
    }

}






