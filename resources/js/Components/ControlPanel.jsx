export default function ControlPanel() {
    return (
        <div className="control-panel">
            <span>5 items left</span>
            <div className="filters">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <button>Clear Completed</button>
        </div>
    );
}
