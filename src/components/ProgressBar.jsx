export function ProgressBar({ progress = 0 }) {
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${progress}%` }}
    />
  );
}
