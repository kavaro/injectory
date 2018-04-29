type FactoryFn = (di: DI) => any;
type DecorateFactoryFn = (base: any) => (di: DI) => any;
type Factories = {[key:string]: FactoryFn};

export default class DI {
    private _factories: Factories = {};

    keys() : string[] {
        return Object.keys(this._factories);
    }

    has(key: string) : boolean {
        return key in this._factories;
    }

    set(key: string, factory: FactoryFn) : DI {
        this._factories[key] = factory;
        return this;
    }

    get(key: string) : any {
        const factory = this._factories[key];
        return factory(this);
    }

    create(key: string, ...args: any[]) {
        const Class = this.get(key);
        return new Class(...args);
    }

    decorate(key: string, decorateFactory: DecorateFactoryFn) {
        this.set(key, decorateFactory(this.get(key)));
        return this;
    }
}