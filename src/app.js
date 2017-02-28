var bb = bb||{};

/*
var bomb_sound=new Howl({urls:["res/bomb_merged.m4a"],sprite:{
    bonus_bomb:[0,600],
    bonus_color:[2200,2500],
    bonus_line:[4900,2100],
    bonus_show:[7100,1780],
    button:[9570,550],
    cake_down:[10200,1800],
    color_crash:[12240,1760],
    fail:[14250,2550],
    hero_hide:[16700,950],
    hero_show:[18000,922],
    pause:[19150,1350],
    play_button:[21240,1940],
    pointer:[22400,1600],
    remove1:[24000,320],
    remove2:[24800,760],
    remove3:[25700,860],
    remove4:[26770,750],
    star1:[27710,1290],
    star2:[30000,1000],
    star3:[32000,1400],
    stop_move:[34000,370],
    transition:[34500,1500],
    win:[36110,2890]
}});
*/

function playsound(s) {
   //bomb_sound.play(s)
}

var CommonFunc={};
CommonFunc.p=function(a,b){return void 0==a?{x:0,y:0}:void 0==b?{x:a.x,y:a.y}:{x:a,y:b}};
CommonFunc.rect=function(a,b,c,d){return void 0===a?{x:0,y:0,width:0,height:0}:void 0===b?{x:a.x,y:a.y,width:a.width,height:a.height}:{x:a,y:b,width:c,height:d}};
CommonFunc.rectIntersectsRect=function(a,b){var c=a.y+a.height,d=b.x+b.width,e=b.y+b.height;return!(a.x+a.width<b.x||d<a.x||c<b.y||e<a.y)};
CommonFunc.pDot=function(a,b){return a.x*b.x+a.y*b.y};
CommonFunc.pLengthSQ=function(a){return CommonFunc.pDot(a,a)};
CommonFunc.pSub=function(a,b){return CommonFunc.p(a.x-b.x,a.y-b.y)};
CommonFunc.pDistanceSQ=function(a,b){return CommonFunc.pLengthSQ(CommonFunc.pSub(a,b))};
CommonFunc.Color=function(a,b,c,d){this.r=a||0;this.g=b||0;this.b=c||0;this.a=null==d?255:d};
CommonFunc.isString=function(a){return"string"==typeof a||"[object String]"==Object.prototype.toString.call(a)};
CommonFunc.isObject=function(a){var b=typeof a;return"function"==b||a&&"object"==b};
CommonFunc.hexToColor=function(a){a=a.replace(/^#?/,"0x");a=parseInt(a);return CommonFunc.color(a>>16,(a>>8)%256,a%256)};
CommonFunc.colorToHex=function(a){var b=a.r.toString(16),c=a.g.toString(16),d=a.b.toString(16);return"#"+(16>a.r?"0"+b:b)+(16>a.g?"0"+c:c)+(16>a.b?"0"+d:d)};
CommonFunc.color=function(a,b,c,d){return void 0===a?{r:0,g:0,b:0,a:255}:CommonFunc.isString(a)?CommonFunc.hexToColor(a):CommonFunc.isObject(a)?{r:a.r,g:a.g,b:a.b,a:null==a.a?255:a.a}:{r:a,g:b,b:c,a:null==d?255:d}};
CommonFunc.colorEqual=function(a,b){return a.r===b.r&&a.g===b.g&&a.b===b.b};
CommonFunc.isEmptyObject=function(a){for(var b in a)return!1;return!0};
CommonFunc.isInArray=function(a,b){if(a instanceof Array)for(var c=0;c<a.length;c++)if(a[c]==b)return!0};
CommonFunc.merge=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};
CommonFunc.formatAttrValue=function(a,b,c){switch(a){case "criticalRate":return b=DefineManager.globalConfig.CRITICAL_RATE_TO_POINT_FACTOR*b*100,0!=b?parseInt(b)||1:0;case "attackSpeed":return c&&(b-=1),b=DefineManager.globalConfig.ATTACK_SPEED_TO_POINT_FACTOR*b*100,0!=b?parseInt(b)||1:0;case "dodgeRate":return b=DefineManager.globalConfig.DODGE_RATE_TO_POINT_FACTOR*b*100,0!=b?parseInt(b)||1:0;case "criticalMultiplier":return c&&(b-=1),b*=100,0!=b?parseInt(b)||1:0;default:return abbrNumber(parseInt(b))}};
CommonFunc.getTime=function(a){var b=Math.floor(a/3600),c=Math.floor(a%3600/60);a=a%3600%60;return(10>b?"0"+b:b)+":"+(10>c?"0"+c:c)+":"+(10>a?"0"+a:a)};
CommonFunc.getCN=function(a){return[_("\u4e00"),_("\u4e8c"),_("\u4e09"),_("\u56db"),_("\u4e94"),_("\u516d"),_("\u4e03"),_("\u516b"),_("\u4e5d"),_("\u5341")][a-1]};
CommonFunc.getGUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})};


var EndGameSetting=cc.Node.extend({
    ctor:function(mainUI){
        this._super();  
        (new zy.Button
            (
                {normal:"#stdButton_Normal.png",pressed:"#stdButton_Pressed.png",disabled:"#stdButton_Forbid.png",text:"Return",size:32,strokeColor:cc.color(0,0,0,255)}
            )
        ).addTo(this).align(display.RIGHT_CENTER,0,0).onClick(function(){mainUI.goPrevious();}.bind(this));


        (new zy.Button
            (
                {normal:"#stdButton_Normal.png",pressed:"#stdButton_Pressed.png",disabled:"#stdButton_Forbid.png",text:"Close",size:32,strokeColor:cc.color(0,0,0,255)}
            )
        ).addTo(this).align(display.RIGHT_CENTER,0,100).onClick(function(){ModelUIController.close()}.bind(this));
    },

    onEnter:function(){
        this._super();
        //this.addListener(PROTOCOL.SET_AVATAR,function(a){ModelUIController.close()})
    }
});

var WinGameSetting=cc.Node.extend({
    ctor:function(mainUI,winner){
        this._super();

        var winItem=ccs.load(res.WIN_INFO_JSON).node;
        winItem.addTo(this).pos(-bb.playRectOffX, 0);
        var imgNode=utils.seekWidgetByName(winItem,"win_image");

cc.log(winner +"-------"+ mainUI.myChar.getId());

        if(winner == mainUI.myChar.getId()) {
            cc.Sprite.create("#my_win.png").addTo(imgNode).pos(0,0);
        } else {
            cc.Sprite.create("#other_win.png").addTo(imgNode).pos(0,0);            
            utils.seekWidgetByName(winItem, "winner_nick").setString(mainUI.getCharNick(winner));
        }

        (new zy.Button
            (
                {normal:"#stdButton_Normal.png",pressed:"#stdButton_Pressed.png",disabled:"#stdButton_Forbid.png",text:"Return",size:32,strokeColor:cc.color(0,0,0,255)}
            )
        ).addTo(this).align(display.RIGHT_CENTER,-200,-100).onClick(function(){mainUI.goPrevious();}.bind(this));


        (new zy.Button
            (
                {normal:"#stdButton_Normal.png",pressed:"#stdButton_Pressed.png",disabled:"#stdButton_Forbid.png",text:"Restart",size:32,strokeColor:cc.color(0,0,0,255)}
            )
        ).addTo(this).align(display.RIGHT_CENTER,0,-100).onClick(function(){mainUI.restartGame();}.bind(this));
    },

    onEnter:function(){
        this._super();
        //this.addListener(PROTOCOL.SET_AVATAR,function(a){ModelUIController.close()})
    }
});

var WaitGameSetting=cc.Node.extend({
    ctor:function(mainUI){
        this._super();  
        (new zy.Button
            (
                {normal:"#stdButton_Normal.png",pressed:"#stdButton_Pressed.png",disabled:"#stdButton_Forbid.png",text:"Return",size:32,strokeColor:cc.color(0,0,0,255)}
            )
        ).addTo(this).align(display.RIGHT_CENTER,-80,-100).onClick(function(){mainUI.goPrevious();}.bind(this));
    },

    onEnter:function(){
        this._super();
        var waitItem=ccs.load(res.BOMB_WAIT_JSON).node;
        waitItem.addTo(this).pos(-bb.playRectOffX-160, -bb.playRectOffY+50);
        this.addListener("LOGIN_USER_CNT",function(evt){
            var waitCnt = bb.roomCapacity-evt.getUserData();
            if (waitCnt==0) {
                ModelUIController.close()
            } else {
                utils.seekWidgetByName(waitItem, "TextField_usercnt").setString(waitCnt);
            }
        }.bind(this));
    }
});

//despreated
bb.WinLayer = cc.LayerColor.extend({
    pus : null,

    ctor : function(mainUI) 
    {
        this._super();

        //1、创建一个layer用于存放弹窗，layer的宽和高等于弹窗图片的大小
        var layer = new cc.LayerColor(cc.color(0,0,0,0), 400, 228);
        layer.x = 400 - (layer.width/2);
        layer.y = (layer.height/2);

        //2、创建弹窗图片
        //var tc = new cc.Sprite('res/tc.png');
        //tc.x = layer.width / 2;
        //tc.y = layer.height / 2;
        //layer.addChild(tc);


        var tc=cc.Scale9Sprite.create("common_box.png",cc.rect(100,50,10,10));
        tc.x = layer.width / 2;
        tc.y = layer.height / 2;
        tc.width = 400;
        tc.height = 228;
        layer.addChild(tc);


        //3、弹窗的按钮
        var bnt = new cc.MenuItemImage( 'res/bnt.png', 'res/bnt.png', function () {  
            this.pus.hidden(this.pus, function(){
                mainUI.goPrevious();
            });
        }, this );

        bnt.x = layer.width / 2 -100;
        bnt.y = 35;
        var menu = new cc.Menu(bnt);  
        menu.x = 0;   
        menu.y = 0;  
        layer.addChild(menu);

        bnt = new cc.MenuItemImage( 'res/bnt.png', 'res/bnt.png', function () {  
            this.pus.hidden(this.pus, function(){
                mainUI.restartGame();
            });

        }, this ); 
        bnt.x = layer.width / 2 +100;
        bnt.y = 35;
        var menu = new cc.Menu(bnt);  
        menu.x = 0;   
        menu.y = 0;  
        layer.addChild(menu);

        /* parameter: 
            layer
            if visible on load
            if close by click outside
        */
        this.pus = new Popups(layer, true, false);
    },

    getTc : function () {
        return this.pus;
    }
});

//despreated
bb.EndLayer = cc.LayerColor.extend({
    pus : null,

    ctor : function(mainUI) 
    {
        this._super();

        //1、创建一个layer用于存放弹窗，layer的宽和高等于弹窗图片的大小
        var layer = new cc.LayerColor(cc.color(0,0,0,0), 400, 228);
        layer.x = 400 - (layer.width/2);
        layer.y = (layer.height/2);

        var tc=cc.Scale9Sprite.create("common_box.png",cc.rect(100,50,10,10));
        tc.x = layer.width / 2;
        tc.y = layer.height / 2;
        tc.width = 400;
        tc.height = 228;
        layer.addChild(tc);


        //3、弹窗的按钮
        var bnt = new cc.MenuItemImage( 'res/bnt.png', 'res/bnt.png', function () {  
            this.pus.hidden(this.pus, function(){
                mainUI.goPrevious();
            });
        }, this );
         
        bnt.x = layer.width / 2 -100;
        bnt.y = 35;
        var menu = new cc.Menu(bnt);  
        menu.x = 0;   
        menu.y = 0;  
        layer.addChild(menu);

        bnt = new cc.MenuItemImage( 'res/bnt.png', 'res/bnt.png', function () {  
            this.pus.hidden(this.pus);
        }, this ); 
        bnt.x = layer.width / 2 +100;
        bnt.y = 35;
        var menu = new cc.Menu(bnt);  
        menu.x = 0;   
        menu.y = 0;  
        layer.addChild(menu);

        /* parameter: 
            layer
            if visible on load
            if close by click outside
        */
        this.pus = new Popups(layer, true, false);
    },

    getTc : function () {
        return this.pus;
    }
});

var HelloWorldLayer = cc.Layer.extend({
    myChar:null,
    roomId:'',
    otherChars:[],
    currentBomb:null,
    mapInited:false,
    mapInfo:null,
    _sioClient:null,
    bottomItem:null,
    bottomLeftMenuItem:null,
    gameOver:true,
    topItem:null,
    traceStack:[],
    joystick:null,

    _existInOthers:function(playerName) {
       var tChars = this.otherChars;
       for(var i=0;i<tChars.length;i++) {
            if(tChars[i].spriteId == playerName) {
                return true;
            }
       }
       return false;
    },

    getCharNick:function(playerName) {
       var tChars = this.otherChars;

       for(var i=0;i<tChars.length;i++) {
            if(tChars[i].spriteId == playerName) {
                return tChars[i].spriteNick;
            }
       }
       return "";
    },

    clearRoom:function() {
        this.myChar = null;
        this.otherChars = [];
        this.mapInited = false;
        this.currentBomb = null;
        this.removeAllChildren();
    },

    restartGame:function() {
        var me;
        ModelUIController.close();
        this.clearNickMenu();

        for(var i=0;i<this.otherChars.length;i++) {
            this.otherChars[i].removeFromParent();
        }
        this.otherChars = [];
        this.myChar.restartThenUnHide();
        this.myChar.setMyDefine(bb.playerDefine);

        this.removeInitMap();

        this.mapInited = false;
        this.mapInfo = new cc._Dictionary();

        me = this;
        var cb = function(userInfo) {
            var userInfoObj = JSON.parse(userInfo);
            zy.qqJson.G1 = userInfoObj.G1>0?userInfoObj.G1:0;
            zy.qqJson.G2 = userInfoObj.G2>0?userInfoObj.G2:0;

            me.topItem && utils.seekWidgetByName(me.topItem, "TextField_gold").setString(userInfoObj.G1);
            me.topItem && utils.seekWidgetByName(me.topItem, "TextField_diam").setString(userInfoObj.G2);

            me._sioClient.json.emit('init', {'name': me.myChar.getId(), 'nick': me.myChar.getNick(), 'img': me.myChar.getImg(), 'roomId': me.roomId});
            me.showWaitGameUi();
        };

        this.setItemsNumByDefine(bb.playerDefine);

        var queryStr = backAddr + "/index/getGold/";
        queryStr += '?qid='+zy.qqJson.QID;
        queryStr += '&tk='+zy.qqJson.TK;

        //zy.sendRequest(queryStr,"",false,cb,cb);

        // if fail to get result for 3 times, then go back to login scene.
        bb.send3GetRequest(queryStr, cb);
    },    

    goPrevious:function() {
        cc.log("go pre");
        //cc.director.runScene(new StartScene());

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new StartScene());
        }, this);

    },

    onExit:function() {
        cc.log("exiting");
        this.clearRoom();
        if(this._sioClient != null) {
            this._sioClient.disconnect();
            //this._sioClient = null;
        }
        this._super();
    },

    drawBackground:function() {
        var grass1Sprite;
        var wall2Sprite;
        var size = cc.winSize;

        // add bg
        var bgSprite = new cc.Sprite(res.BackGround_png).addTo(this);
        bgSprite.attr({
            x: size.width / 2 - bb.playRectOffX,
            y: size.height / 2 - bb.playRectOffY,
        });

/*
        for(var i=0;i<19;i++) {
            for(var j=0;j<13;j++) {
                wall2Sprite = new cc.Sprite("#wall_3.png");
                wall2Sprite.setAnchorPoint(0, 0);
                wall2Sprite.setPosition((i*bb.baseSpriteWidth-bb.baseSpriteWidth*2), (j*bb.baseSpriteWidth-(bb.baseSpriteWidth*2+4)));
                this.addChild(wall2Sprite);
            }
        }
*/

        this.topItem=ccs.load(res.TOP_BAR2_JSON).node;
        this.topItem.addTo(this).pos(0-bb.playRectOffX, size.height-this.topItem.height-bb.playRectOffY);

        zy.qqJson.G1 = zy.qqJson.G1>0?zy.qqJson.G1:0;
        zy.qqJson.G2 = zy.qqJson.G2>0?zy.qqJson.G2:0;

        utils.seekWidgetByName(this.topItem, "TextField_gold").setString(zy.qqJson.G1);
        utils.seekWidgetByName(this.topItem, "TextField_diam").setString(zy.qqJson.G2);

        var headImgName = AvatarIcon[zy.qqJson.QIMG];
        utils.seekWidgetByName(this.topItem, "Image_7").loadTexture(headImgName||"blank_icon.png",ccui.Widget.PLIST_TEXTURE);


        this.bottomItem=ccs.load(res.BOMB_BOTTOM_BAR_JSON).node;
        this.bottomItem.addTo(this).pos(50, -bb.playRectOffY+10);
        this.setItemsNumByDefine(bb.playerDefine);


        this.bottomLeftMenuItem=ccs.load(res.BOMB_LEFT_MENU_JSON).node;
        this.bottomLeftMenuItem.addTo(this).pos(-bb.playRectOffX+5, 50);

/*
        for(var i=0;i<15;i++) {
            for(var j=0;j<9;j++) {
                grass1Sprite = new cc.Sprite("#grass_11.png");
                grass1Sprite.setAnchorPoint(0, 0);
                grass1Sprite.setPosition((i*bb.baseSpriteWidth), (j*bb.baseSpriteWidth));
                this.addChild(grass1Sprite);
            }
        }
*/
        this.showWaitGameUi();
    },

    setNickMenu:function(nick, orderId) {
        utils.seekWidgetByName(this.bottomLeftMenuItem,"Nick_TextField_"+orderId).setString(nick);
    },

    clearNickMenu:function() {
        for(var i=1;i<5;i++) 
            utils.seekWidgetByName(this.bottomLeftMenuItem,"Nick_TextField_"+i).setString(" ");
    },

    getRandomCharName:function() {
        var aphabets =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var nick = "";
        for(var i=0;i<6;i++) {
            nick += aphabets[Math.floor(Math.random()*aphabets.length)];
        } 
        return nick;
    },

    startTraceTimer:function() {
        var interval = 50; 
        var then = Date.now();
        var _parent = this;

        if(!this.traceTimer) {
            this.traceTimer = function() {                
                var now = Date.now();
                var delta = now - then;
                
                if(delta>interval) {
                    if(_parent.traceStack.length == 0)
                        return;         
                    then = now - (delta%interval);
                    var data = _parent.traceStack.shift();

                    _parent.otherChars.forEach(function traceTo(oneChar) {
                        if(oneChar.spriteId == data.name) {
                            oneChar.setTrace(data.posX, data.posY);
                            oneChar.setAni();
                            oneChar.setPos(data.posX, data.posY);
                        }
                    });
                }
            }.bind(this);
        }

        this.schedule(this.traceTimer,0);
    },

    ctor:function () {
        var size = cc.winSize;
        var closeItem;
        var bombItem;
        var room = "room1";
        var name,nick;
//var ua;
        var _parent;
        var connStatus;
        var bgSprite;
        var wall1Sprite;
        var menu;
        var bottomLeftMenuItem;

        this._super();
        this.init(); 
        this.otherChars = [];

        options = {
            'secure':                    false,
            'connect timeout':           50000000,
            'forceNew':                  true,
            'try multiple transports':   true,
            'reconnection':              false,
            'sync disconnect on unload': true,
            'remember transport':        true,
            'transports': ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
        };
        
        this._sioClient = SocketIO.connect(sockAddr,options);

        this._sioClient.tag = "Cocos2d-JS Client1";

        this.mapInfo = new cc._Dictionary();

/*  
        // background texture seems should be set under openGL enviourment, QQ browser doesn't support that.
        bgSprite = new cc.Sprite(res.layerBg_png);
        bgSprite.setAnchorPoint(0, 0);
        bgSprite.setPosition(0, 0);
        bgSprite.setTextureRect(this.getBoundingBox());

        //bgSprite.getTexture().setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
        bgSprite.getTexture().setTexParameters(9729, 9729, 10497, 10497);
 
        //var param = {};
        //param.minFilter = 9729;
        //param.magFilter = 9729;
        //param.wrapS = 10474;
        //param.wrapT = 10474;
        //bgSprite.getTexture().setTexParameters(param);

        this.addChild(bgSprite);
*/

        this.drawBackground();

//cc.log("texture info:" + cc.textureCache.dumpCachedTextureInfo());

        connStatus = function() {
            cc.log("conn status:" + navigator.onLine);
            if(!navigator.onLine) {
                _parent.goPrevious();
            }
        }

        //name = window.prompt("请输入：");
        //if(!name || name=="") {
        //    _parent.goPrevious();
        //}

        //name = bombmanId;
        name = this.getRandomCharName();
        nick = bombmanNick;

        // add a "set bomb" icon to exit the progress. it's an autorelease object
        closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("close Menu is clicked!");
                this.goPrevious();
            }, this);

        closeItem.attr({
            x: 854-200-40,
            y: 10*bb.baseSpriteWidth-10,
            anchorX: 0.5,
            anchorY: 0.5
        });

        menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

//ua = window.navigator.userAgent;
//start = new Date().getTime();

        this.startTraceTimer();
        _parent = this;

//if(zy.qqJson.QIMG>4) zy.qqJson.QIMG=4;
//var userImgHead = "c2";
        var userImgHead = "c"+zy.qqJson.Char;

        this.myChar = new mySprite(userImgHead,res.bombChars_plist,res.bombChars_png,this,9000);
        this.myChar.setId(name);
        this.myChar.setNick(nick);
        this.myChar.setImg(zy.qqJson.Char);

        this.myChar.setMyDefine(bb.playerDefine);

        this.joystick = new Joystick("#JoystickBG.png", "#Joystick.png", 50, TouchType.FOLLOW, DirectionType.FOUR, this.myChar);
        this.joystick.setPosition(cc.p(-100, 0));
        this.joystick.setSpeedwithLevel1(1);
        this.joystick.setOpacity(128);
        //this.joystick.callback = this.onCallback.bind(this);
        this.addChild(this.joystick, 10000, 101);

        this._sioClient.on('connect',function() {
            _parent._sioClient.heartbeatTimeout = 5000;
        });

        this._sioClient.on('connected', function(data) {
            _parent._sioClient.json.emit('init', {'name': name, 'nick': nick, 'img':zy.qqJson.Char, 'roomId': _parent.roomId});
        });

        this._sioClient.on('otherlogin', function(data) {
            var oneChar = null;
            var userData = data.userData;
            var isStart = data.isStart;
            var map;
            var items;
            
            _parent.roomId = data.roomId;
            _parent.dispatchEvent("LOGIN_USER_CNT",userData.length);

            if(!_parent.mapInited) {
                map = data.map.mapData;
                items = data.map.itemsData;
                _parent.drawInitMap(map,items);
                _parent.mapInited = true;
            }

            if(_parent.myChar != null) {
                _parent.myChar.setStart(isStart);
                if(isStart) {
                    ModelUIController.close()
                    _parent.gameOver=false;
                }
            }

            userData.forEach(function addTo(userObj) {
                var locX,locY;
                locX = userObj.locX;
                locY = userObj.locY;

cc.log(userObj.name +"::"+ userObj.nick +"::"+ userObj.img +"::"+ userObj.G1 +"::"+_parent.myChar.spriteId +"::"+ _parent._existInOthers(userObj.name));
                _parent.setNickMenu(userObj.nick, userObj.loginOrder);

               if(userObj.name != _parent.myChar.spriteId && !_parent._existInOthers(userObj.name)) {
                    var userImgHead = "c"+userObj.img;
                    var oneChar = new otherSprite(userImgHead,res.bombChars_plist,res.bombChars_png,_parent,9000);
                    cc.log("other onecharName:" + userObj.name);
                    cc.log("other onecharOrder:" + userObj.loginOrder);
                    oneChar.setAnchorPoint(0, 0);
                    oneChar.setPos(locX*bb.baseSpriteWidth, locY*bb.baseSpriteWidth);
                    oneChar.setScale(0.2);
                    oneChar.setRotation(0);
                    oneChar.setId(userObj.name);
                    oneChar.setNick(userObj.nick);
                    _parent.otherChars.push(oneChar);
                } else if(userObj.name == _parent.myChar.spriteId) {
                    cc.log("my onecharOrder:" + userObj.loginOrder);
                    _parent.myChar.setAnchorPoint(0, 0);
                    _parent.myChar.setPos(locX*bb.baseSpriteWidth, locY*bb.baseSpriteWidth);
                }
            });
        });

        this._sioClient.on('trace', function(data) {
            if(_parent.gameOver)
                return;
            _parent.traceStack.push(data);
        });

        this._sioClient.on('undead', function(data) {
            if(_parent.gameOver)
                return;

            _parent.otherChars.forEach(function undeadTo(oneChar) {
                if(oneChar.spriteId == data.name) {
                    oneChar.aniUndead();
                }
            });
        });

        this._sioClient.on('candead', function(data) {
            if(_parent.gameOver)
                return;

            if(data.name == _parent.myChar.spriteId) {
                _parent.myChar.stopAniUndead();
            } else {
                _parent.otherChars.forEach(function undeadTo(oneChar) {
                    if(oneChar.spriteId == data.name) {
                        oneChar.stopAniUndead();
                    }
                });
            }
        });

        this._sioClient.on('explore', function(data) {
cc.log("explore data:"+JSON.stringify(data));
            if(_parent.gameOver)
                return;

            var _bomb, _bombname, _owner;
            bombname = data.bomb;
            _bomb = _parent.mapInfo.objectForKey(bombname);

            if(_bomb != null) {
                _bomb.explosion(data.wall, data.names);
            }

            _owner = _bomb.getBombOwner();
            if(_owner && _owner == _parent.myChar.spriteId) {
                _parent.myChar.recoverBombLeft();
            }

            if(data.lastPlayer) {
                _parent.gameOver=true;
                _parent.showWinGameUi(data.lastPlayer);
                _parent.myChar.setStart(false);
            } 
            //if last kill killed al the lefted player, then lastplayer should be  "noone", not to show win UI.
            else if(CommonFunc.isInArray(data.names, _parent.myChar.spriteId)) {
                _parent.showEndGameUi(data.lastPlayer);
            }
        });

        this._sioClient.on('bomb', function(data) {
            if(_parent.gameOver)
                return;
            _parent.setOtherBomb(data.name, data.posX, data.posY, data.bType, data.bLength);
        });

        //他のユーザーがログアウトした場合
        this._sioClient.on('left', function(data) {
            var uname = data.uname;
            cc.log(uname + " left");
            cc.log("lastUser:" + data.lastPlayer);
            _parent.otherChars.forEach(function traceTo(oneChar) {
                cc.log(oneChar.spriteId + " to be remove");
                if(oneChar.spriteId == uname) {
                    oneChar.remove();
                    cc.log("removed " + oneChar.spriteId)
                }
            });

            if(data.lastPlayer) {
                _parent.showWinGameUi(data.lastPlayer);
            }
        });

        //道具を消す
        this._sioClient.on('getItem', function(data) {
            if(_parent.gameOver)
                return;

            var ifItemName = data.itemName,
                ifItemObj;

cc.log("get item:"+ ifItemName);

            ifItemObj = _parent.mapInfo.objectForKey(ifItemName);
            if(ifItemObj != null) {
                _parent.mapInfo.removeObjectForKey(ifItemName);
                ifItemObj.removeFromParent();
            }    
        });

        //自らネットワークで不具合発生した場合
        this._sioClient.on('disconnect', function(err) {
            cc.log("disconnect:" + err);
            //this._sioClient = null;
            _parent.goPrevious();
        }); 

/*        
        this._sioClient.on('error', function(err) {
            cc.log("error:" + err);
        }); 

        this._sioClient.on('connect_failed', function(err) {
            cc.log("connect_failed:" + err);
        });   
*/

        return true;
    },

    onCallback: function() {
        var angle = this.getChildByTag(101).getAngle();
        cc.log("回调:" + angle);
    },

    drawInitMap:function(mapArr,itemsArr) {
        var wall1Sprite,
            wall1Sprite,
            spriteName,
            offsetX = 0,
            offsetY = 0,
            posX,
            posY,
            col,
            row,
            itemLocX,
            itemLocY,
            skiSprite,
            fireSprite,
            bombSprite,
            superSprite;

        for(var i=0;i<itemsArr.length;i++) {
            itemLoc = itemsArr[i][0];
            row = parseInt(itemLoc/15);
            col = itemLoc%15;
            posX = offsetX + col*bb.baseSpriteWidth;
            posY = offsetY + row*bb.baseSpriteWidth;
            spriteName = "i_"+col+"_"+row;

            if(itemsArr[i][1] == 0) {
                skiSprite = new cc.Sprite("#item_ski.png");
                skiSprite.setAnchorPoint(0, 0);
                skiSprite.setPosition(posX, posY);
                skiSprite.setTag("ski");
                this.addChild(skiSprite);
                this.mapInfo.setObject(skiSprite, spriteName);
            }
            else if(itemsArr[i][1] == 1) {
                fireSprite = new cc.Sprite("#item_fire.png");
                fireSprite.setAnchorPoint(0, 0);
                fireSprite.setPosition(posX, posY);
                fireSprite.setTag("fire");
                this.addChild(fireSprite);
                this.mapInfo.setObject(fireSprite, spriteName);
            }
            else if(itemsArr[i][1] == 2) {
                bombSprite = new cc.Sprite("#item_bomb.png");
                bombSprite.setAnchorPoint(0, 0);
                bombSprite.setPosition(posX, posY);
                bombSprite.setTag("bomb");
                this.addChild(bombSprite);
                this.mapInfo.setObject(bombSprite, spriteName);
            }
            else if(itemsArr[i][1] == 3) {
                superSprite = new cc.Sprite("#item_money1.png");
                superSprite.setAnchorPoint(0, 0);
                superSprite.setPosition(posX, posY);
                superSprite.setTag("super");
                this.addChild(superSprite);
                this.mapInfo.setObject(superSprite, spriteName);
            }
        }

        for(var i=mapArr.length;i>=0;i--) {
            row = parseInt(i/15);
            col = i%15;
            posX = offsetX + col*bb.baseSpriteWidth;
            posY = offsetY + row*bb.baseSpriteWidth;
            spriteName = "s_"+col+"_"+row;

            if(mapArr[i] == 1) {
                wall1Sprite = new cc.Sprite("#wall_11.png");
                wall1Sprite.setAnchorPoint(0, 0);
                wall1Sprite.setPosition(posX, posY);
                wall1Sprite.wallType = 1;
                wall1Sprite.setLocalZOrder(9000-posY);
                this.addChild(wall1Sprite);
                this.mapInfo.setObject(wall1Sprite, spriteName);
            }
            else if(mapArr[i] == 2) {
                wall2Sprite = new cc.Sprite("#wall_21.png");
                wall2Sprite.setAnchorPoint(0, 0);
                wall2Sprite.setPosition(posX, posY);
                wall2Sprite.wallType = 2;
                wall2Sprite.setLocalZOrder(9000-posY);
                this.addChild(wall2Sprite);
                this.mapInfo.setObject(wall2Sprite, spriteName);
            }
        }
    },

    removeInitMap:function() {
        var allkeys = [],
            delObj;
       
        allkeys = this.mapInfo.allKeys();
        for(var i=0;i<allkeys.length;i++) {
            delObj = this.mapInfo.valueForKey(allkeys[i]);
            delObj.removeFromParent();
        }
    },

    setOtherBomb:function(bombName, posX, posY, bType, bLength) {
        var bomb = new bombSprite("#bomb_1.png",res.BombAct_plist,res.BombAct_png,this,0);
        this.mapInfo.setObject(bomb, bombName);
        bomb.setId(bombName);
        bomb.setAnchorPoint(0, 0);
        bomb.setPos(posX, posY);
        bomb.setBombType(bType);
        bomb.setBombLength(bLength);
    },

    showEndGameUi:function(player) {
        ModelUIController.close();
        var es = new EndGameSetting(this);
        var t1 = function() {ModelUIController.showModel(es, c={color:cc.color(0,0,0,127),offset:{x:bb.playRectOffX,y:bb.playRectOffY},center:!0,popup:!0,closeOnTouchBlank:0,closeWidgets:["CloseButton"]})}.bind(this);

        this.scheduleOnce(t1,2);
/*
        var endGame = this.getChildByTag(1001);
        var winGame = this.getChildByTag(1002);

        if(winGame != null || endGame != null) {
            return;
        }

        //var endGameLayer = new endGameUI(this,"player");
        //endGameLayer.setPosition(new cc.p(-bb.playRectOffX, -bb.playRectOffY));
        //this.addChild(endGameLayer,10001,1001);

        var pp = new bb.EndLayer(this);
        var pp1 = pp.getTc();
        pp1.setPosition(new cc.p(-bb.playRectOffX, -bb.playRectOffY));
        this.addChild(pp1,10001,1001);
*/
    },


    showWinGameUi:function(player) {
        ModelUIController.close();
        var es = new WinGameSetting(this, player);
        var t1 = function () {ModelUIController.showModel(es, c={color:cc.color(0,0,0,127),offset:{x:bb.playRectOffX,y:bb.playRectOffY},center:!0,popup:!0,closeOnTouchBlank:0,closeWidgets:["CloseButton"]})}.bind(this);
        
        this.scheduleOnce(t1,2);
/*
        var endGameUI = this.getChildByTag(1001);
        var winGame = this.getChildByTag(1002);

        if(winGame != null) {
            return;
        }
        if(endGameUI != null) {
            cc.log("endGameUI remove.");
            endGameUI.removeFromParent();
        }

        //var winGameLayer = new winGameUI(this,player);
        //winGameLayer.setPosition(new cc.p(-bb.playRectOffX, -bb.playRectOffY));
        //this.addChild(winGameLayer,10001,1002);

        var pp = new bb.WinLayer(this);
        var pp1 = pp.getTc();
        pp1.setPosition(new cc.p(-bb.playRectOffX, -bb.playRectOffY));
        this.addChild(pp1,10001,1002);
*/
    },

    showWaitGameUi:function() {
        ModelUIController.close();
        var es = new WaitGameSetting(this);
        ModelUIController.showModel(es, 
            c={
                color:cc.color(0,0,0,127),
                offset:{x:bb.playRectOffX,y:bb.playRectOffY},
                center:!0,
                popup:!0,
                closeOnTouchBlank:0,
                closeWidgets:["CloseButton"]
            }
        )
    },

    setItemsNumByDefine:function(define) {
        utils.seekWidgetByName(this.bottomItem, "TextField_bombNum").setString(define.bombItemCnt+1);
        utils.seekWidgetByName(this.bottomItem, "TextField_fireNum").setString(define.fireItemCnt+1);
        utils.seekWidgetByName(this.bottomItem, "TextField_skiNum").setString(define.skiItemCnt+1);
        utils.seekWidgetByName(this.bottomItem, "TextField_moneyNum").setString(0);
    },

    setItemsNum:function(key, num) {
        if(key=="bomb") {
            utils.seekWidgetByName(this.bottomItem, "TextField_bombNum").setString(num+1);
        }
        else if(key=="fire") {
            utils.seekWidgetByName(this.bottomItem, "TextField_fireNum").setString(num+1);
        }
        else if(key=="ski") {
            utils.seekWidgetByName(this.bottomItem, "TextField_skiNum").setString(num+1);
        }
        else if(key=="super") {
            utils.seekWidgetByName(this.bottomItem, "TextField_moneyNum").setString(num);
        }
    },

    login:function() {

    },
});


var DIR_EAST = 1;
var DIR_SOUTH = 2;
var DIR_WEST = 3;
var DIR_NORTH = 4;
var DIR_NO = 0;

var baseSprite = cc.Sprite.extend({
    _parentLayer:null,
    _spritebatch:null,

    ctor:function(filename,anilist,aniimg,parentLayer,zOrder) {
        this._super(filename);

        if(aniimg && parentLayer) {
            this._parentLayer = parentLayer;
            this._spritebatch = new cc.SpriteBatchNode(aniimg);
            this._spritebatch.addChild(this);
            this.setBatchNode(this._spritebatch);

            if(zOrder>=0) {
                this._parentLayer.addChild(this._spritebatch,zOrder); 
            } else {
                this._parentLayer.addChild(this._spritebatch,1000);                 
            }
        }

        this.initActs();
    },

    setPos:function(posX, posY) {
        this.x = posX;
        this.y = posY;
        //this.getBatchNode().setLocalZOrder(9000-posY);
        this._spritebatch.setLocalZOrder(9000-posY);
    },

    setScale:function(scale) {
        this.attr.scale = scale;
    },

    setRotation:function(rotation) {
        this.attr.rotation = rotation;
    },

    setId:function(id) {
        this.spriteId = id;
    },

    setNick:function(nick) {
        this.spriteNick = nick;
    },

    setImg:function(img) {
        this.spriteImg = img;
    },

    getId:function() {
        return this.spriteId;
    },

    getNick:function() {
        return this.spriteNick;
    },

    getImg:function() {
        return this.spriteImg;
    }
});

var bombSprite = baseSprite.extend({
    bombAct:null,
    ep:null,
    _bombLength:2,
    _bombType:1,
    _owner:null,

    initActs:function() {
        var bombAnimFrames = [],
            str = "",
            frame,
            animation;

        for (var i = 1; i < 3; i++) {        
            str = "bomb_" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            bombAnimFrames.push(frame);
        }
        animation = new cc.Animation(bombAnimFrames);
        animation.setDelayPerUnit(0.3);
        this.bombAct = cc.animate(animation).repeatForever();
        this.runAction(this.bombAct);
    },

    setBombType:function(type) {
        this._bombType = type;
    },

    setBombLength:function(len) {
        this._bombLength = len;
    },

    setBombOwner:function(spriteId) {
        this._owner = spriteId;
    },

    getBombOwner:function() {
        return this._owner;
    },

    remove:function() {
        this._parentLayer.removeChild(this._spritebatch); 
        this._parentLayer.mapInfo.removeObjectForKey(this.spriteId);
        this._parentLayer.removeChild(this); 
    },

    _locInData:function(arr,locX,locY) {
        for(var i=0;i<arr.length;i++) {
            //If wall in remote data
            if(locX == arr[i][0] && locY == arr[i][1]) {
                // return wallType
                return arr[i][2];
            }
        }
        return -1;
    },

    _mapProcess:function(wall,locX,locY,dirEnd,cn) {
            var objectKey,mapObject,wallType;

            objectKey = "s_" + locX + "_" + locY;
            wallType = this._locInData(wall, locX, locY);

            if(wallType != -1) {
                mapObject = this._parentLayer.mapInfo.objectForKey(objectKey);

                //if collide to wall
                if(mapObject != null) {
                    if(mapObject.wallType == 1) {
                        this._parentLayer.mapInfo.removeObjectForKey(objectKey);
                        this._parentLayer.removeChild(mapObject);                        
                    }
                    dirEnd = true;
                }
            }

            return dirEnd;
    },

    _bombProcess:function(tPx,tPy,rot) {
        var fireball;
        fireball = new cc.Sprite("#fireball.png");
        fireball.rotation=rot;
        fireball.setPosition(tPx, tPy);
        this._parentLayer.addChild(fireball);
        return fireball;
    },

    _playerProcess:function(names) {
        var thischar;

        for(var j=0;j<names.length;j++) {
            if(this._parentLayer.myChar.spriteId == names[j]) {
                this._parentLayer.myChar.isKilled(names[j]);
            }
        }

        for(var i=0;i<this._parentLayer.otherChars.length;i++) {
            thischar = this._parentLayer.otherChars[i];
            for(var j=0;j<names.length;j++) {
                if(thischar.spriteId == names[j]) {
                    cc.log(names[j] + "should be hide.");
                    thischar.loseThenHide();
                }
            }
        }
    },

    explosion:function(wall, names) {
        var cn = 1,
            east=[],south=[],west=[],north=[],
            fireball,
            px,py,
            locX,locY,
        
            objectKey,
            mapObject,
            sceneSizeFromX = 0,
            sceneSizeFromY = 0,
            eastEnd=false,westEnd=false,northEnd=false,southEnd=false,

        px = this.x;
        py = this.y;

        playsound("bonus_bomb");
        //this._parentLayer.myChar.recoverBombLeft();

        locX = (px-sceneSizeFromX)/bb.baseSpriteWidth;
        locY = (py-sceneSizeFromY)/bb.baseSpriteWidth;

        this.ep = function() {
            var locX1 = locX+1*cn;
            var locY1 = locY;
            var tPx = this.x+(bb.baseSpriteWidth*cn)+15;
            var tPy = this.y+15;
            var wallType = -1;
            var bGap=12;

            if(locX1>=0 && locX1<15 && locY1>=0 && locY1<9 && !eastEnd) {
                eastEnd = this._mapProcess(wall,locX1,locY1,eastEnd);
                if(!eastEnd) {
                    var fb = this._bombProcess(tPx,tPy,90);
                    east.push(fb);

                    fb = this._bombProcess(tPx+bGap,tPy,90);
                    east.push(fb);

                    fb = this._bombProcess(tPx+2*bGap,tPy,90);
                    east.push(fb);
                }
            }

            locX1 = locX-1*cn;
            locY1 = locY;
            tPx=this.x-(bb.baseSpriteWidth*cn)+15;
            tPy=this.y+15;


            if(locX1>=0 && locX1<15 && locY1>=0 && locY1<9 && !westEnd) {
                westEnd = this._mapProcess(wall,locX1,locY1,westEnd);
                if(!westEnd) {
                    var fb = this._bombProcess(tPx,tPy,90);
                    west.push(fb);

                    fb = this._bombProcess(tPx-bGap,tPy,90);
                    west.push(fb);

                    fb = this._bombProcess(tPx-2*bGap,tPy,90);
                    west.push(fb);
                }
            }

            locX1 = locX;
            locY1 = locY+1*cn;
            tPx=this.x+15;
            tPy=this.y+(bb.baseSpriteWidth*cn)+15;

            if(locX1>=0 && locX1<15 && locY1>=0 && locY1<9 && !northEnd) {
                northEnd = this._mapProcess(wall,locX1,locY1,northEnd);
                if(!northEnd) {
                    var fb = this._bombProcess(tPx,tPy,0);
                    north.push(fb);

                    fb = this._bombProcess(tPx,tPy+bGap,0);
                    north.push(fb);

                    fb = this._bombProcess(tPx,tPy+2*bGap,0);
                    north.push(fb);
                }
            }

            locX1 = locX;
            locY1 = locY-1*cn;
            tPx=this.x+15;
            tPy=this.y-(bb.baseSpriteWidth*cn)+15;

            if(locX1>=0 && locX1<15 && locY1>=0 && locY1<9 && !southEnd) {
                southEnd = this._mapProcess(wall,locX1,locY1,southEnd);
                if(!southEnd) {
                    var fb = this._bombProcess(tPx,tPy,0);
                    south.push(fb);

                    fb = this._bombProcess(tPx,tPy-bGap,0);
                    south.push(fb);

                    fb = this._bombProcess(tPx,tPy-2*bGap,0);
                    south.push(fb);
                }
            }

            if(cn>=this._bombLength) {
                this._playerProcess(names);

                for(var i=0;i<cn;i++) {
                    var obj = east.pop();
                    this._parentLayer.removeChild(obj);

                    obj = east.pop();
                    this._parentLayer.removeChild(obj);

                    obj = east.pop();
                    this._parentLayer.removeChild(obj);
                }
                for(var i=0;i<cn;i++) {
                    var obj = south.pop();
                    this._parentLayer.removeChild(obj);

                    obj = south.pop();
                    this._parentLayer.removeChild(obj);

                    obj = south.pop();
                    this._parentLayer.removeChild(obj);
                }
                for(var i=0;i<cn;i++) {
                    var obj = north.pop();
                    this._parentLayer.removeChild(obj);

                    obj = north.pop();
                    this._parentLayer.removeChild(obj);

                    obj = north.pop();
                    this._parentLayer.removeChild(obj);
                }
                for(var i=0;i<cn;i++) {
                    var obj = west.pop();
                    this._parentLayer.removeChild(obj);

                    obj = west.pop();
                    this._parentLayer.removeChild(obj);

                    obj = west.pop();
                    this._parentLayer.removeChild(obj);
                }

                this.unschedule(this.ep);
                this.remove();
            }
            cn++;
        }

        this.schedule(this.ep,0.2);
    }

});



var baseCharSprite = baseSprite.extend({
    dir:DIR_NO,
    spriteId:null,
    spriteNick:null,
    spriteImg:null,
    animation:null,
    undead:null,
    posStack:[],
    eastAct:null,
    southAct:null,
    westAct:null,
    northAct:null,
    deadAct:null,
    bornAct:null,
    undeadAct:null,
    charId : "c1",

    
    ctor:function(charId,anilist,aniimg,parentLayer,zOrder) {
        var filename = "#"+ charId +"d1.png";
        this.charId = charId;
        this._super(filename,anilist,aniimg,parentLayer,zOrder);
    },

    initActs:function() {
        var eastAnimFrames = [],
            southAnimFrames = [],
            westAnimFrames = [],
            northAnimFrames = [],
            deadAnimFrames = [],
            bornAnimFrames = [],
            undeadAnimFrames = [],
            str = "",
            frame,
            animation;

        for (var i = 1; i <= 4; i++) {        
            str = this.charId + "r" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            eastAnimFrames.push(frame);
        }
        animation = new cc.Animation(eastAnimFrames);
        animation.setDelayPerUnit(0.2);
        this.eastAct = cc.animate(animation).repeatForever();

        for (var i = 1; i <= 4; i++) {        
            str = this.charId + "d" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            southAnimFrames.push(frame);
        }
        animation = new cc.Animation(southAnimFrames);
        animation.setDelayPerUnit(0.2);
        this.southAct = cc.animate(animation).repeatForever();

        for (var i = 1; i <= 4; i++) {        
            str = this.charId + "l" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            westAnimFrames.push(frame);
        }
        animation = new cc.Animation(westAnimFrames);
        animation.setDelayPerUnit(0.2);
        this.westAct = cc.animate(animation).repeatForever();

        for (var i = 1; i <= 4; i++) {        
            str = this.charId + "u" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            northAnimFrames.push(frame);
        }
        animation = new cc.Animation(northAnimFrames);
        animation.setDelayPerUnit(0.2);
        this.northAct = cc.animate(animation).repeatForever();


        for (var i = 1; i <= 9; i++) {        
            str = "kill" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            deadAnimFrames.push(frame);
        }
        animation = new cc.Animation(deadAnimFrames);
        animation.setDelayPerUnit(0.2);
        this.deadAct = cc.animate(animation).repeatForever();

        for (var i = 1; i <= 8; i++) {        
            str = "born" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            bornAnimFrames.push(frame);
        }

        str = this.charId + "r1.png";
        frame = cc.spriteFrameCache.getSpriteFrame(str);
        bornAnimFrames.push(frame);

        animation = new cc.Animation(bornAnimFrames);
        animation.setDelayPerUnit(0.08);
        this.bornAct = cc.animate(animation);

        this.undead = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("born1.png"));
        for (var i = 1; i <= 9; i++) {        
            str = "born" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            undeadAnimFrames.push(frame);
        }
        this.undead.addTo(this).pos(15,30);
        animation = new cc.Animation(undeadAnimFrames);
        animation.setDelayPerUnit(0.08);
        this.undeadAct = cc.animate(animation).repeatForever();

        this.setDefaultAni();
    },

    setDefaultAni:function() {
        this.stopAllActions();
        this.aniUndead();
        var _self = this;
        var fun = function() {
            _self.stopAniUndead();
        }
        setTimeout(fun, 2000);
    },

    aniUndead:function() {
        this.runAction(this.southAct);

        this.undead.setVisible(true);
        this.undead.stopAllActions();
        this.undead.runAction(this.undeadAct);
    },

    stopAniUndead:function() {
        this.undead.setVisible(false);
        this.undead.stopAllActions();
    },

    aniBorn:function() {
        this.stopAllActions();
        this.runAction(this.bornAct);
        return true;
    },

    aniDead:function() {
        this.stopAllActions();
        this.runAction(this.deadAct);
        return true;
    },

    aniEast:function() {
        if(this.lastDirIndex == DIR_EAST) {
            return false;
        }

        this.stopAllActions();
        this.runAction(this.eastAct);
        return true;
    },

    aniSouth:function() {
        if(this.lastDirIndex == DIR_SOUTH) {
            return false;
        }

        this.stopAllActions();
        this.runAction(this.southAct);
        return true;
    },

    aniWest:function() {
        if(this.lastDirIndex == DIR_WEST) {
            return false;
        }

        this.stopAllActions();
        this.runAction(this.westAct);
        return true;
    },

    aniNorth:function() {
        if(this.lastDirIndex == DIR_NORTH) {
            return false;
        }

        this.stopAllActions();
        this.runAction(this.northAct);
        return true;
    },

    loseThenHide:function() {
        this.aniDead();
    },

    restartThenUnHide:function() {
        this.setMyDefault();
        this.setVisible(true);
    },

    sLog:function() {
        cc.log("111111111");
    },

    posToLoc:function(posX,posY) {
        var px = posX+16,
            py = posY+2,
            bx,by;
        bx = parseInt(px/bb.baseSpriteWidth);
        by = parseInt(py/bb.baseSpriteWidth);

        return {"x":bx,"y":by};
    },

    setTrace:function(posX, posY) {
        var tmpArr = [],firstEle,lastEle;
        var len = this.posStack.length;

        this.posStack.push({"px":Math.round(posX), "py":Math.round(posY)});

        this.dir = DIR_NO;

//cc.log("trace dir:"+this.dir);
//cc.log("trace stack:"+this.posStack);

        if(this.posStack.length>10) {
            tmpArr = this.posStack.slice(this.posStack.length-10);
            firstEle = tmpArr[0];
            lastEle = tmpArr[tmpArr.length-1];

            if(Math.abs(firstEle.px-lastEle.px) >= Math.abs(firstEle.py-lastEle.py)) {
                if(firstEle.px-lastEle.px>0) {
                    this.dir = DIR_WEST;
                } else {
                    this.dir = DIR_EAST;
                }
            } 
            else if(Math.abs(firstEle.px-lastEle.px) < Math.abs(firstEle.py-lastEle.py)) {
                if(firstEle.py-lastEle.py>0) {
                    this.dir = DIR_SOUTH;
                } else {
                    this.dir = DIR_NORTH;
                }
            }
            this.posStack.splice(0,this.posStack.length-10);
        }
    }
});

var otherSprite = baseCharSprite.extend({

    remove:function() {
        var delIndex = this._getSpriteIndex();
        if(delIndex>=0) {
            this._parentLayer.otherChars.splice(delIndex,1);
            //this._spritebatch.removeChild(this);
            //this._parentLayer.removeChild(this._spritebatch); 
            //this._parentLayer.removeChild(this); 
        
            this._spritebatch.removeFromParent();
            this.removeFromParent();
        }
    },

    _getSpriteIndex:function() {
        var thischar;
        for(var i=0;i<this._parentLayer.otherChars.length;i++) {
            thischar = this._parentLayer.otherChars[i];
            if(thischar.spriteId == this.spriteId) {
                return i;
            }
        }
        return false;
    },

    setAni:function() {
        switch(this.dir)
        {
        case DIR_EAST:
            this.aniEast();
            this.lastDirIndex=DIR_EAST;
            break;
        case DIR_SOUTH:
            this.aniSouth();
            this.lastDirIndex=DIR_SOUTH;
            break;
        case DIR_WEST:
            this.aniWest();
            this.lastDirIndex=DIR_WEST;
          break;
        case DIR_NORTH:
            this.aniNorth();
            this.lastDirIndex=DIR_NORTH;
            break;
        default:
            return;
        }
    }

});

var mySprite = baseCharSprite.extend({
    lastDirIndex:-1,
    isStart:false,
    // rect in my sprite for moving, collision 
    // in this case rect is (10,2) -> (22,14) from achor point
    // so the start point offset for this rect should be (10,2)
    spriteRectOffX:10,
    spriteRectOffY:2,
    spriteRectOffX1:22,
    spriteRectOffY1:14,
    
    pace:3,
    bombLeft:1,
    bombType:1,
    bombLength:2,

    bombItemCnt:0,
    fireItemCnt:0,
    skiItemCnt:0,
    superItemCnt:0,

    pointer:null,
    pointerAct:null,

    ctor:function(charId,anilist,aniimg,parentLayer,zOrder) {
        this._super(charId,anilist,aniimg,parentLayer,zOrder);

        this.pointer = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("myPointer.png"));
        this.pointer.addTo(this).pos(15,75);
        this.pointerAct = cc.jumpTo(5, cc.p(15,85), 20, 4).repeatForever();
        
        //var pointerAct1 = cc.spawn(cc.rotateBy(5, -360), cc.rotateBy(5,360), cc.FadeOut.create(5));
        //var pointerAct2 = cc.spawn(cc.rotateBy(5, -360), cc.rotateBy(5,360), cc.FadeIn.create(5));
        //this.pointerAct = cc.sequence(pointerAct1,pointerAct2).repeatForever();

        this.setPointerAni();
        this.setMyDefault();
    },

    setPointerAni:function() {
        this.pointer.runAction(this.pointerAct); 
    },

    setStart:function(isStart) {
        this.isStart = isStart;
    },

    setMyDefault:function() {
        this.bombType = 1;
        this.bombLeft = 1;
        this.bombLength = 2;
        this.pace = 4;

        this.bombItemCnt = 0;
        this.fireItemCnt = 0;
        this.skiItemCnt = 0;
        this.superItemCnt = 0;

        this.pace += this.skiItemCnt;
        this.bombLeft += this.bombItemCnt;
        this.bombLength += this.fireItemCnt;
        this.setDefaultAni();
    },

    setMyDefine:function(define) {
        this.pace = 4;

        this.bombItemCnt = bb.playerDefine.bombItemCnt||0;
        this.fireItemCnt = bb.playerDefine.fireItemCnt||0;
        this.skiItemCnt = bb.playerDefine.skiItemCnt||0;

        this.pace += this.skiItemCnt;
        this.bombLeft += this.bombItemCnt;
        this.bombLength += this.fireItemCnt;
    },

    isKilled:function(name) {
        this.setStart(false);
        this.endMove();
        cc.log("iskilled:" + this.spriteId +":"+name)
        this.loseThenHide();
    },

    schedule2: function (callback, interval) {
        var then = Date.now();
        interval = interval*1000;
        this.schedule(function(){
            var now = Date.now();
            var delta = now - then;
            if(delta > interval){
                then = now - (delta % interval);
                callback.call(this);
            }
        }.bind(this), 0);
    },

    update:function () {
        for (var i = 0; i < 10000000; i++) {
            b = 1/0.22222;
        }
    },

    startMove:function() {
        if(!this.isStart) {
            return;
        }
        this.posStack = [];
        this.dir = DIR_NO;

        var then = Date.now();
        var interval = 70; 

        if(!this.sf) {
            this.sf = function() {
//var _t1 = new Date().getTime();
                
                var now = Date.now();
                var delta = now - then; 
                           
                if(delta>interval && this.moveByDir()) {
                    var loc;
                    then = now - (delta%interval);

                    loc = this.posToLoc(this.x,this.y);
                    var t1 = Date.parse(new Date());
                    this._parentLayer._sioClient.json.emit('trace',  {'name':this.spriteId, 'posX': this.x, 'posY': this.y, 'locX': loc.x, 'locY': loc.y, 't1': t1 });
                }

//var _t2 = new Date().getTime();
//var _t3 = _t2 - _t1;
//this._parentLayer.setNickMenu(_t3,1);
            }.bind(this);
        }

        this.schedule(this.sf,0);
    },

    endMove:function() {
        this.posStack = [];
        this.unschedule(this.sf);
    },

    runAct:function() {
        this.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
    },

    ifGetItem:function(bx,by) {
        var ifItemName = "i_"+bx+"_"+by,
            itemType,
            ifItemObj;


        ifItemObj = this._parentLayer.mapInfo.objectForKey(ifItemName);
        if(ifItemObj != null) {
            playsound("bonus_show");

            itemType = ifItemObj.getTag();
            if(itemType == "super") {
                this.aniUndead();
            }
            this._parentLayer.mapInfo.removeObjectForKey(ifItemName);
            ifItemObj.removeFromParent();
            this._parentLayer._sioClient.json.emit('getItem',  {'name':this.spriteId, 'itemName':ifItemName, 'itemType':itemType});
            this._setMyItems(itemType);
        }
    },

    _setMyItems:function(itemTag) {
        if(itemTag == "bomb") {
            this.bombItemCnt++;
            this._parentLayer.setItemsNum("bomb", this.bombItemCnt);
            this.bombLeft++;
        }
        if(itemTag == "fire") {
            this.fireItemCnt++;
            this._parentLayer.setItemsNum("fire", this.fireItemCnt);
            this.bombLength++;
        }
        if(itemTag == "ski") {
            this.skiItemCnt++;
            this._parentLayer.setItemsNum("ski", this.skiItemCnt);
            this.pace++;
        }
        if(itemTag == "super") {
            this.superItemCnt++;
            this._parentLayer.setItemsNum("super", this.superItemCnt);
        }
    },

    moveByDir:function() {
        if(!this.isStart) {
            return;
        }

        var px = this.x,
            py = this.y,
            rest_val,
            bx,by,
            collisinOffset = 20,
            spriteName,
            m,
            ifBombName;

        bx = parseInt((px+this.spriteRectOffX)/bb.baseSpriteWidth);
        by = parseInt((py+this.spriteRectOffY)/bb.baseSpriteWidth);

        this.ifGetItem(bx,by);

/*
        ifBombName = "b_"+bx+"_"+by;
        if(this._parentLayer.currentBomb !==null) {
            var spriteCenterP = cc.p(this.getPosition().x+parseInt(this.spriteRectOffX1-this.spriteRectOffX)/2,this.getPosition().y+parseInt(this.spriteRectOffY1-this.spriteRectOffY)/2);
            var bombCenterP = cc.p(this._parentLayer.currentBomb.getPosition().x+16,this._parentLayer.currentBomb.getPosition().y+16);
            if(cc.pDistance(spriteCenterP,bombCenterP)>bb.baseSpriteWidth && this._parentLayer.mapInfo.objectForKey(ifBombName) ==null) {
                this._parentLayer.currentBomb = null;
            }
        }
*/

cc.log("movedir:"+this.dir +"|"+ px +"-"+ py);

        switch(this.dir)
        {
        case DIR_EAST:
            if(this.aniEast()) {
            }

            this.lastDirIndex=DIR_EAST;
            if((px+this.pace)>14*bb.baseSpriteWidth+this.pace) {
                return false;
            }
            
            if(!this._collision(px+this.pace+this.spriteRectOffX,py)) {
                return false;
            }

            this.setPos(px+this.pace, py);
            break;
        case DIR_SOUTH:
            if(this.aniSouth()) {
            }

            this.lastDirIndex=DIR_SOUTH;
            if(py-this.pace<0) {
                return false;
            }
            if(!this._collision(px,py-this.pace-this.spriteRectOffY)) {
                return false;
            }

            this.setPos(px, py-this.pace);
            break;
        case DIR_WEST:
            if(this.aniWest()) {
            }

            this.lastDirIndex=DIR_WEST;
            if(px-this.pace<0) {
                return false;
            }
            if(!this._collision(px-this.pace-this.spriteRectOffX,py)) {
                return false;
            }

            this.setPos(px-this.pace, py);
          break;
        case DIR_NORTH:
            if(this.aniNorth()) {
            }

            this.lastDirIndex=DIR_NORTH;
            if(py+this.pace>=bb.baseSpriteWidth*8+this.pace) {
                return false;
            }

            if(!this._collision(px,py+this.pace+this.spriteRectOffY)) {
                return false;
            }

            this.setPos(px, py+this.pace);
            break;
        default:
            return false;
        }

        return true;
    },

    _collision:function(px,py) {
        var pt1={},pt2={},pt3={},pt4={};
        var bx,by,
            bombName,
            spriteName;

        pt1.x = px+this.spriteRectOffX;
        pt1.y = py+this.spriteRectOffY1;

        pt2.x = px+this.spriteRectOffX1;
        pt2.y = py+this.spriteRectOffY1;

        pt3.x = px+this.spriteRectOffX;
        pt3.y = py+this.spriteRectOffY;

        pt4.x = px+this.spriteRectOffX1;
        pt4.y = py+this.spriteRectOffY;

        bx = parseInt(pt1.x/bb.baseSpriteWidth);
        by = parseInt(pt1.y/bb.baseSpriteWidth);
        if(!this._collisionToObject(bx,by,px,py)) {
            return false;
        }

        bx = parseInt(pt2.x/bb.baseSpriteWidth);
        by = parseInt(pt2.y/bb.baseSpriteWidth);
        if(!this._collisionToObject(bx,by,px,py)) {
            return false;
        }

        bx = parseInt(pt3.x/bb.baseSpriteWidth);
        by = parseInt(pt3.y/bb.baseSpriteWidth);
        if(!this._collisionToObject(bx,by,px,py)) {
            return false;
        }

        bx = parseInt(pt4.x/bb.baseSpriteWidth);
        by = parseInt(pt4.y/bb.baseSpriteWidth);
        if(!this._collisionToObject(bx,by,px,py)) {
            return false;
        }

        return true;
    },

    _collisionToObject:function(bx,by,px,py) {
        var spriteName = "s_"+bx+"_"+by,
            bx1,by1,loc;

        loc = this.posToLoc(px,py);
        bx1 = loc.x;
        by1 = loc.y;

        bombName = "b_"+bx1+"_"+by1;

        if(this._parentLayer.mapInfo.objectForKey(spriteName) !==null) {
            return false;
        }

        if(this._parentLayer.mapInfo.objectForKey(bombName) !==null && this._parentLayer.currentBomb.spriteId !==bombName) {
            return false;
        }

        return true;
    },

    setMyBomb:function() {
        if(!this.isStart || this.bombLeft <=0) {
            return;
        }

        var loc,bx,by,bombName,charCollision=false,_self=this;
        loc = this.posToLoc(this.x,this.y);
        bx = loc.x;
        by = loc.y;     
        bombName = "b_"+bx+"_"+by;

        this._parentLayer.otherChars.forEach(function findPos(oneChar) {
            var charLoc = _self.posToLoc(oneChar.x,oneChar.y);
            if(bx == charLoc.x && by == charLoc.y) {
                charCollision = true;
            }
        });

        if(charCollision) return;

        playsound("remove1");

        // only 1 bomb in 1 grid.
        if(this._parentLayer.mapInfo.objectForKey(bombName) != null) {
            return;
        }

        var bomb = new bombSprite("#bomb_1.png",res.BombAct_plist,res.BombAct_png,this._parentLayer,0);
        this._parentLayer.mapInfo.setObject(bomb, bombName);
        bomb.setId(bombName);
        bomb.setBombOwner(this.spriteId);
        bomb.setBombType(this.bombType);
        bomb.setBombLength(this.bombLength);
        bomb.setAnchorPoint(0, 0);
        bomb.setPos(bx*bb.baseSpriteWidth, by*bb.baseSpriteWidth);
        this._parentLayer.currentBomb = bomb;
        this._parentLayer._sioClient.json.emit('bomb',  {'name':bombName, 'posX': bx*bb.baseSpriteWidth, 'posY': by*bb.baseSpriteWidth, 'bType':this.bombType, 'bLength':this.bombLength });

        this.bombLeft--;
    },

    recoverBombLeft:function() {
        this.bombLeft++;
    }
});

var MenuLayer = cc.Layer.extend({
    ctor:function (mainLayer) {
        this._super();

        // add a "set bomb" icon to exit the progress. it's an autorelease object
        bombItem = new cc.MenuItemImage(
            "#bomb_set_off.png",
            "#bomb_set_on.png",
            function () {
                cc.log("set bomb Menu is clicked!");
                mainLayer.myChar.setMyBomb();
            }, this
        );

        bombItem.attr({
            x: 15*bb.baseSpriteWidth+20,
            y: -40,
            anchorX: 0.5,
            anchorY: 0.5
        });

        menu = new cc.Menu(bombItem);
            menu.attr({
            x:0,
            y:0,
        });

        this.addChild(menu, 1);

    }
});

var HelloWorldScene = cc.Scene.extend({
    mainLayer:null,
    menuLayer:null,

    onEnter:function () {
        this._super();
        //cc.spriteFrameCache.addSpriteFrames(res.bombChars_plist, res.bombChars_png); 
        //cc.spriteFrameCache.addSpriteFrames(res.GameBody_plist, res.GameBody_png); 
        //cc.spriteFrameCache.addSpriteFrames(res.BombAct_plist, res.BombAct_png); 

        mainLayer = new HelloWorldLayer();
        this.addChild(mainLayer);

        menuLayer = new MenuLayer(mainLayer);
        this.addChild(menuLayer);

        var f1 = function() {
            //mainLayer && mainLayer.myChar.endMove();
        }
        cc.view.setResizeCallback(f1);

    }
});