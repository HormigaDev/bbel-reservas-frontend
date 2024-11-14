function removeMask(mask: string, text: string) {
    const splittedMask = mask.split('');
    let textUnMasked = '';

    for (const i in splittedMask) {
        const char = splittedMask[i];
        if (char === '#') {
            textUnMasked += text[i];
        }
    }

    return textUnMasked;
}

export default removeMask;
