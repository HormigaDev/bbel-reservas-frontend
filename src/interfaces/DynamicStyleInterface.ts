export default interface DynamicStyleInterface {
    condition: boolean;
    onTrue?:
        | string
        | DynamicStyleInterface
        | string[]
        | DynamicStyleInterface[];
    onFalse?:
        | string
        | DynamicStyleInterface
        | string[]
        | DynamicStyleInterface[];
}
