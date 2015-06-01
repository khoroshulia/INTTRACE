function RunGenerators(g: Function) {
    var it = g(), ret: any;

    // asynchronously iterate over generator
    (function iterate(val: any){
        ret = it.next( val );

        if (!ret.done) {
            // poor man's "is it a promise?" test
            if ("then" in ret.value) {
                // wait on the promise
                ret.value.then( iterate );
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );
            }
        }
    })(null);
}

export = RunGenerators;