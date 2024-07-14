function isOnlyNumbers(inputString: string): boolean {
    return /^[0-9]*$/.test(inputString)
}

export { isOnlyNumbers };