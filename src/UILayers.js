/**  * Created by Administrator on 2014/9/29.   
然后具体类再继承此方法，即可实现遮挡下层的事件
*/
var BaseLayer = cc.LayerColor.extend({
    listener:null,     
    ctor:function(){
        this._super(cc.color(0,0,0,180),854,480);
        //使得下层的点击事情无效
        this.listener = cc.EventListener.create({
             event: cc.EventListener.TOUCH_ONE_BY_ONE,
             swallowTouches: true,
             onTouchBegan: function (touch, event) {
                    return true;
             },
             onTouchEnded: function (touch, event) {
             }
        });

        cc.eventManager.addListener(this.listener, this);
    },      

    destory:function(){
        console.log("baselayer.");
        cc.eventManager.removeListener(this.listener);
    }
});


var endGameUI = BaseLayer.extend({
    listener:null,
    btnListener:null,
    num:0,
    share:null,
    moveon:null,
    restart:null,
    mainUI:null,
    time:null,
    desprition:null,
    //获胜描述

    ctor:function(mainUI,player)  {
        var WINSIZE = cc.winSize;

        this._super(cc.color(0,0,0,180));
        this.mainUI = mainUI;
        this.player = player;

        this.moveon = new cc.Sprite(res.Char1_png);
        this.addChild(this.moveon);
        this.moveon.x = WINSIZE.width/2;
        this.moveon.y = WINSIZE.height/2;

        this.goMain = new cc.Sprite(res.Char1_png);
        this.addChild(this.goMain);
        this.goMain.x = this.moveon.x;
        this.goMain.y = this.moveon.y-80;

        var str = "游戏结束，请选择";
        this.desprition = new cc.LabelTTF(str, "Verdana", 24);
        this.addChild(this.desprition);
        this.desprition.x = WINSIZE.width/2;
        this.desprition.y = this.moveon.y + 100;
        var self = this;

        this.btnListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.opacity = 180;
                    return true;
                }

                return false;
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.setOpacity(255);
                if(target ==  self.moveon){
                    //self.mainUI.start();
                    self.destroy();
                }
                else if(target ==  self.goMain){
                    self.mainUI.goPrevious();
                    self.destroy();
                }
                console.log("logged!:"+(++self.num));
            }
        });

        cc.eventManager.addListener(this.btnListener, this.moveon);
        cc.eventManager.addListener(this.btnListener.clone(), this.goMain);
    },

    destroy:function(){
        BaseLayer.prototype.destory.apply(this,arguments);
        this.removeChild(this.desprition);
        this.removeChild(this.moveon);
        this.removeChild(this.share);
        cc.eventManager.removeListener(this.btnListener);
        this.removeFromParent();
    } 
}); 


var winGameUI = BaseLayer.extend({
    listener:null,
    btnListener:null,
    num:0,
    share:null,
    moveon:null,
    mainUI:null,
    time:null,
    desprition:null,
    //获胜描述

    ctor:function(mainUI,player)  {
        var WINSIZE = cc.winSize;

        this._super(cc.color(0,0,0,180));
        this.mainUI = mainUI;
        this.player = player;

        this.goMain = new cc.Sprite(res.Char1_png);
        this.addChild(this.goMain);
        this.goMain.x = WINSIZE.width/2;
        this.goMain.y = WINSIZE.height/2;

        this.restart = new cc.Sprite(res.Char1_png);
        this.addChild(this.restart);
        this.restart.x = this.goMain.x;
        this.restart.y = this.goMain.y-80;


        var str = player + " 赢得了游戏。请选择";
        this.desprition = new cc.LabelTTF(str, "Verdana", 24);
        this.addChild(this.desprition);
        this.desprition.x = WINSIZE.width/2;
        this.desprition.y = this.goMain.y + 100;
        var self = this;

        this.btnListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.opacity = 180;
                    return true;
                }

                return false;
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.setOpacity(255);
                if(target ==  self.goMain){
                    self.mainUI.goPrevious();
                    self.destroy();
                }
                else if(target ==  self.restart){
                    self.mainUI.restartGame();
                    self.destroy();
                    cc.log("restart clicked");
                }

                console.log("logged!:"+(++self.num));
            }
        });

        cc.eventManager.addListener(this.btnListener.clone(), this.goMain);
        cc.eventManager.addListener(this.btnListener.clone(), this.restart);
    },

    destroy:function(){
        BaseLayer.prototype.destory.apply(this,arguments);
        this.removeChild(this.desprition);
        this.removeChild(this.share);
        cc.eventManager.removeListener(this.btnListener);
        this.removeFromParent();
    } 
}); 