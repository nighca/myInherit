var Class = function(baseClass, opt){

    // Without baseClass
    if(!opt){
        opt = baseClass;
        baseClass = function(){};
        if(!opt || typeof opt !== 'object'){
            opt = {};
        }
    }

    // Inherit properties from base
    var init = opt.init || function(){};
    var proto = new baseClass();
    var genGet, genSet = genGet = function(name){
        return function(value){
            if(value){
                this.__base__[name] = value;
            }
            return this.__base__[name];
        };
    };
    for(var name in proto){
        if(proto.hasOwnProperty(name)){
            Object.defineProperty(proto, name, {
                set: genSet(name),
                get: genGet(name),
                enumerable: true,
                configurable: true
            });
        }
    }

    // Add methods from opt
    if(opt.methods){
        var methods = opt.methods;
        for(var name in methods){
            if(methods.hasOwnProperty(name)){
                proto[name] = methods[name];
            }
        }
    }

    // Generate constructor
    var constructor = function(baseObj, opt){
        // baseObj type error
        if(arguments.length >= 2 && baseObj.constructor !== baseClass){
            throw new Error('Wrong Base Object!');
        }

        // Without baseObj
        if(!baseObj || baseObj.constructor !== baseClass){
            opt = opt || baseObj;
            baseObj = new baseClass(opt);
        }

        // Add __base__
        Object.defineProperty(this, '__base__', {
            value: baseObj,
            enumerable: false,
            configurable: false,
            writable: false
        });

        // Do init
        init.call(this, opt);
    };

    proto.constructor = constructor;
    constructor.prototype = proto;

    return constructor;
};