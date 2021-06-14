import React, { useState, useEffect } from 'react'
import style from './style.module.css'

import restartURL from '../../sounds/restart.mp3'
import homeURL from '../../sounds/home.mp3'
import respectURL from '../../sounds/respect.mp3'


function Game() {
    let [squares, setSquares] = useState(Array(9).fill(null))
    let [count, setCount] = useState(0)
    let [win, setWin] = useState(false)
    let [restartApp, setRestartApp] = useState(true)
    let [messageTxt, setMessageTxt] = useState("Player X's turn:")
    
    let respectSound = new Audio(respectURL)
    let homeSound = new Audio(homeURL)
    let restartSound = new Audio(restartURL)

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

    let stepsArr = shuffle([...Array(9).keys()])

    // componentDidMount()
    useEffect(() => {
        if(restartApp) {
            setRestartApp(restartApp = false)
            steps()
        }
    })

    function steps() {
        const delay = (ms) => new Promise(resolve => { setTimeout(resolve, ms) });

        (async function main() {
            for (let i = 0; i < stepsArr.length; i++) {
                await delay(1000)

                let cellNum = stepsArr[i]
                let allCells = squares

                if (win === false) {
                    if (count % 2 === 0) {
                        allCells[cellNum] = "X"
                        setMessageTxt("Player O's turn:")
                    }
                    else {
                        allCells[cellNum] = "O"
                        setMessageTxt("Player X's turn:")
                    }

                    setCount(count = count + 1)
                    setSquares(squares = [...allCells])
                }
                else {
                    return
                }

                searchWinner()

                if (count === 9 && win === false) {
                    setMessageTxt("Draw!")
                }
            }
        })()
    }

    function shuffle(arr) {
        var j, temp;
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    function searchWinner() {
        let currentPlayer =
            (count % 2 === 0)
                ? "O"
                : "X"

        for (let i = 0; i < winCombinations.length; i++) {
            let winCombo = winCombinations[i]
            let checker = 0
            for (let j = 0; j < winCombo.length; j++) {
                if (squares[winCombo[j]] === currentPlayer) {
                    checker++
                    if (checker === winCombo.length) {
                        respectSound.play()

                        setMessageTxt(`Player ${currentPlayer}'s WIN!`)
                        setWin(win = true)
                    }
                }
            }
        }
    }

    function restartClick() {
        restartSound.play()

        setWin(false)
        setCount(0)
        setSquares(Array(9).fill(null))
        stepsArr = shuffle([...Array(9).keys()])
        setMessageTxt("Player X's turn:")

        setRestartApp(restartApp = true)
    }

    function menuClick() {
        homeSound.play()
    }

    return (
        <React.Fragment>
            <div className={style.message}>{messageTxt}</div>
            <div className={style.myGame}>
                <div className={style.cell} data="0">{squares[0]}</div>
                <div className={style.cell} data="1">{squares[1]}</div>
                <div className={style.cell} data="2">{squares[2]}</div>
                <div className={style.cell} data="3">{squares[3]}</div>
                <div className={style.cell} data="4">{squares[4]}</div>
                <div className={style.cell} data="5">{squares[5]}</div>
                <div className={style.cell} data="6">{squares[6]}</div>
                <div className={style.cell} data="7">{squares[7]}</div>
                <div className={style.cell} data="8">{squares[8]}</div>
            </div>
            <div className={style.buttons}>
                <button className={style.restart} onClick={restartClick}>Restart</button>
                <button className={style.menu} onClick={menuClick}>Menu</button>
            </div>
        </React.Fragment>
    )
}

export default Game;
