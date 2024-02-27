export function ProgressBar({ value, maxValue }) {
    // Calculate the percentage width of the progress bar
    const progress = (value / maxValue) * 100 + '%';

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: progress }}></div>
            <div className="progress-text">{value}/{maxValue}</div>
        </div>
    );
};