"use strict";

var should = require('should'),
	Class = require('../tmp/myInherit');

var Person = Class({
	init: function(){
		this.type = 'person';
		this.name = 'noname';
	},
	methods: {
		setName: function(n){
			return this.name = n;
		},
		getName: function(){
			return this.name;
		}
	}
});

var Coder = Class(Person, {
	init: function(){
		this.job = 'coder';
	},
	methods: {
		getName: function(){
			return 'Coder ' + this.__base__.getName();
		}
	}
});

describe('Class', function(){
	var p = new Person();

	describe('init', function(){
    	it('init with type: person', function (done) {
			p.type.should.equal('person');
			done();
		});
	});

	describe('methods', function(){
    	it('get the name which is set', function (done) {
			p.setName('test person');
			p.getName().should.equal('test person');
			done();
		});
	});

	describe('inherit', function(){
		var c = new Coder();

		describe('init', function(){
    		it('init with job: coder', function (done) {
				c.job.should.equal('coder');
				done();
			});
		});

		var c2 = new Coder(p);

		describe('parent methods', function(){
	    	it('inherited(or not) funcs works well', function (done) {
				c.setName('Bob');
				c.getName().should.equal('Coder Bob');

				p.setName('Bob');
				c2.getName().should.equal('Coder Bob');

				c2.setName('Carol');
				p.getName().should.equal('Carol');

				done();
			});
		});
	});
});