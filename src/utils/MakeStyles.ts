import DynamicStyleInterface from "@/interfaces/StyleInterface";

export default function makeStyles(styles: (string | DynamicStyleInterface)[]) {
    const classes: string[] = [];
    for (const style of styles) {
        if (typeof style === "string") {
            classes.push(style);
        } else {
            if (style.condition) {
                classes.push(style.onTrue);
            } else {
                classes.push(style.onFalse);
            }
        }
    }

    return classes.join(" ");
}
