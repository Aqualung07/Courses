export const displayLoading = (message: string) => {
    const dots = ["", ".", "..", "..."];
    let dotIndex = 0;
    const interval = setInterval(() => {
        process.stdout.write(`\r${message}${dots[dotIndex]}`);
        dotIndex = (dotIndex + 1) % dots.length;
    }, 500);

    return () => {
        clearInterval(interval);
        process.stdout.write(`\r${message}... Done!\n`);
    };
};