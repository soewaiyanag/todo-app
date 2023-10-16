export default function ControlPanel() {
    return (
        <div className="control-panel">
            <span>5 items left</span>
            <div className="space-x-2 absolute top-10 md:relative px-4 py-3 shadow-md bg-white dark:bg-very-dark-desaturated-blue">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <button>Clear Completed</button>
        </div>
    );
}
