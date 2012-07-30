exports.paths   = [
    {
        code    : './mocks/mock.js',
        tests   : './t/mock.test.js',
        tmpl    : './t/tmpl/mock.tmpl'
    },
    {
        code    : '../LocalCache/lib/Storage.js',
        tests   : '../LocalCache/t/Storage.test.js'
    },
    {
        deps    : '../LocalCache/lib/Storage.js',
        code    : '../LocalCache/lib/Cache.js',
        tests   : '../LocalCache/t/Cache.test.js'
    }
];
