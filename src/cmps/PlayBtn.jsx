import imgUrl from '/src/assets/img/play.png'

export function PlayBtn({ onBtnClick }) {

    return (
        <div className="play-btn-container">
            <div className="blur"></div>
            <button onClick={onBtnClick}>
                <img className='play-btn-img' src={imgUrl} />
            </button>
        </div>
    )
}
