import { useEffect, useRef, useState } from 'react';
import { getFoods } from '../services/game';
import { FoodsList } from './FoodsList';
import { Score } from './Score';
import feedSound from '../assets/sound/feed.wav'
import winSound from '../assets/sound/win.mp3'
import pickSound from '../assets/sound/pick.mp3'
import { ProgressBar } from './ProgressBar';
import candyPeonUrl from '../assets/img/Candy_peon.png'
import peonUrl from '../assets/img/Peon.png'

export function Game({ onGameOver }) {
    const [foods, setFoods] = useState(getFoods());
    const [isOverFeedContainer, setIsOverFeedContainer] = useState(false);
    const [isShowScore, setIsShowScore] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const clickedFoodRef = useRef(null);
    const scoreTimeOut = useRef(null);
    const peonTimeOut = useRef(null);

    useEffect(() => {
        if (clickedFoodRef.current) {
            clickedFoodRef.current.style.top = `${mousePosition.y - 42}px`;
            clickedFoodRef.current.style.left = `${mousePosition.x - 38}px`;
        }
    }, [mousePosition]);

    useEffect(() => {
        if (isGameOver()) {
            playSound(winSound, 0.5)
            clearTimeout(peonTimeOut.current)
            setIsOverFeedContainer(true)
            setTimeout(() => {
                onGameOver()
                startGame()
            }, 1000);
        }
    }, [foods])

    function isGameOver() {
        return foods.every(food => food.isEaten)
    }

    function startGame() {
        setFoods(getFoods())
        setIsOverFeedContainer(false)
    }

    function handleFoodMouseDown(ev) {
        ev.preventDefault();
        playSound(pickSound, 1)
        const foodEl = ev.target;
        foodEl.classList.add('drag');
        clickedFoodRef.current = foodEl;
        foodEl.style.position = 'fixed';
        const clientX = ev.type === 'touchstart' ? ev.touches[0].clientX : ev.clientX;
        const clientY = ev.type === 'touchstart' ? ev.touches[0].clientY : ev.clientY;
        setMousePosition({ x: clientX, y: clientY });
        addListeners()
    }

    function handleMouseMove(ev) {
        ev.preventDefault();
        const clientX = ev.type === 'touchmove' ? ev.touches[0].clientX : ev.clientX;
        const clientY = ev.type === 'touchmove' ? ev.touches[0].clientY : ev.clientY;
        setMousePosition({ x: clientX, y: clientY });

        if (ev.target.classList.contains('feed-container')) {
            setIsOverFeedContainer(true);
        } else {
            setIsOverFeedContainer(false);
        }
    }

    function handleMouseUp(ev) {
        removeListeners()
        if (clickedFoodRef.current) {
            clickedFoodRef.current.classList.remove('drag');
            if (ev.target.classList.contains('feed-container')) {
                onFoodEat()
            } else {
                clickedFoodRef.current.style.position = 'unset';
                clickedFoodRef.current.style.top = 'unset';
                clickedFoodRef.current.style.left = 'unset';
            }
            clickedFoodRef.current = null;
            peonTimeOut.current = setTimeout(() => {
                setIsOverFeedContainer(false);
            }, 0.1);
        }
    }

    function onFoodEat() {
        playSound(feedSound, 0.5)
        setIsShowScore(false)
        const foodName = clickedFoodRef.current.classList[1];
        const foodIdx = foods.findIndex(food => food.name === foodName);
        setFoods(prevFoods => {
            const updatedFoods = [...prevFoods];
            updatedFoods[foodIdx].isEaten = true;
            return updatedFoods;
        });
        clearTimeout(scoreTimeOut.current)

        if (isShowScore) {
            scoreTimeOut.current = setTimeout(() => {
                setIsShowScore(true)
                scoreTimeOut.current = setTimeout(() => {
                    setIsShowScore(false)
                }, 1400);
            }, 0);
            return
        }

        setIsShowScore(true)
        scoreTimeOut.current = setTimeout(() => {
            setIsShowScore(false)
        }, 1400);
    }

    function addListeners() {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
    }

    function removeListeners() {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
    }

    function playSound(sound, volume) {
        const audio = new Audio(sound)
        audio.volume = volume
        audio.play()
    }

    const progressMaxValue = getFoods().length
    const progressValue = foods.filter(food => food.isEaten).length

    return (
        <div className="game">
            <ProgressBar value={progressValue} maxValue={progressMaxValue} />

            <div className="game-actions-container">

                <div className="peon-container">
                    <img className="peon" src={isOverFeedContainer ? candyPeonUrl : peonUrl} />
                    <div className="feed-container"></div>
                </div>

                <FoodsList foods={foods} handleFoodMouseDown={handleFoodMouseDown} />

                {isShowScore && <Score />}
            </div>
        </div>
    );
}
