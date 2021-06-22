import React, { useState, useEffect } from 'react'

import restartURL from '../../sounds/restart.mp3'
import respectURL from '../../sounds/respect.mp3'
import wastedURL from '../../sounds/wasted.mp3'


function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [count, setCount] = useState(0)
    const [winner, setWinner] = useState(undefined)
    const [messageTxt, setMessageTxt] = useState("Player X's turn:")

    const respectSound = new Audio(respectURL)
    const restartSound = new Audio(restartURL)
    const wastedSound = new Audio(wastedURL)

    const delay = (ms) => new Promise(resolve => { setTimeout(resolve, ms) })

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
        let currentPlayer = (count % 2 === 0) ? "O" : "X"

        for (let i = 0; i < winCombinations.length; i++) {
            let winCombo = winCombinations[i]
            let checker = 0
            for (let j = 0; j < winCombo.length; j++) {
                if (squares[winCombo[j]] === currentPlayer) {
                    checker++
                    if (checker === winCombo.length) {
                        setWinner(currentPlayer)
                        return () => { }
                    }
                }
            }
        }

        if (count === 9) {
            wastedSound.play()
            setMessageTxt("Draw!")
            return () => { }
        }

        if (!winner) {
            (async function main() {
                await delay(1000)

                let allCells = squares
                let emptyIndexes = getAllIndexes(allCells, null)
                let cellNum = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]

                currentPlayer = (count % 2 === 0) ? "X" : "O"
                allCells[cellNum] = currentPlayer

                setMessageTxt(currentPlayer === 'X' ? "Player O's turn:" : "Player X's turn:")
                setCount(count + 1)
                setSquares([...allCells])
            })()
        }
    }, [squares])

    useEffect(() => {
        if (winner) {
            respectSound.play()
            setMessageTxt(`Player ${winner}'s WIN!`)
        }
    }, [winner])

    function getAllIndexes(arr, val) {
        let indexes = []
        for (let i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i)
        return indexes
    }

    function restartClick() {
        restartSound.play()

        setWinner(undefined)
        setCount(0)
        setSquares(Array(9).fill(null))
        setMessageTxt("Player X's turn:")
    }

    return (
        <React.Fragment>
            <div className='message'><h1>Computer Vs Computer</h1></div>
            <div className='message'>{messageTxt}</div>
            <div className='myGame'>
                <div className='cell' data="0">{squares[0]}</div>
                <div className='cell' data="1">{squares[1]}</div>
                <div className='cell' data="2">{squares[2]}</div>
                <div className='cell' data="3">{squares[3]}</div>
                <div className='cell' data="4">{squares[4]}</div>
                <div className='cell' data="5">{squares[5]}</div>
                <div className='cell' data="6">{squares[6]}</div>
                <div className='cell' data="7">{squares[7]}</div>
                <div className='cell' data="8">{squares[8]}</div>
            </div>
            <div className='buttons'>
                <button className='button' onClick={restartClick}>Restart</button>
            </div>
        </React.Fragment>
    )
}

export default Game;
