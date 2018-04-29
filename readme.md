# Injectory

A ultra simple dependency injection container

# Usage

```javascript

import DI from 'injectory';

const di = new DI();

// register a base class
di.set('Abstract', di => {
   	return class Abstract {
   	    constructor(name) {
   	        this.abstract = name;
   	    }
   	}
});

// register a derived class
di.set('Concrete', di => {
    const Abstract = di.get('Abstract');
    return class Concrete extends Abstract {
   	    constructor(abstract, concrete) {
   	        super(abstract);
   	        this.concrete = concrete;
   	    }
   	} 
});

// get a class
const Concrete = di.get('Concrete');

// create a class instance
const instance = di.create('Concrete', 'a', 'b');
expect(instance.abstract).toBe('a');
expect(instance.concrete).toBe('b');

// decorate a class
di.decorate('Concrete', Concrete => di => {
   	return class DecoratedConcrete extends Concrete {
   	    constructor(abstract, concrete) {
   	        super(abstract, concrete);
   	    }
   	    
   	    get() {
   	       return this.abstract + this.concrete; 
   	    }
   	} 
});

// create a class instance
const decoratedInstance = di.create('Concrete', 'a', 'b');
expect(decoratedInstance.get()).toBe('ab');

```


