export declare type FactoryFn = (di: DI) => any;
export declare type DecorateFactoryFn = (base: any) => (di: DI) => any;
export declare type Factories = {
    [key: string]: FactoryFn;
};
/**
 * class DI
 *
 * Dependency injection class
 */
export default class DI {
    private _factories;
    keys(): string[];
    has(key: string): boolean;
    set(key: string, factory: FactoryFn): DI;
    get(key: string): any;
    create(key: string, ...args: any[]): any;
    decorate(key: string, decorateFactory: DecorateFactoryFn): this;
}
