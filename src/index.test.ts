import DI from './index';

describe('DI', () => {
    describe('constructor', () => {
        it('should create empty DI', function () {
            const di = new DI();
            expect(di.keys()).toEqual([]);
            expect(di.has('')).toBe(false);
        });
    });
    describe('set', () => {
        it('should add factory function', () => {
            const di = new DI();
            const factoryFn = jest.fn();
            di.set('f', factoryFn);
            expect(di.keys()).toEqual(['f']);
            expect(di.has('f')).toBe(true);
        });
    });
    describe('get', () => {
        it('should call factory function with DI instance', function () {
            const di = new DI();
            const factoryFn = jest.fn();
            di.set('f', factoryFn);
            di.get('f');
            expect(factoryFn.mock.calls).toEqual([[di]]);
        });
        it('should return what is returned from factory function', function () {
            const di = new DI();
            const factoryFn = () => 'test';
            di.set('f', factoryFn);
            const result = di.get('f');
            expect(result).toBe('test');
        });
    });
    describe('decorate', () => {
        it('should return value of current factory to new factoryFn', function () {
            const di = new DI();
            const factoryFn = () => 'old';
            di.set('f', factoryFn);
            di.decorate('f', (old) => () => {
                return old + '+new';
            });
            const result = di.get('f');
            expect(result).toBe('old+new');
        });
    });
    describe('create', () => {
        it('should instantiate class returned from factory function', function () {
            const di = new DI();

            class Test {
                public value: string;

                constructor(a: string, b: string) {
                    this.value = a + b;
                }
            }

            di.set('Test', () => Test);
            const test = di.create('Test', 'a', 'b');
            expect(test instanceof Test).toBe(true);
            expect(test.value).toBe('ab');
        });
    });
});