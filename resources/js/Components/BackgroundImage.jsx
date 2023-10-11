import clsx from "clsx";

const BackgroundImage = () => {
    return (
        <div
            className={clsx(
                "bg-desktop-light dark:bg-desktop-dark bg-cover bg-center bg-no-repeat h-60",
                "absolute inset-0 -z-10"
            )}
        ></div>
    );
};

export default BackgroundImage;
