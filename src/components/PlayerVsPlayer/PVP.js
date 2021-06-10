import React, { useState } from 'react'
import style from './style.module.css'
import clickURL from '../../sounds/click.mp3'
import errorURL from '../../sounds/error.mp3'

function Game() {
    let [squares, setSquares] = useState(Array(9).fill(null))
    let [count, setCount] = useState(0)
    let [messageTxt, setMessageTxt] = useState("Player X's turn:")

    function cellClick(event) {
        let cellNum = event.target.getAttribute('data')
        let allCells = squares

        if (allCells[cellNum] === null) {
            var clickSound = new Audio(clickURL)
            clickSound.play()

            if (count % 2 === 0) {
                allCells[cellNum] = "X"
                setMessageTxt("Player O's turn:")
            }
            else {
                allCells[cellNum] = "O"
                setMessageTxt("Player X's turn:")
            }

            setCount(count + 1)
            setSquares(squares = [...allCells])
        }
        else {
            var errorSound = new Audio(errorURL)
            errorSound.play()
        }
    }

    return (
        <React.Fragment>
            <div className={style.message}>{messageTxt}</div>
            <div className={style.myGame}>
                <div className={style.cell} onClick={cellClick} data="0">{squares[0]}</div>
                <div className={style.cell} onClick={cellClick} data="1">{squares[1]}</div>
                <div className={style.cell} onClick={cellClick} data="2">{squares[2]}</div>
                <div className={style.cell} onClick={cellClick} data="3">{squares[3]}</div>
                <div className={style.cell} onClick={cellClick} data="4">{squares[4]}</div>
                <div className={style.cell} onClick={cellClick} data="5">{squares[5]}</div>
                <div className={style.cell} onClick={cellClick} data="6">{squares[6]}</div>
                <div className={style.cell} onClick={cellClick} data="7">{squares[7]}</div>
                <div className={style.cell} onClick={cellClick} data="8">{squares[8]}</div>
            </div>
            <div className={style.buttons}>
                <button className={style.restart}>Restart</button>
                <button className={style.menu}>Main menu</button>
            </div>
        </React.Fragment>
    )
}

export default Game;
