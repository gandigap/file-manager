export const getUserName = () => {
    const args = process.argv;
    
    const userName = args
        .find((el) => el.includes("--username"))
        .split("=")[1];

    return userName;
}
