export const getUserName = () => {
    const args = process.argv;
    // Добавить обработку ошибок
    const userName = args
        .find((el) => el.includes("--userName"))
        .split("=")[1];

    return userName;
}
