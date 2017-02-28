/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */


var DefineManager={
    randomNameDefines:null,

    genRandomName:function(){
        var a=DefineManager.randomNameDefines.firstNameEn.names,
        b=DefineManager.randomNameDefines.lastNameBoyEn.names,
        c=DefineManager.randomNameDefines.lastNameGirlEn.names,
        d=DefineManager.randomNameDefines.firstNameBoyCn.names,
        e=DefineManager.randomNameDefines.lastNameBoyCn.names,
        f=DefineManager.randomNameDefines.firstNameGirlCn.names,
        g=DefineManager.randomNameDefines.lastNameGirlCn.names;

        0.5>Math.random()?(0.5>Math.random()?(a=a[Math.floor(Math.random()*a.length)],b=b[Math.floor(Math.random()*b.length)]):(a=a[Math.floor(Math.random()*a.length)],b=c[Math.floor(Math.random()*c.length)]),b=a+"\u00b7"+b):(0.5>Math.random()?(a=d[Math.floor(Math.random()*d.length)],b=e[Math.floor(Math.random()*e.length)]):(a=f[Math.floor(Math.random()*f.length)],b=g[Math.floor(Math.random()*g.length)]),b=a+b);
        return b
    },

    load:function(a){
        a.load(this)
    }
};


var DefineManagerClientLoader={
    load:function(a){
        a.randomNameDefines=cc.loader.getRes(res.RANDOM_NAMES_JSON);
    },
    
    watch:function(){}
};


cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(854, 480, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.spriteFrameCache.addSpriteFrames(res.GameBody_plist); 
        
        //cc.spriteFrameCache.addSpriteFrames(res.UIRes_plist); 
        //cc.spriteFrameCache.addSpriteFrames(res.Icons_plist); 
        
        cc.spriteFrameCache.addSpriteFrames(res.Avatar_plist); 
        //cc.spriteFrameCache.addSpriteFrames(res.Button_plist); 

        cc.spriteFrameCache.addSpriteFrames(res.bombChars_plist); 
        cc.spriteFrameCache.addSpriteFrames(res.BombAct_plist); 

        DefineManager.load(DefineManagerClientLoader);
        cc.director.runScene(new StartScene());
    }, this);

};
cc.game.run();