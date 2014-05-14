/**
 * Created by AJ on 22/04/2014.
 */
"use strict";

var LNStack = function( size ){
    this.size = size;
    this.values = new Array( size );
    this.top = -1;
};

LNStack.prototype = {
    constructor: LNStack,
    isFull: function(){
        if( top < size - 1 )
            return false;
        else
            return true;
    },
    destroy: function(){
        var that = this;
        for( var i = 0; i < that.size; i++ )
            this.values[i] = null;
        that.size = null;
        that.top = -1;
    },
    push: function( obj ){
        if( !this.isFull() ){
            this.top++;
            this.values[this.top] = obj;
        }
    },
    isEmpty: function(){
        if( this.top == -1 )
            return true;
        else
            return false;
    },
    pop: function(){
        var elem = null;
        if( !this.isEmpty() ){
            elem = this.values[this.top];
            this.top--;
        }
        return elem;
    }
};