var Class = function(baseClass, opt){

    //without baseClass
    if(!opt){
        opt = baseClass;
        baseClass = function(){};
        if(!opt || typeof opt !== 'object'){
            opt = {};
        }
    }

    var init = opt.init || function(){};
    var proto = {};

    var baseClassProto = baseClass.prototype, value;
    for(var name in baseClassProto){
        if(baseClassProto.hasOwnProperty(name)){
            value = baseClassProto[name];
            if(typeof value === 'function'){
                proto[name] = value;
            }
        }
    }
    //proto = baseClass.prototype;

    var baseClassObj = new baseClass();
    var Base, getBase = function(name){
        return function(value){
            if(value){
                this.__base__[name] = value;
            }
            return this.__base__[name];
        };
    };
    for(var name in baseClassObj){
        if(baseClassObj.hasOwnProperty(name)){
            Base = getBase(name);
            Object.defineProperty(proto, name, {
                set: function (val) {
                    return Base.call(this, val);
                },
                get: function () {
                    return Base.call(this);
                },
                enumerable: true,
                configurable: true
            });
        }
    }

    if(opt.methods){
        var methods = opt.methods;
        for(var name in methods){
            if(methods.hasOwnProperty(name)){
                proto[name] = methods[name];
            }
        }
    }

    var constructor = function(baseObj, opt){
        if(arguments.length >= 2 && baseObj.constructor !== baseClass){
            throw new Error('Wrong Base Object!');
        }
        if(!baseObj || baseObj.constructor !== baseClass){
            opt = opt || baseObj;
            baseObj = new baseClass(opt);
        }

        Object.defineProperty(this, '__base__', {
            value: baseObj,
            enumerable: false,
            writable: false
        });

        init.call(this, opt);
    };

    proto.constructor = constructor;
    constructor.prototype = proto;

    return constructor;
};