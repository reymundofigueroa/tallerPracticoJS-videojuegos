const canvas = document.querySelector('#game')
//botones movimiento
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
//canvas
const game = canvas.getContext('2d')
//Posición del juegador
const playerPosition = {
    x: undefined,
    y: undefined,
} 

let canvasSize
let elementsSize
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

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    console.log(mapRowCols)

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
            }
            game.fillText(emoji, posX, posY)
        })
    });
    movePlayer()

}
//Función mover player
function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp()
    else if (event.key == 'ArrowLeft') moveLeft()
    else if (event.key == 'ArrowRight') moveRight()
    else if (event.key == 'ArrowDown') moveDown()
}

function moveUp(){
    console.log('Me quiero mover hacia arriba')
    playerPosition.y -= elementsSize
    startGame()
}
function moveLeft(){
    console.log('Me quiero mover hacia izq')
    playerPosition.x -= elementsSize
    startGame()
}
function moveRight(){
    console.log('Me quiero mover hacia der')
    playerPosition.x += elementsSize
    startGame()
}
function moveDown(){
    console.log('Me quiero mover hacia abajo')
    playerPosition.y += elementsSize
    startGame()
}






