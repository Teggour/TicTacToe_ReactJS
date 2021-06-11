import React, { useState } from 'react'
import style from './style.module.css'

import clickURL from '../../sounds/click.mp3'
import errorURL from '../../sounds/error.mp3'
import restartURL from '../../sounds/restart.mp3'
import homeURL from '../../sounds/home.mp3'


function Game() {
    let [squares, setSquares] = useState(Array(9).fill(null))
    let [count, setCount] = useState(0)
    let [win, setWin] = useState(false)
    let [messageTxt, setMessageTxt] = useState("Player X's turn:")

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function cellClick(event) {
        let cellNum = event.target.getAttribute('data')
        let allCells = squares

        if (win === false && allCells[cellNum] === null) {
            let clickSound = new Audio(clickURL)
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
            let errorSound = new Audio(errorURL)
            errorSound.play()
        }
        searchWinner()
    }

    function searchWinner() {
        let currentPlayer =
            (count % 2 === 0)
                ? "X"
                : "O"

        for (let i = 0; i < winCombinations.length; i++) {
            let winCombo = winCombinations[i]
            let checker = 0
            for (let j = 0; j < winCombo.length; j++) {
                if (squares[winCombo[j]] === currentPlayer) {
                    checker++
                    if (checker === winCombo.length) {
                        setMessageTxt(`Player ${currentPlayer}'s WIN!`)
                        setWin(true)
                    }
                }
            }
        }
    }

    function restartClick() {
        var restartSound = new Audio(restartURL)
        restartSound.play()
        setSquares(Array(9).fill(null))
        setCount(0)
        setWin(false)
        setMessageTxt("Player X's turn:")
    }

    function menuClick() {
        var homeSound = new Audio(homeURL)
        homeSound.play()
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
                <button className={style.restart} onClick={restartClick}>Restart</button>
                <button className={style.menu} onClick={menuClick}>Menu</button>
            </div>
        </React.Fragment>
    )
}

export default Game;
