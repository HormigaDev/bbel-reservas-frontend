import DynamicStyleInterface from '@/interfaces/DynamicStyleInterface';

export default function makeStyles(styles: (string | DynamicStyleInterface)[]) {
    const classes: string[] = [];
    for (const style of styles) {
        if (typeof style === 'string') {
            classes.push(style);
        } else {
            if (style.condition) {
                if (typeof style.onTrue === 'string') {
                    classes.push(style.onTrue);
                } else if (Array.isArray(style.onTrue)) {
                    classes.push(makeStyles(style.onTrue));
                } else {
                    classes.push(makeStyles([style.onTrue ?? '']));
                }
            } else {
                if (typeof style.onFalse === 'string') {
                    classes.push(style.onFalse);
                } else if (Array.isArray(style.onFalse)) {
                    classes.push(makeStyles(style.onFalse));
                } else {
                    classes.push(makeStyles([style.onFalse ?? '']));
                }
            }
        }
    }

    return classes.join(' ');
}
