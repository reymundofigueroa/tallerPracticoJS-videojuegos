const canvas = document.querySelector('#game')
//botones movimiento
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
//canvas
const game = canvas.getContext('2d')
let canvasSize
let elementsSize
let level = 0

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

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10
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

    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    console.log(mapRowCols)
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
    const giftColisionX = playerPosition.x == giftPosition.x
    const giftColisionY = playerPosition.y == giftPosition.y
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
        console.log('chocaste contra un enemigo');
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

//Cambiar de mapa
function winLevel() {
    console.log('subiste de nivel');
    level++
    startGame()
}
//Conpletaste el juego
function gameWin() {
    console.log('ganaste el juego');
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






