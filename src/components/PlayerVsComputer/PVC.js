import React, { useState } from 'react'
// import style from './style.module.css'

import clickURL from '../../sounds/click.mp3'
import errorURL from '../../sounds/error.mp3'
import restartURL from '../../sounds/restart.mp3'
import homeURL from '../../sounds/home.mp3'
import respectURL from '../../sounds/respect.mp3'


function Game() {
    let [squares, setSquares] = useState(Array(9).fill(null))
    let [count, setCount] = useState(0)
    let [win, setWin] = useState(false)
    let [messageTxt, setMessageTxt] = useState("Player X's turn:")

    let homeSound = new Audio(homeURL)
    let restartSound = new Audio(restartURL)
    let errorSound = new Audio(errorURL)
    let clickSound = new Audio(clickURL)
    let respectSound = new Audio(respectURL)

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

        if (win === false && allCells[cellNum] === null && count % 2 === 0) {
            clickSound.play()

            allCells[cellNum] = "X"
            setMessageTxt("Player O's turn:")

            setCount(count = count + 1)
            setSquares(squares = [...allCells])

            searchWinner()

            stepComputer()
        }
        else {
            errorSound.play()
            if(count % 2 !== 0 && win === false)
            {
                setMessageTxt("Wait!")
            }
            else if (count !== 9 && win === false) {
                setMessageTxt("This field is already filled! Choose a free field...")
            }
        }

        if (count === 9 && win === false) {
            setMessageTxt("Draw!")
        }
    }

    function stepComputer() {
        const delay = (ms) => new Promise(resolve => { setTimeout(resolve, ms) });

        (async function main() {
            await delay(1000)

            let allCells = squares
            let emptyIndexes = getAllIndexes(allCells, null)
            let cellNum = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]

            if (win === false) {
                allCells[cellNum] = "O"

                setCount(count = count + 1)
                setSquares(squares = [...allCells])
                setMessageTxt("Player X's turn:")
            }
            else {
                return
            }

            searchWinner()
        })()
    }

    function getAllIndexes(arr, val) {
        let indexes = []
        for (let i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i)
        return indexes
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
        setSquares(Array(9).fill(null))
        setCount(0)
        setWin(false)
        setMessageTxt("Player X's turn:")
    }

    function menuClick() {
        homeSound.play()
    }

    return (
        <React.Fragment>
            <div className='message'><h1>Player Vs Computer</h1></div>
            <div className='message'>{messageTxt}</div>
            <div className='myGame'>
                <div className='cell' onClick={cellClick} data="0">{squares[0]}</div>
                <div className='cell' onClick={cellClick} data="1">{squares[1]}</div>
                <div className='cell' onClick={cellClick} data="2">{squares[2]}</div>
                <div className='cell' onClick={cellClick} data="3">{squares[3]}</div>
                <div className='cell' onClick={cellClick} data="4">{squares[4]}</div>
                <div className='cell' onClick={cellClick} data="5">{squares[5]}</div>
                <div className='cell' onClick={cellClick} data="6">{squares[6]}</div>
                <div className='cell' onClick={cellClick} data="7">{squares[7]}</div>
                <div className='cell' onClick={cellClick} data="8">{squares[8]}</div>
            </div>
            <div className='buttons'>
                <button className='button' onClick={restartClick}>Restart</button>
            </div>
        </React.Fragment>
    )
}

export default Game;
