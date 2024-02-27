import React, { useState, useRef } from "react";
import { Game } from "./Game";
import { PlayBtn } from "./PlayBtn";
import gameMusic from '../assets/sound/main.wav';
import backgroundUrl from '../assets/img/background.jpg'

export function GameContainer() {
    const [isShowPlayBtn, setIsShowPlayBtn] = useState(true);
    const audioRef = useRef(null);

    function startGame() {
        setIsShowPlayBtn(false);
        if (!audioRef.current) {
            createAudio(); // Create audio only if it doesn't exist
        }
        playAudio(); // Start audio playback when the game starts
    }

    function onGameOver() {
        setIsShowPlayBtn(true);
    }

    function createAudio() {
        audioRef.current = new Audio(gameMusic);
        audioRef.current.volume = 0.3; // Adjust volume here (0.3 means 30%)
        audioRef.current.loop = true; // Ensure audio loops
    }

    function playAudio() {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    return (
        <div className="game-container">
            <img className="background" src={backgroundUrl} />

            <Game onGameOver={onGameOver} />
            {isShowPlayBtn && <PlayBtn onBtnClick={startGame} />}
        </div>
    );
}
