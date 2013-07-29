"use strict";

var should = require('should'),
	Class = require('../tmp/myInherit');

var Person = Class({
	init: function(opt){
		opt = opt || {};
		this.type = 'person';
		this.name = opt.name || 'noname';
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
			return 'Coder '+ this.name;
		}
	}
});

var BadCoder = Class(Coder, {
	init: function(){
		this.job = 'coder?';
	},
	methods: {
		getPersonInfo: function(){
			return this.__base__.__base__;
		}
	}
});

describe('Class', function(){
	var p = new Person({
		name: 'p'
	});

	describe('init', function(){
    	it('with type: person', function (done) {
			p.type.should.equal('person');
			done();
		});
		it('with name: p', function (done) {
			p.name.should.equal('p');
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
    		it('with job: coder', function (done) {
				c.job.should.equal('coder');
				done();
			});
		});

		var c2 = new Coder(p);

		describe('properties', function(){
			it('property name work well', function (done) {
				c2.type.should.equal('person');
				p.setName('test person');
				c2.name.should.equal('test person');

				c2.name = 'test person 2';
				p.name.should.equal('test person 2');

				done();
			});
		});

		describe('methods', function(){
			it('not inherited work well', function (done) {
				c.setName('Bob');
				c.name.should.equal('Bob');

				c2.setName('Carol');
				p.getName().should.equal('Carol');

				done();
			});

	    	it('inherited funcs works well', function (done) {
				c.setName('Bob');
				c.getName().should.equal('Coder Bob');

				p.setName('Bob');
				c2.getName().should.equal('Coder Bob');

				done();
			});
		});
	});

	describe('inherit twice', function(){

		describe('init', function(){
			var c = new BadCoder();
    		it('with job: coder?', function (done) {
				c.job.should.equal('coder?');
				done();
			});
		});

		var c2 = new Coder(p);
		var c3 = new BadCoder();
		var c4 = new BadCoder(c2);

		describe('properties', function(){
			it('property name work well', function (done) {
				c4.type.should.equal('person');
				p.setName('test person');
				c4.name.should.equal('test person');

				c4.name = 'test person 3';
				p.getName().should.equal('test person 3');
				c2.getName().should.equal('Coder test person 3');

				done();
			});
		});

		describe('methods', function(){
			it('not inherited work well', function (done) {
				var _p = c3.getPersonInfo();
				_p.should.have.property('type');
				_p.should.have.property('name');
				c4.getPersonInfo().should.equal(p);

				done();
			});

	    	it('inherited funcs works well', function (done) {
				c3.setName('Bob');
				c3.getName().should.equal('Coder Bob');

				p.setName('Bob');
				c4.getName().should.equal('Coder Bob');

				done();
			});
	    });
	});
});