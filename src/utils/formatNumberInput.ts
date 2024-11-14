function formatNumberInput(value: string, decimals: number): string {
    const MAX_SAFE_INTEGER = 9007199254740991;
    const MIN_SAFE_INTEGER = -9007199254740991;
    const MAX_FLOAT = Number.MAX_VALUE;
    const MIN_FLOAT = -Number.MAX_VALUE;

    value = value.replace(',', '.');

    if (/^\d+\.$/.test(value)) {
        const numericValue = parseFloat(value)
            .toFixed(decimals)
            .replace('.', ',');
        return numericValue;
    }

    const numValue = Number(value);

    if (!isNaN(numValue)) {
        if (numValue > MAX_SAFE_INTEGER) return String(MAX_SAFE_INTEGER);
        if (numValue < MIN_SAFE_INTEGER) return String(MIN_SAFE_INTEGER);
        if (numValue > MAX_FLOAT)
            return MAX_FLOAT.toFixed(decimals).replace('.', ',');
        if (numValue < MIN_FLOAT)
            return MIN_FLOAT.toFixed(decimals).replace('.', ',');
        return numValue.toFixed(decimals).replace('.', ',');
    }
    return String((0).toFixed(decimals).replace('.', ','));
}

export default formatNumberInput;
