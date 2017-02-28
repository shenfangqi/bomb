var zy=zy||{};

var bb = bb||{};
//var _sioClient;
var SocketIO = SocketIO || window.io;

bb.playRectOffX = 200;
bb.playRectOffY = 80;
bb.baseSpriteWidth = 38;
bb.roomCapacity = 2;
bb.playerDefine={
    "bombItemCnt":1, 
    "fireItemCnt":0, 
    "skiItemCnt":0
};


bb.send3GetRequest = function(url, callback){
    var failCnt = 0;
    if(url == null || url == '')
        return;

    var cb1 = function(a) {
        failCnt++;
        if(failCnt>=2) {
            alert("网络通信故障，请点关闭返回登录界面。");
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new StartScene());
            }, this);
        } else {
            zy.sendRequest(url, "", false, callback, cb1);
        }
    };

    zy.sendRequest(url, "", false, callback, cb1);
};


bb.validateServer = function(layer) {
    var _sioClient = null, 
        _parent = this,
        _sentTime,
        _recvTime,
        _cnt = 0,
        _maxCnt = 10,
        _sumTime = 0;

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


        _sioClient = SocketIO.connect(sockAddr,options);

        var ep = function() {
            var t1 = new Date().getTime();
            _sioClient.json.emit('test', {'sentTime': t1});
        }

        var epTimer = setInterval(ep, 10);

        _sioClient.on('test', function(data) {
            _sentTime = data.sentTime;
            _recvTime = new Date().getTime();
            var timeDiff = _recvTime - _sentTime;
            timeDiff>0 && cc.log(timeDiff);
            _sumTime += timeDiff;
            _cnt++ && _cnt>=_maxCnt && clearInterval(epTimer); 
            //_cnt==_maxCnt && cc.log("sumTime:" + _sumTime);

_cnt==_maxCnt && cc.log("SERVER_DELAY dispatched.");
            _cnt==_maxCnt && layer.dispatchEvent("SERVER_DELAY", _sumTime);
        })
}

zy.qqJson = null;
var StartLayer = cc.Layer.extend({
	bgSprite:null,
	scoreLabel:null,
	qqInfo:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
        //remove loading dom hint message in loading.js.
        removeDom();

        var qqInfo = document.getElementById("info_json");
        zy.qqJson = JSON.parse(qqInfo.innerText);
        zy.qqJson.Char = 1;

		var size = cc.winSize;
		// add bg
		this.bgSprite = new cc.Sprite(res.BackGround_png).addTo(this);
		this.bgSprite.attr({
			x: size.width / 2,
			y: size.height / 2,
		});

/*
        this.testSprite = new cc.Sprite("#wall_1.png").addTo(this);
        this.testSprite.attr({
            x: size.width / 2,
            y: size.height / 2-50,
        });
*/

        var displayName = zy.qqJson.QID||cc.sys.localStorage.getItem("uid");
        var nameInput = new zy.Input({width:240,height:30,fontSize:20,text:displayName,placeHolder:"请输入用户名"});
        var uid=nameInput.addTo(this).pos(size.width/2-180,size.height-120);
		(new zy.Button({normal:"#dice_off.png",pressed:"#dice_on.png",text:""})).addTo(this).pos(510,this.height/2 + 110).onClick(function() 
            {
                var b = DefineManager.genRandomName();
			    uid.text(b);
                bombmanNick = b;
            }.bind(this)
		);

        var password=(new zy.Input({
        	width:300,height:30,
        	x:200,y:300,
        	fontSize:20,
        	text:cc.sys.localStorage.getItem("password"),
        	inputFlag:cc.EDITBOX_INPUT_FLAG_PASSWORD
        })).addTo(this).pos(size.width/2-180, size.height-180);


/*
    	this._input=new cc.EditBox(cc.size(300,30),new cc.Scale9Sprite("wall_1.png")).addTo(this);
    	this._text&&this.text(this._text);
    	this._input.attr({
    		x:200,y:300,
    		anchorX:0,anchorY:0,
    		fontSize:20,
    		maxLength:this._maxLength,
    		placeHolder:"请输入用户名",
    		placeHolderFontSize:20,
    	});
*/
		//add start menu
		var startItem = new cc.MenuItemImage(
				res.Start_N_png,
				res.Start_S_png,
				function () {
                    if(uid.text() == "") {
                        return;
                    }
                    bombmanNick = uid.text();

                    //cc.director.replaceScene(cc.TransitionFade(1.2, new PlayScene()));
                    var queryStr = backAddr + "/index/setName/";
                    queryStr += '?qid='+zy.qqJson.QID;
                    queryStr += '&nick='+uid.text();
                    queryStr += '&tk='+zy.qqJson.TK;

                    //var layer = new ScrollViewTestingLayer();
                    //layer.setPosition(200,80);

                    var cb = function(a) {
                        //alert(zy.qqJson.TK);
                        var layer = new LoginScene();
                        cc.director.runScene(layer);
                    };

                    // if fail to get result for 3 times, then go back to login scene.
                    bb.send3GetRequest(queryStr, cb);

				}, this);
		
		startItem.attr({
			x: size.width/2,
			y: size.height/2-180,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(startItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);


		return true;
	}
});

var StartScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new StartLayer();
		this.addChild(layer);
	}
});