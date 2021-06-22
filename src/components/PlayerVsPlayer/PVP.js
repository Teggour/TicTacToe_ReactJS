import React, { useState, useEffect } from 'react'

import clickURL from '../../sounds/click.mp3'
import errorURL from '../../sounds/error.mp3'
import restartURL from '../../sounds/restart.mp3'
import respectURL from '../../sounds/respect.mp3'
import wastedURL from '../../sounds/wasted.mp3'


function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [count, setCount] = useState(0)
    const [winner, setWinner] = useState(undefined)
    const [messageTxt, setMessageTxt] = useState("Player X's turn:")

    const restartSound = new Audio(restartURL)
    const errorSound = new Audio(errorURL)
    const clickSound = new Audio(clickURL)


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

    useEffect(() => {
        (function searchWinner() {
            let currentPlayer = (count % 2 === 0) ? "O" : "X"

            for (let i = 0; i < winCombinations.length; i++) {
                let winCombo = winCombinations[i]
                let checker = 0
                for (let j = 0; j < winCombo.length; j++) {
                    if (squares[winCombo[j]] === currentPlayer) {
                        checker++
                        if (checker === winCombo.length) {
                            setWinner(currentPlayer)
                            return () => {}
                        }
                    }
                }
            }

            if (count === 9) {
                const wastedSound = new Audio(wastedURL)
                wastedSound.play()
                setMessageTxt("Draw!")
                return () => {}
            }
        })()
    }, [squares])

    useEffect(() => {
        if (winner) {
            const respectSound = new Audio(respectURL)
            respectSound.play()
            setMessageTxt(`Player ${winner}'s WIN!`)
        }
    }, [winner])

    function cellClick(event) {
        let cellNum = event.target.getAttribute('data')
        let allCells = squares
        let currentPlayer = (count % 2) === 0 ? "X" : "O"

        if (allCells[cellNum] === null && !winner) {
            clickSound.play()

            allCells[cellNum] = currentPlayer
            setMessageTxt((count % 2 === 0) ? "Player O's turn:" : "Player X's turn:")

            setCount(count + 1)
            setSquares([...allCells])
        }
        else {
            errorSound.play()
            if (count !== 9 && !winner) {
                setMessageTxt("This field is already filled! Choose a free field...")
            }
        }
    }

    function restartClick() {
        restartSound.play()
        setSquares(Array(9).fill(null))
        setCount(0)
        setWinner(undefined)
        setMessageTxt("Player X's turn:")
    }

    return (
        <React.Fragment>
            <div className='message'><h1>Player Vs Player</h1></div>
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
