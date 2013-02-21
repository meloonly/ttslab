({
    appDir: "../",
    baseUrl: "ttslib",
    dir: "../../webapp-build",
    paths: {
        css: 'assets/css/css',
        normalize:'assets/css/normalize',
        firstindex:'../js/index'
    },
//    generateSourceMaps: true,
    preserveLicenseComments:false,
//    useSourceUrl :true,

    optimizeCss: "standard",
    
    modules: [
        {
            name: "firstindex"
        },
    ]
})