'use client';

function applyMask(str: string, mask: string) {
    if (mask === '*') return str;
    let i = 0;
    return mask
        .split('')
        .map((char: string) => {
            if (char === '#') {
                return str[i] ? str[i++] : '';
            }
            return char;
        })
        .join('');
}

export default applyMask;
