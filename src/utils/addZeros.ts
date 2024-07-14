/**
 * Добавляет нули в начало строки до ближайшей заданной длины
 * @param {string} inputString - Входная строка
 */
function addZeros(inputString: string): string {
    if (!inputString) {
        return inputString;
    }

    const targetLengths: number[] = [8, 10, 14];
    const inputLength: number = inputString.length;

    if (!targetLengths.includes(inputString.length) || inputLength > targetLengths[targetLengths.length - 1]) {
        for (let i = 0; i < targetLengths.length; i++) {
            let residue: number = targetLengths[i] - inputLength;
            if (residue > 0) {
                return inputString.padStart(residue + inputLength, '0');
            }
        }
    }

    return inputString;
}

export { addZeros };
