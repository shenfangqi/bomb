
var zy=zy||{};


var DataModel=function(){};DataModel.prototype.set=function(a,b){null===b||void 0===b?delete this["_"+a]:this["_"+a]=b};DataModel.prototype.get=function(a,b){var c=this["_"+a];b&&this.set(a,null);return c};
DataModel.prototype.receive=function(a,b){switch(a){case PROTOCOL.FRIEND_LIST1:this.friend.setList(1,b);break;case PROTOCOL.FRIEND_LIST2:this.friend.setList(2,b);break;case PROTOCOL.FRIEND_SEARCH:this.friend.setList(3,b);break;case PROTOCOL.MAIL_LIST:this.mail.setList(b);break;case PROTOCOL.MARKET_LIST:this.market.setList(b);break;case PROTOCOL.MARKET_REFRESH:this.market.setList(b);break;case PROTOCOL.DAILY_TASKS_GET_STATE:this.task.state(b);break;case PROTOCOL.TOWER_STATE:this.tower.state(b);break;
case PROTOCOL.LOTTERY_STATE:this.lottery.state(b);break;case PROTOCOL.LUCKY_WHEEL_GET_STATE:case PROTOCOL.LUCKY_WHEEL_GET_RESULT:this.turntable.state(b);break;case PROTOCOL.BOSS_INFO:this.boss.state(b);break;case PROTOCOL.GET_KEY:case PROTOCOL.SET_KEY:this.key.setData(b);break;case PROTOCOL.HAVE_FREE_ACTIVITY:this.activity.setData(b);break;case PROTOCOL.TRAILS_STATE:this.train.state(b);break;case PROTOCOL.ARENA_STATE:this.arena.state(b)}};
DataModel.prototype.clear=function(){for(var a in this)if(this.hasOwnProperty(a)){var b=this[a];b.clear&&b.clear();"_"==a.substr(0,1)&&delete this[a]}};

var dm=new DataModel;
dm.friend={setList:function(a,b){this["list"+a]=b.list},getList:function(a){return this["list"+a]||[]},setType:function(a){this.type=a},getType:function(){return this.type},setSendNum:function(a){this.sendNum=a},getSendNum:function(){return this.sendNum},setSent:function(a){for(var b=this.getList(1),c=0;c<b.length;c++)if(b[c].playerId==a)return b[c].activitySent=!0,{index:c,data:b[c]}},remove:function(a,b){for(var c=this.getList(a),d=0;d<c.length;d++)if(c[d].playerId==b)return c.splice(d,1),d},clear:function(){for(var a in this)this.hasOwnProperty(a)&&
"function"==!typeof this[a]&&delete this[a]}};
dm.mail={announcement:[],list:[],checkTips:function(){return this.list.length},setList:function(a){var b=[],c=[],d;for(d in a.announcements)if(a.announcements.hasOwnProperty(d)){var e=a.announcements[d];e.id=d;e.type=0;b.push(e)}for(d in a.mails)a.mails.hasOwnProperty(d)&&(e=a.mails[d],e.id=d,e.type=1,c.push(e));this.announcement=b;this.list=c},getAnnouncement:function(){return this.announcement||[]},getList:function(){return this.list||[]},remove:function(a){for(var b=0;b<this.list.length;b++)if(this.list[b].id==
a)return this.list.splice(b,1),b},addMail:function(a){a.type=1;this.list||(this.list=[]);this.list.push(a);cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},clear:function(){this.announcement=[];this.list=[]}};
dm.hero={checkTips:function(){var a=this.battleTips=this.skillUpTips=this.equipEnhanceTips=this.levelUpTips=this.useEquipTips=0,b;for(b in playerData.heroes)playerData.heroes.hasOwnProperty(b)&&(a+=this.checkHeroTips(playerData.heroes[b]));return a},checkHeroTips:function(a){var b=this.checkUseEquipTips(a);!this.useEquipTips&&b&&(this.useEquipTips=1);var c=this.checkLevelUpTips(a);!this.levelUpTips&&c&&(this.levelUpTips=1);var d=this.checkEquipEnhanceTips(a);!this.equipEnhanceTips&&d&&(this.equipEnhanceTips=
1);var e=this.checkSkillUpTips(a);!this.skillUpTips&&e&&(this.skillUpTips=1);a=this.checkBattleTips(a);!this.battleTips&&a&&(this.battleTips=1);return b+c+d+e+a},checkUseEquipTips:function(a){var b=0,c;for(c in a.equipIds)a.equipIds.hasOwnProperty(c)&&(b+=this.checkEquipTips(a,c)?1:0);return b},checkLevelUpTips:function(a){if(5<=a.starLevel&&a.level==DefineManager.globalConfig.MAX_LEVEL)return 0;a=Math.floor(a.level/DefineManager.globalConfig.MAX_LEVEL)?a.getStarLevelUpRequirements():a.getUpgradeRequirements();
return playerData.checkResources(a,!1)?1:0},checkEquipEnhanceTips:function(a,b){var c=0,d;for(d in a.equipIds)if(a.equipIds.hasOwnProperty(d)&&a.equipLevel[d]<a.starLevel*DefineManager.globalConfig.MAX_LEVEL+a.level){var e=a.getEquipLevelUpDiamondCast(d),f=a.getEquipLevelUpRequirements(d);f.diamond=e;c+=playerData.checkResources(f,!1)?1:0;if(b&&b==d)return playerData.checkResources(f,!1)?1:0}return c},checkSkillUpTips:function(a){if(a.skillLevel>=DefineManager.globalConfig.MAX_SKILL_LEVEL)return 0;
a=a.getSkillLevelUpRequirements();return playerData.checkResources(a,!1)?1:0},checkEquipTips:function(a,b){var c=playerData.backpacker.getEquipByPos(a,b,!0);if(a.equipIds[b]){for(var d=a.equip[b],e=0;e<c.length;e++){var f=c[e];if(f.score>d.score)return f}return 0}return c.length?c[0]:0},checkBattleTips:function(a){var b=playerData.getBattleHeroes().length;return!a.isGoIntoBattle&&4>b?1:0}};
dm.market={list:{},setList:function(a){this.list[a.type]=a.list},getList:function(a){return this.list[a]},setSoldOut:function(a,b){this.list[a][b].isSoldOut=!0},clear:function(){this.list={}}};
dm.task={tips:0,state:function(a){for(var b=0,c=a.list,d=0;d<c.length;d++){var e=c[d],f=DefineManager.getDailyTaskDefine(e.groupId),g=f[e.level>f.length-1?f.length-1:e.level];e.complete=0;e.progress<g.condition||(e.progress>=g.condition&&e.level>=f.length?e.complete=2:(b++,e.complete=3))}a.gotDailyAwardsStep<Math.floor(a.totalPoint/DefineManager.globalConfig.DAILY_TASKS_TARGET_POINT*100/25)&&b++;this.tips=b;this.list=c;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},getList:function(){return this.list||
[]},checkTips:function(){return this.tips},clear:function(){this.tips=0;this.list=[]}};dm.lottery={freeGoldCDTimes:0,state:function(a){this.freeGoldCDTimes=a.state.freeGoldCDTimes;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){var a;a=0+(!playerData.CD.freeGoldLottery&&this.freeGoldCDTimes?1:0);return a+=playerData.CD.freeDiamondLottery?0:1}};
dm.turntable={tips:0,state:function(a){var b=a.result?a.result.freeTimes:0;this.tips=(a.state?a.state.freeTimes:0)||b;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){return this.tips}};
dm.shelter={checkTips:function(){var a;a=0+this.checkTechTips();a+=dm.train.checkTips();a+=dm.arena.checkTips();return a+=dm.tower.checkTips()},checkTechTips:function(){var a=0;if(playerData.levelOpen(FEATURE_OPEN_LEVEL.TECH_UPGRADE)){if(playerData.totemAttackLevel<DefineManager.globalConfig.MAX_TOTEM_ATTACK_LEVEL)var b=playerData.getTotemAttackLevelUpRequirements(),a=a+(playerData.checkResources(b,!1)?1:0);playerData.totemDefenseLevel<DefineManager.globalConfig.MAX_TOTEM_DEFENSE_LEVEL&&(b=playerData.getTotemDefenseLevelUpRequirements(),
a+=playerData.checkResources(b,!1)?1:0)}return a}};dm.backpack={checkTips:function(){var a=0,b=playerData.backpacker.consumables,c;for(c in b)if(b.hasOwnProperty(c)){var d=b[c].getDefine();d.unAvail||d.activityObtain||d.equipRefIds||(a+=1)}return a}};dm.boss={state:function(a){a=a.info;this.hp=a.hp;this.beginTime=parseInt(new Date(a.beginTime)/1E3);this.endTime=parseInt((new Date(a.endTime)).getTime()/1E3)},isOpen:function(){var a=parseInt((new Date).getTime()/1E3);return a>this.beginTime&&a<this.endTime}};
dm.train={tips:0,state:function(a){this.tips=a.state.times;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){return playerData.levelOpen(FEATURE_OPEN_LEVEL.TRIALS)?this.tips:0}};dm.arena={tips:0,ranking:0,state:function(a){a=a.state;this.tips=a.times;this.ranking=a.rank;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){return playerData.levelOpen(FEATURE_OPEN_LEVEL.ARENA)&&1<this.ranking?this.tips:0}};
dm.tower={tips:0,state:function(a){dm.set("TowerState",a.state);this.tips=a.state.isDead?0:1;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){return playerData.levelOpen(FEATURE_OPEN_LEVEL.TOWER)?this.tips:0}};dm.key={setData:function(a){var b={};a.data?b=a.data:b[a.key]=a.value||1;for(var c in b)b.hasOwnProperty(c)&&(this[c]=b[c]);cc.log("-----------dm.key",this)},getData:function(a){return a?this[a]:this}};
dm.activity={tips:0,setData:function(a){this.tips=a.have?1:0;cc.eventManager.dispatchCustomEvent(GAME_EVENT.CHECK_TIPS)},checkTips:function(){return this.tips}};

cc.Node.prototype.getParentByLevel=function(a){a=0<a?a:1;for(var b=this;0<a;){a--;var c=b.getParent();if(c)b=c;else break}return b};
cc.Node.prototype.addTo=function(a,b,c){
	a.addChild(this,b||this.getLocalZOrder(),c||this.getTag());
	return this
};
cc.Node.prototype.size=function(a,b){if(void 0==a)return this.getContentSize();this.setContentSize(a,b);return this};
cc.Node.prototype.show=function(){this.setVisible(!0);return this};
cc.Node.prototype.hide=function(){this.setVisible(!1);return this};
cc.Node.prototype.anchor=function(a,b){if(void 0==a)return this.getAnchorPoint();this.setAnchorPoint(a,b);return this};
cc.Node.prototype.pos=function(a,b){if(void 0==a)return this.getPosition();this.setPosition(a,b);return this};
cc.Node.prototype.align=function(a,b,c){"object"===typeof a&&this.anchor(a);"number"!==typeof b&&"object"!==typeof b||this.pos(b,c);return this};
cc.Node.prototype.attr=function(a){for(var b in a) this[b]=a[b];return this};
cc.Node.prototype.popup=function(){this.attr({scale:0.8}).runAction((new cc.ScaleTo(0.5,1)).easing(cc.easeElasticOut()));return this};
cc.Node.prototype.addListener=function(a,b){
	for(var c=a instanceof Array&&a||[a],d=0;d<c.length;d++)
		cc.eventManager.addListener({event:cc.EventListener.CUSTOM,eventName:c[d],callback:b},this);
	return this
};
cc.Node.prototype.dispatchEvent=function(a,b){cc.eventManager.dispatchCustomEvent(a,b);return this};
cc.Node.prototype.onTouch=function(a){cc.eventManager.removeListener(this._touchListener);this._touchListener=cc.EventListener.create({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:!0,onTouchBegan:function(b,c){var d=b.getLocation();return this.checkIsVisible()&&this.checkIsEnabled()&&this.checkInTouch(d)?(d={target:this,x:d.x,y:d.y},"function"==typeof a&&a(d,c),this._onBegan&&this._onBegan(d,c),!0):!1}.bind(this)});cc.eventManager.addListener(this._touchListener,this);return this};

cc.Node.prototype.onClick=function(a){
	cc.eventManager.removeListener(this._touchListener);
	this._touchListener=cc.EventListener.create({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:!0,
		onTouchBegan:function(a,c){var d=a.getLocation();return this.checkIsVisible()&&this.checkIsEnabled()&&this.checkInTouch(d)?(a._startPoint=a.getLocation(),this._onBegan&&this._onBegan({target:this,x:d.x,y:d.y}),!0):!1}.bind(this),
		onTouchEnded:function(b,c){
			var d=b.getStartLocation(),
			e=b.getLocation(),
			f={target:this,x:e.x,y:e.y},
			g=this._touchListener.swallowTouches&&this.checkInTouch(d)&&this.checkInTouch(e),
			d=!this._touchListener.swallowTouches&&20>=Math.abs(cc.pDistance(e,d))&&this.checkInTouch(e);
			g||d?("function"==typeof a&&a(f,c),this._onClick&&this._onClick(f,c)):this._onEnded&&this._onEnded(f,c)

		}.bind(this)
	});
	cc.eventManager.addListener(this._touchListener,this);
    return this
};

cc.Node.prototype.onDrag=function(a){cc.eventManager.removeListener(this._touchListener);this._touchListener=cc.EventListener.create({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:!0,onTouchBegan:function(b,c){var d=b.getLocation();if(this.checkIsVisible()&&this.checkIsEnabled()&&this.checkInTouch(d)){d={target:this,x:d.x,y:d.y};b._startPoint=b.getLocation();if("object"==typeof a&&"function"==typeof a.onBegan)a.onBegan(d,c);this._onBegan&&this._onBegan(d,c);return!0}return!1}.bind(this),
onTouchMoved:function(b,c){var d=b.getLocation(),e=b.getPreviousLocation(),d={target:this,prevX:e.x,prevY:e.y,x:d.x,y:d.y};if("object"==typeof a&&"function"==typeof a.onMoved)a.onMoved(d,c);this._onMoved&&this._onMoved(d,c)}.bind(this),onTouchEnded:function(b,c){var d=b.getStartLocation(),e=b.getLocation(),d={target:this,startX:d.x,startY:d.y,x:e.x,y:e.y};if("object"==typeof a&&"function"==typeof a.onEnded)a.onEnded(d,c);this._onEnded&&this._onEnded(d,c)}.bind(this)});cc.eventManager.addListener(this._touchListener,
this);return this
};
cc.Node.prototype.onSlide=function(a){cc.eventManager.removeListener(this._touchListener);this._touchListener=cc.EventListener.create({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:!0,onTouchBegan:function(b,c){var d=b.getLocation();if(this.checkIsVisible()&&this.checkIsEnabled()&&this.checkInTouch(d)){d={target:this,x:d.x,y:d.y};b._startPoint=b.getLocation();if("object"==typeof a&&"function"==typeof a.onBegan)a.onBegan(d,c);this._onBegan&&this._onBegan(d,c);return!0}return!1}.bind(this),onTouchMoved:function(b,
c){var d=b.getLocation(),e=b.getStartLocation();if(20<Math.abs(cc.pDistance(d,e))){e=b.getPreviousLocation();d={target:this,prevX:e.x,prevY:e.y,x:d.x,y:d.y};if("object"==typeof a&&"function"==typeof a.onMoved)a.onMoved(d,c);this._onMoved&&this._onMoved(d,c)}}.bind(this),onTouchEnded:function(b,c){var d=b.getStartLocation(),e=b.getLocation(),f={target:this,startX:d.x,startY:d.y,x:e.x,y:e.y};if(20>=Math.abs(cc.pDistance(e,d))){if("object"==typeof a&&"function"==typeof a.onClick)a.onClick(f,c);this._onClick&&
this._onClick(f,c)}else{if("object"==typeof a&&"function"==typeof a.onEnded)a.onEnded(f,c);this._onEnded&&this._onEnded(f,c)}}.bind(this)});cc.eventManager.addListener(this._touchListener,this);return this};
cc.Node.prototype.checkIsVisible=function(){var a=function(b){return null==b?this.isVisible():(b=b.getParent())&&!b.isVisible()?!1:a(b)}.bind(this);return a(this)};
cc.Node.prototype.checkIsEnabled=function(){var a=function(b){return null==b?this.isEnabled?this.isEnabled():!0:(b=b.getParent())&&b.isEnabled&&!b.isEnabled()?!1:a(b)}.bind(this);return a(this)};
cc.Node.prototype.checkInTouch=function(a,b){var c=b&&this.getBoundingBoxToWorld()||this.getBoundingBox(),d=this.convertToNodeSpace(a);return cc.rectContainsPoint(cc.rect(0,0,c.width/this.scaleX,c.height/this.scaleX),d)};cc.Sprite.prototype.setFrame=function(a){this.setSpriteFrame(a);return this};
cc.LabelTTF.prototype.text=function(a){if(void 0==a)return this.getString();this.setString(a.toString());return this};cc.LabelBMFont.prototype.text=function(a){if(void 0==a)return this.getString();this.setString(a.toString());return this};cc.Sprite.prototype.playOnce=function(a,b){for(var c=[],d=1;d<=b;d++){var e=cc.spriteFrameCache.getSpriteFrame(a+"_"+(1==d.toString().length?"0"+d:d)+".png");c.push(e)}c=new cc.Animation(c,1/12);this.runAction(new cc.Animate(c));return this};
//cc.Sprite.prototype.playForever=function(a,b){for(var c=[],d=1;d<=b;d++){var e=cc.spriteFrameCache.getSpriteFrame(a+"_"+(1==d.toString().length?"0"+d:d)+".png");c.push(e)}c=new cc.Animation(c,1/12);this.runAction(cc.repeatForever(cc.sequence(new cc.Animate(c))));return this};sp.SkeletonAnimation.create=function(a,b){return new sp.SkeletonAnimation(resource.spineDir+a+".json",resource.spineDir+a+".atlas",b)};sp.SkeletonAnimation.prototype.play=function(a,b){this.setAnimation(0,a,b);return this};

//sp.SkeletonAnimation.prototype.skin=function(a){this.setSkin(a);return this};
//sp.SkeletonAnimation.prototype.addAni=function(a,b){this.addAnimation(0,a,b);return this};if("object"===typeof module&&module.exports)var CommonFunc=require("./CommonFunc.js"),GameTypes=require("./GameTypes.js");

var utils={seekWidgetByTag:function(a,b){if(!cc.sys.isNative)return ccui.helper.seekWidgetByTag(a,b);if(!a)return null;if(a.getTag()===b)return a;for(var c=a.getChildren(),d=c.length,e=0;e<d;e++){var f=utils.seekWidgetByTag(c[e],b);if(null!==f)return f}return null},seekWidgetByName:function(a,b){if(!cc.sys.isNative)return ccui.helper.seekWidgetByName(a,b);if(!a)return null;if(a.getName()===b)return a;for(var c=a.getChildren(),d=c.length,e=0;e<d;e++){var f=utils.seekWidgetByName(c[e],b);if(null!==
f)return f}return null},seekNodeByPath:function(a,b){if(!a)return null;for(var c=a,d=null,e=b.split("."),f=0;f<e.length;f++){d=e[f];"*"==d.substr(0,1)?(d=d.substr(1),d=utils.seekWidgetByName(c,d)):d=c.getChildByName(d);if(null===d)return null;c=d}return d}};

function abbrNumber(a,b){return a.toFixed(b||0).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$\x26,")}
function abbrNumber2(a,b){b=Math.pow(10,b);abbrev="kMGTPEZY".split("");for(var c=abbrev.length-1;0<=c;c--){var d=Math.pow(10,3*(c+1));if(d<=a){a=Math.round(a*b/d)/b;1E3==a&&c<abbrev.length-1&&(a=1,c++);a+=abbrev[c];break}}return a};

var getTimeAgo=function(a){a=new Date(a);var b=[{text:"\u5e74",sec:31536E3},{text:"\u6708",sec:2592E3},{text:"\u5468",sec:604800},{text:"\u5929",sec:86400},{text:"\u5c0f\u65f6",sec:3600},{text:"\u5206\u949f",sec:60}];a=((new Date).getTime()-a.getTime())/1E3;for(var c=0;c<b.length;c++)if(a>b[c].sec)return Math.floor(a/b[c].sec).toString()+b[c].text+"\u524d";return"1\u5206\u949f\u5185"};

var display={CENTER:cc.p(0.5,0.5),LEFT_BOTTOM:cc.p(0,0),BOTTOM_LEFT:cc.p(0,0),CENTER_BOTTOM:cc.p(0.5,0),BOTTOM_CENTER:cc.p(0.5,0),RIGHT_BOTTOM:cc.p(1,0),BOTTOM_RIGHT:cc.p(1,0),LEFT_CENTER:cc.p(0,0.5),CENTER_LEFT:cc.p(0,0.5),RIGHT_CENTER:cc.p(1,0.5),CENTER_RIGHT:cc.p(1,0.5),LEFT_TOP:cc.p(0,1),TOP_LEFT:cc.p(0,1),CENTER_TOP:cc.p(0.5,1),TOP_CENTER:cc.p(0.5,1),RIGHT_TOP:cc.p(1,1),TOP_RIGHT:cc.p(1,1)};


var ModelUILayer=cc.LayerColor.extend({
	options:null,modelUIController:null,

	ctor:function(a,b){
	    this.options=a;
	    this.modelUIController=b;
	    var c=cc.winSize;
	    this._super(this.options.color,c.width,c.height);

	    this.options.offset&&(this.x=-this.options.offset.x, this.y=-this.options.offset.y);

	    c=cc.director.getRunningScene();
	    this.addTo(c,1)
    },

    onEnter:function(){
    	this._super();
	    var a=cc.winSize;

	    this.onClick(function(){this.options.closeOnTouchBlank&&this.modelUIController.close()}.bind(this));
    	var b=this.modelUIController.contentNode;

	    this.options.center&&(a=cc.p(a.width/2,a.height/2),this.options.offset&&(a.x+=this.options.offset.x,a.y+=this.options.offset.y),b.pos(a));

	    b=b.addTo(this);
	    if(void 0!==this.options.closeWidgets)
		    for(a=0;a<this.options.closeWidgets.length;a++){
			    var c=utils.seekWidgetByName(b,this.options.closeWidgets[a]);
			    c&&c.addTouchEventListener(function(a,b){b==ccui.Widget.TOUCH_ENDED&&this.modelUIController.close()},this)
		    }
		this.options.popup&&b.popup()
	}
}),

ModelUIController=function(a,b,c){
	this.index=c;
	c={color:cc.color(0,0,0,127),center:!0,popup:!0,closeOnTouchBlank:!0,closeWidgets:["CloseButton"]};
    if(void 0===b)
    	b=c;
    else 
        for(var d in c)c.hasOwnProperty(d)&&(b.hasOwnProperty(d)||(b[d]=c[d]));
    
    a.modelController=this;
    this.options=b;
    this.contentNode=a;
    this.container=new ModelUILayer(b,this)
};

ModelUIController.prototype.isTop=function(){return this.index==dm.get("models").length-1};
ModelUIController.prototype.close=function(){
	delete this.contentNode.modelController;
	this.contentNode.removeFromParent(!0);
	this.container.removeFromParent(!0);
	this.options.callback&&this.options.callback();
	dm.get("models").pop();
	//cc.eventManager.dispatchCustomEvent(GAME_EVENT.MODEL_CLOSE)
};

ModelUIController.showModel=function(a,b){
	dm.get("models")||dm.set("models",[]);
	var c=dm.get("models").length;
	dm.get("models").push(new ModelUIController(a,b,c));
	//cc.eventManager.dispatchCustomEvent(GAME_EVENT.MODEL_SHOW)
};

ModelUIController.close=function(){

cc.log("close clicked:"+dm.get("models"));
	if(dm.get("models")&&dm.get("models").length){
		var a=dm.get("models")[dm.get("models").length-1];
	    a&&a.close()
	}
};


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

zy.sendRequest = function(url, params, isPost, callback, errorcallback){
    if(url == null || url == '')
        return;
            
    var xhr = cc.loader.getXMLHttpRequest();
    if(isPost){
        xhr.open("POST",url);
    }else{
        xhr.open("GET",url);
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            var response = xhr.responseText;
            if(callback)
                callback(response);
        }else if(xhr.readyState == 4 && xhr.status != 200){
            var response = xhr.responseText;
            if(errorcallback)
                errorcallback(response);
        }
    };
    
    if(params == null || params == ""){
        xhr.send();
    }else{
        xhr.send(params);
    }
};

zy.Widget=cc.Node.extend({
	_enabled:!0,
	ctor:function(){
		this._super()},
		setEnabled:function(a){
			this._enabled=a;
			return this
		},

		isEnabled:function(){
			return this._enabled
		},

		setSelected:function(a){this._selected=a;return this},

		isSelected:function(){return this._selected},

		setSwallowTouches:function(a){
			this._touchListener&&this._touchListener.setSwallowTouches(a);
			return this
		}
});


zy.Button=zy.Widget.extend({
	ctor:function(a){
		cc.assert(typeof a&&"string"===typeof a.normal,"Options need normal image!");
	    this._super();
	    this._options=a;
	    this._imgs={};
	    a.scale9&&(a.normal="#"==a.normal[0]?a.normal.substr(1):a.normal,a.pressed&&(a.pressed="#"==a.pressed[0]?a.pressed.substr(1):a.pressed),a.disabled&&(a.disabled="#"==a.disabled[0]?a.disabled.substr(1):a.disabled));this._createImg("normal",a.normal,a.capInsets);a.pressed||(a.pressed=a.normal);
	    this._createImg("pressed",a.pressed,a.capInsets);
	    a.disabled||(a.disabled=a.normal);this._createImg("disabled",a.disabled,a.capInsets);
	    this.size(this._imgs.normal.size());this._noNormal||this._imgs.normal.show();
	    if(a.text){
cc.log("res/font/fnt_"+(a.size||24)+".fnt");
            var b=this._label=cc.LabelBMFont.create(a.text,"res/font/fnt_"+(a.size||24)+".fnt").addTo(this,1).align(display.CENTER,this.width/2,this.height/2);
            a.color&&(b.color=a.color);
            a.align&&b.align(a.align);
            a.x&&(b.x=a.x);
            a.y&&(b.y=a.y);
	    }
	},

    text:function(a){return a?(this._label.text(a),this):this._label.text()},

    setTextY:function(a){this._label.y=a;return this},

    setEnabled:function(a){a?this._showImg("normal"):this._showImg("disabled");return this._super(a)},

    _createImg:function(a,b,c){this._imgs[a]=this._options.scale9?cc.Scale9Sprite.create(b,c):cc.Sprite.create(b);a=this._imgs[a];a.addTo(this).anchor(display.LEFT_BOTTOM).hide();this._options.scale9&&this._options.width&&this._options.height&&a.size(this._options.width,this._options.height);return a},

    _showImg:function(a){if(!this._noNormal)for(var b in{normal:!0,pressed:!0,disabled:!0})this._imgs.hasOwnProperty(b)&&(b==a?this._imgs[b].show():this._imgs[b].hide())},

    _onBegan:function(a){this._enabled?this._showImg("pressed"):this._showImg("disabled")},
    _onEnded:function(){this._enabled?this._showImg("normal"):this._showImg("disabled")},
    _onClick:function(){this._enabled?this._showImg("normal"):this._showImg("disabled")}

});


zy.Input=cc.Node.extend({
	_width:240,
	_height:48,
    _fontName:"gh",
	_fontSize:36,
	_maxLength:20,
	_inputFlag:cc.EDITBOX_INPUT_FLAG_SENSITIVE,
    _spriteFrame:"wall_1.png",
    _anchorX:0,
    _anchorY:0,

	ctor:function(a) {
		this._super();
		if(a instanceof Object) 
			for(var b in a)a.hasOwnProperty(b)&&(this["_"+b]=a[b]);
		this.size(this._width,this._height);
	    this._bg=cc.Scale9Sprite.create(this._spriteFrame).addTo(this).align(display.LEFT_CENTER,-6,this.height/2).size(this.width+12,this.height+12);
	},

	onEnter:function(){
		this._super();
        this.createUI()
    },

    createUI:function(){
    	this._input=new cc.EditBox(cc.size(this._width,this._height),new cc.Scale9Sprite("blank.png")).addTo(this);
    	this._input.setAnchorPoint(cc.p(this._anchorX, this._anchorY));
    	this._text&&this.text(this._text);
    	this._input.attr({
    		x:0,y:0,
    		fontName:this._fontName,
    		fontSize:this._fontSize,
    		maxLength:this._maxLength,
    		placeHolder:this._placeHolder,
    		placeHolderFontSize:this._fontSize,
    		inputFlag:this._inputFlag
    	})
    }
});

zy.Input.prototype.text=function(a){
	if(a) 
	    this._input.setString(a);
	else 
		return this._input.getString();
	return this
};

zy.ScrollView=cc.ClippingNode.extend({
	_THROW_DISTANCE:100,_THROW_SPEED:1,_THROW_SPEED_CHECK:0.5,_THROW_TIME_CHECK:180,_overflow:!1,

	ctor:function(a){
		this._super(cc.Scale9Sprite.create("black.png").align(display.LEFT_BOTTOM));
		this.size(a.width||0,a.height||0);
		this._direction=a.direction||zy.ScrollView.V;
		this._overflow=a.overflow||this._overflow;
		this._freeze=a.freeze;
		this.setTarget(a.target).setContent(a.content)._setStencilClippingSize()
	},

		resize:function(a,b){this.size(a,b);return this._setStencilClippingSize()},
        _setStencilClippingSize:function(){var a=this.size();this._stencil.size(a);return this},
        setTarget:function(a){this._target=a||this.getParent();return this},
        setContent:function(a){if(!a)return this;this._content&&this._content.removeFromParent(!0);this._content=a.addTo(this);this._content.addLoadedEventListener&&!this._content.textureLoaded()?this._content.addLoadedEventListener(this._updateContentPos,this):this._updateContentPos();return this._freeze?this:this.onSlide()},
        getContent:function(){return this._content},
        scrollTo0:function(){this._direction==zy.ScrollView.V?this._content.y=this.height-this._content.height:this._content.x=0;return this},
        scrollTo1:function(){this._direction==zy.ScrollView.V?this._content.y=0:this._content.x=this.width-this._content.width;return this},
        _updateContentPos:function(){this._direction==zy.ScrollView.V?this._content.align(display.LEFT_BOTTOM,0,this.height-this._content.height):this._content.align(display.LEFT_BOTTOM,0,0);return this},
        _autoAlign:function(a){a&&this._content.runAction(cc.sequence(cc.EaseExponentialIn.create(cc.moveBy(0.8,
this._direction==zy.ScrollView.V?cc.p(0,-a):cc.p(a,0))).reverse()))},
        _checkThrow:function(a){this._clock=(new Date).getTime()-this._clock;this._clock=this._clock>this._THROW_TIME_CHECK?1E4:this._clock;var b=0,c=0,d=0,e=0,f=0,g=function(a,b,c,d,e){c=Math.abs(a/this._clock);a&&(b=0<a?1:2);c>this._THROW_SPEED_CHECK&&(e=(e=Math.floor(c/this._THROW_SPEED))?e:1,d=e*this._THROW_DISTANCE);return[b,c,d,e]}.bind(this);this._direction==zy.ScrollView.V?(b=a.y-a.startY,a=g(b,c,d,e,f),c=a[0],d=a[1],e=a[2],f=a[3],
c&&(1==c?this._content.height>=this.height?0<this._content.y+e&&(e=-this._content.y):this._content.y+this._content.height+e>this.height&&(e=this.height-this._content.height-this._content.y):(e*=-1,this._content.y+e<this.height-this._content.height&&(e=this.height-this._content.height-this._content.y)))):(b=a.x-a.startX,a=g(b,c,d,e,f),c=a[0],d=a[1],e=a[2],f=a[3],c&&(1==c?(e*=-1,0<this._content.x-e&&(e=this._content.x)):this._content.width>this.width?this._content.x+this._content.width-e<this.width&&
(e=this._content.x+this._content.width-this.width):e=this._content.x));this._autoAlign(e)},
        _onBegan:function(a){this._clock=(new Date).getTime();this._content.stopAllActions();this._target&&this._target._onBegan&&this._target._onBegan(a)},
        _onMoved:function(a){var b=this._direction==zy.ScrollView.V?a.y-a.prevY:a.x-a.prevX;if(this._direction==zy.ScrollView.V){if(!this._overflow&&(this._content.y+b<this.height-this._content.height||0<this._content.y+b))return;this._content.y+=b}else{if(!this._overflow&&
(0<this._content.x+b||this._content.x+b<this.width-this._content.width))return;this._content.x+=b}this._target&&this._target._onMoved&&this._target._onMoved(a)},
        _onEnded:function(a){this._checkThrow(a);this._target&&this._target._onEnded&&this._target._onEnded(a)},
        _onClick:function(a){this._target&&this._target._onClick&&this._target._onClick(a)}
});

zy.ScrollView.H="horizontal";
zy.ScrollView.V="vertical";

zy.ScrollList=zy.ScrollView.extend({
	_dataList:[],
	_items:[],
	_overflow:!0,
	cell:1,
	gap:0,

	ctor:function(a){
		a.content=new cc.Node;
		this._super(a);
		this.cell=a.cell||this.cell;
		this.gap=a.gap||this.gap;
		this._noDataTips=cc.LabelTTF.create(a.noDataTips||("\u5217\u8868\u9879\u76ee\u4e3a\u7a7a"),"gh",36).addTo(this).align(display.CENTER,this.width/2,this.height/2).hide()
    },

    onExit:function(){
    	this.removeAllItems();this._super()
	},

	render:function(a,b){
		this.removeAllItems(!0);
		if(b.length)
		this._noDataTips.hide();
           else 
        return this._noDataTips.show().attr({opacity:0}).runAction(cc.fadeIn(0.5)),this;this._selectedItem=null;
        this._itemClass=a;

        for(var c in b) b.hasOwnProperty(c)&&this.addItemAt(b[c],c,!0);
        return this._updateContentSize()
    },

    removeAllItems:function(a){
    	for(var b=this._items.length-1;0<=b;b--){var c=this._items[b];this._itemClass.createFromPool?cc.pool.putInPool(c):c.removeFromParent(!0)}this._items=[];this._dataList=[];a||this._updateContentSize();return this
    },

    addItem:function(a,b){
    	this.addItemAt(a,this._items.length,b);
        return this
    },

    addItemAt:function(a,b,c,d,e){
    	if(!this._itemClass)return this;
    	var f;
    	f=this._itemClass.createFromPool?this._itemClass.createFromPool(a,b).addTo(this._content):(new this._itemClass(a,b)).addTo(this._content);
    	d&&e&&f.align(d,e);
    	this._items.splice(b,0,f);
    	this._dataList.splice(b,0,a);
    	c||this._updateContentSize();
    	return this
    },

    removeItemAt:function(a,b){var c=this._items.splice(a,1)[0];this._itemClass.createFromPool?cc.pool.putInPool(c):c.removeFromParent(!0);this._dataList.splice(a,1);b||this._updateContentSize();return this},

    replaceItemAt:function(a,b,c){var d=this._items[b].anchor(),e=this._items[b].pos();this.removeItemAt(b,!0).addItemAt(a,b,!0,d,e);c&&this._updateContentSize();return this},

    scrollToIndex:function(a,b){var c=this._items[a];if(c){var d=cc.p(c.x,c.y-(this._content.height-this.height));if(this._direction==zy.ScrollView.V&&this.height!=this._content.height){var e=this.height-this._content.height-d.y+c.height;0>=d.y-c.height&&this._content.y!=e&&(b?this._content.runAction(cc.moveTo(0.1,cc.p(0,e))):this._content.y=e)}}return this},

    getData:function(){return this._dataList},

    getItems:function(){return this._items},

    getItemByIndex:function(a){return this._items[a]},

    _updateContentSize:function(){
    	if(!this._itemClass)return this;

    	var a=Math.ceil(this._items.length/this.cell),b=this.cell*this._itemClass.W+(this.cell-1)*this.gap,c=a*this._itemClass.H+(a-1)*this.gap,c=c>this.height?c:this.height;this._content.size(b,c);

    	for(b=0;b<this._items.length;b++){var d=b+1,a=Math.ceil(d/this.cell)-1;
    		this._items[b].align(display.LEFT_TOP,(d-1)%this.cell*(this._itemClass.W+this.gap),c-a*(this._itemClass.H+this.gap)).setIndex(b)}
    	return this._updateContentPos()
    },

    setSelected:function(a,b){
        cc.log("selected from item.");

    	for(var c=0;c<this._items.length;c++){
    		var d=this._items[c];
    		d.getIndex()==a ? b?d.setSelected(!d.isSelected()):this._selectedItem=d.setSelected(!0)  : b||d.setSelected(!1)
    	}
    	return this
    },

    getSelected:function(a){
    	if(a){a=[];for(var b=0;b<this._items.length;b++){var c=this._items[b];c.isSelected()&&a.push(c)}return a}return this._selectedItem
    },

    _onBegan:function(a){
    	this._super(a);
        if(this.checkInTouch(cc.p(a.x,a.y)))for(var b=0;b<this._items.length;b++){var c=this._items[b];if(c.checkInTouch(cc.p(a.x,a.y))){c._onBegan(a);break}}
     },

    _onEnded:function(a){
    	this._super(a);if(this.checkInTouch(cc.p(a.x,a.y)))for(var b=0;b<this._items.length;b++){var c=this._items[b];if(c.checkInTouch(cc.p(a.x,a.y))){c._onEnded(a);break}}
    },

    _onClick:function(a){
    	this._super(a);if(this.checkInTouch(cc.p(a.x,a.y)))for(var b=0;b<this._items.length;b++){var c=this._items[b];if(c.checkInTouch(cc.p(a.x,a.y))){c._onClick(a);break}}
    }

});




zy.ScrollPage=zy.ScrollView.extend({_items:[],_multi:!1,ctor:function(a){a=a||{};a.direction=a.direction||zy.ScrollView.H;a.content=new cc.Node;this._super(a)},addItem:function(a){this._items.push(a.addTo(this._content));return this._updateContentSize()},
	_updateContentSize:function(){for(var a=0;a<this._items.length;a++){var b=this._items[a-1];this._items[a].align(display.LEFT_BOTTOM,b?b.x+b.width:0,0)}this._content.size(this._content.getBoundingBoxToWorld());return this._updateContentPos()}});

zy.ScrollItem=zy.Widget.extend({
	ctor:function(a,b){this._super();this.setIndex(b).setData(a);this.createUI(a)},
	setIndex:function(a){this._index=a;return this},
	getIndex:function(){return this._index},
	setData:function(a){this._data=a;return this},
	getData:function(){return this._data},
	beganHandler:function(a){"function"==typeof a&&(this._beganHandler=a)},
	_onBegan:function(a){"function"==typeof this._beganHandler&&this._beganHandler(a)},
	endedHandler:function(a){"function"==typeof a&&(this._endedHandler=a)},
	_onEnded:function(a){"function"==typeof this._endedHandler&&this._endedHandler(a)},
	clickHandler:function(a){"function"==typeof a&&(this._clickHandler=a)},
	_onClick:function(a){"function"==typeof this._clickHandler&&this._clickHandler(a)},
	reuse:function(a,b){return this.show().setIndex(b).setData(a).refreshData(a)},
	unuse:function(){this.hide().setSelected(!1);this.removeFromParent(!1);cc.eventManager.removeListeners(this);return this},
	refreshData:function(){return this},
	createUI:function(a){
		//cc.LabelTTF.create(a,GameTypes.COMMON_FONT,36).addTo(this,1).align(display.CENTER,this.width/2,this.height/2).color=cc.color(255,255,0,0);
		//(new zy.Button({normal:"#activity_button_normal.png",pressed:"#activity_button_pressed.png",disabled:"#activity_button_normal.png"})).addTo(this).align(display.CENTER,this.width/2,this.height/2).onClick(this.btnClickTest.bind(this)).setSwallowTouches(!1);
		return this
	},
	btnClickTest:function(a){cc.log("------------btnClick",a.x,a.y)}
});



var FriendItem=zy.ScrollItem.extend({
	ctor:function(a,b){
		this._super(a,b);
		this.size(FriendItem.W,FriendItem.H)
	},
	createUI:function(a){
		var b=ccs.load(res.FRIEND_ITEM_JSON).node;
		this._node=b.addTo(this);

		this._btnSendNode=utils.seekWidgetByName(b,"btnSendNode");
		this._btnSend=(new zy.Button({normal:"#choose_on.png",pressed:"#choose_off.png"})).addTo(this._btnSendNode);
    	this._btnSend.setEnabled(1),

		this._btnSend.onClick(function(){
            this.dispatchEvent(AvatarSetting.CHAR_CHOOSE_ITEM,this.getIndex())
		}.bind(this))

        //this._btnSend.onClick(function(b){
    	//}.bind(this)).setSwallowTouches(!1),

        this._avatar=utils.seekWidgetByName(b,"avatar");
		this._border=cc.Sprite.create("#avatar_box.png").addTo(this._avatar).pos(this._avatar.width/2,this._avatar.height/2);

        for(var i=1;i<=a.bomb;i++) {
            var tmpNode=utils.seekWidgetByName(b,"bomb_"+i);
		    cc.Sprite.create("#bomb_icon.png").addTo(tmpNode).pos(tmpNode.width/2,tmpNode.height/2);
        } 
        for(var i=1;i<=a.fire;i++) {
            var tmpNode=utils.seekWidgetByName(b,"fire_"+i);
		    cc.Sprite.create("#fire_icon.png").addTo(tmpNode).pos(tmpNode.width/2,tmpNode.height/2);
        } 
        for(var i=1;i<=a.ski;i++) {
            var tmpNode=utils.seekWidgetByName(b,"ski_"+i);
		    cc.Sprite.create("#ski_icon.png").addTo(tmpNode).pos(tmpNode.width/2,tmpNode.height/2);
        } 

        this.refreshData(a)
    },

	setSelected:function(a){
    	this._border.setFrame(a?"role_choice.png":"avatar_box.png");
		return this._super(a)
	},

    refreshData:function(a){

    	this._btnSendNode.show();
    	//this._btnDeleteNode.show();
    	//this._btnAddNode.show();
    	
    	/*
    	
    	1==dm.friend.getType()?(
    		this._btnSendNode.show(),
    		this._btnSend.onClick(function(b){
    		    b.target.setEnabled(!1);
    	        clientProtocol.request(PROTOCOL.FRIEND_SEND,{friendId:a.playerId})
    	    }.bind(this)).setSwallowTouches(!1),
    	
    	    this._btnSend.setEnabled(!a.activitySent),
    	    this._btnDeleteNode.show(),
    	    this._btnDelete.onClick(function(){clientProtocol.request(PROTOCOL.FRIEND_REMOVE,{friendId:a.playerId})}.bind(this)).setSwallowTouches(!1))
    	:(this._btnAddNode.show(),
    	this._btnAdd.onClick(function(b){clientProtocol.request(PROTOCOL.FRIEND_INVITE,{playerIds:[a.playerId]});
    	this.getParentByLevel(2).removeItemAt(this.getIndex())}.bind(this)).setSwallowTouches(!1));
    	*/ 

    	//this._name.setString(a.name);
    	//this._power.setString(abbrNumber(a.effectiveness));
    	//this._loginTime.setString(("\u6700\u540e\u767b\u5f55\uff1a")+getTimeAgo(a.lastLoginTime));
    	this._avatar.loadTexture(a.avatar||"blank_icon.png",ccui.Widget.PLIST_TEXTURE);

        if(a.name=="bomber") {
	        this.setSelected(a);
        }

    	return this._super()
    }
});


FriendItem.W=400;FriendItem.H=124;
FriendItem.createFromPool=function(a,b){var c=cc.pool;return c.hasObject(FriendItem)?c.getFromPool(FriendItem,a,b):new FriendItem(a,b)};


var FriendList=zy.ScrollList.extend({
	ctor:function(){
	    var a={width:400,height:320,gap:12,direction:zy.ScrollView.V,noDataTips:("\u53ef\u60b2\u554a")};
	    this._super(a);

	    this.addListener(AvatarSetting.CHAR_CHOOSE_ITEM,function(evt){
	    	this.setSelected(evt.getUserData());
            this.setPlayerDefine(evt.getUserData());
            zy.qqJson.Char=evt.getUserData()+1;
	    }.bind(this));
	},

    setPlayerDefine:function(idx) {
        idx==0 && (bb.playerDefine.bombItemCnt=1, bb.playerDefine.fireItemCnt=0 , bb.playerDefine.skiItemCnt=0);
        idx==1 && (bb.playerDefine.bombItemCnt=0, bb.playerDefine.fireItemCnt=1, bb.playerDefine.skiItemCnt=0);
        idx==2 && (bb.playerDefine.bombItemCnt=0, bb.playerDefine.fireItemCnt=0 , bb.playerDefine.skiItemCnt=1);
    },

	fill:function(a){
		var b=new Date;
		//this.dispatchEvent(FriendLayer.EVENT_TYPE,a);
		//dm.friend.setType(a);

        var t1 = '[{"playerId":"0f854e66-3d17-4e2c-8cc2-9c935013aee4","bomb":2,"fire":1,"ski":1,"name":"bomber","avatar":"bomb_char.png","lastLevelId":"1-4","lastWave":1,"lastLoginTime":"2016-06-30T05:14:57.000Z","effectiveness":9517},{"playerId":"14302577-6b78-4284-8653-b45efcc5e216","bomb":1,"fire":2,"ski":1,"name":"firer","avatar":"fire_char.png","lastLevelId":"1-2","lastWave":99,"lastLoginTime":"2016-07-02T00:33:20.000Z","effectiveness":0},{"playerId":"14302577-6b78-4284-8653-b45efcc5e216","bomb":1,"fire":1,"ski":2,"name":"skier","avatar":"ski_char.png","lastLevelId":"1-2","lastWave":99,"lastLoginTime":"2016-07-02T00:33:20.000Z","effectiveness":0}]';
        t1 = JSON.parse(t1);

		//a=this.render(FriendItem,dm.friend.getList(a));
		a=this.render(FriendItem,t1);
		b=((new Date).getTime()-b.getTime())/1E3;
		cc.log("\u586b\u5145\u65f6\u95f4:"+b);

		return a
	}
});


var 
    AvatarIcon="mt_nan_l.png jz_nv_l.png yc_nan_l.png zl_nv_l.png by_chaojibianzhongren_avatar_l.png by_diyuliequan_avatar_l.png by_langren_avatar_l.png by_lueduozhe_avatar_l.png by_lueduozhesharenkuang_avatar_l.png by_qubaobao_avatar_l.png by_sizhua_avatar_l.png by_xixiechong_avatar_l.png by_yanshu_avatar_l.png by_zhanglang_avatar_l.png chaojibianzhongren_avatar_l.png diyuliequan_avatar_l.png hechengrennan_avatar_l.png hechengrennv_avatar_l.png langren_avatar_l.png lueduozhe_avatar_l.png lueduozhesharenkuang_avatar_l.png qubaobao_avatar_l.png sizhua_avatar_l.png xiaojiangshi_avatar_l.png xixiechong_avatar_l.png yanshuboss_avatar_l.png zhanglang_avatar_l.png zhuizongzhe_avatar_l.png".split(" "),
    AvatarIconChoose = -1;

AvatarItem=zy.ScrollItem.extend({
	ctor:function(a,b){
		this._super(a,b);
		this.size(AvatarItem.W,AvatarItem.H);

        this.clickHandler(function(){
			this.dispatchEvent(AvatarSetting.EVENT_CHOOSE_ITEM,this.getIndex());
            AvatarIconChoose = this.getIndex();
		}.bind(this))
	},

	createUI:function(a){
		a=cc.Sprite.create("#"+a).addTo(this).align(display.LEFT_BOTTOM);
		this._border=cc.Sprite.create("#avatar_box.png").addTo(a).pos(a.width/2,a.height/2)
    },

	setSelected:function(a){
		this._border.setFrame(a?"role_choice.png":"avatar_box.png");
		return this._super(a)
	}
});

AvatarItem.W=126;AvatarItem.H=126;

var AvatarList=zy.ScrollList.extend({
	ctor:function(){
		this._super({width:4*AvatarItem.W+72,height:2*AvatarItem.H+96,cell:4,gap:24});
	    this.addListener(AvatarSetting.EVENT_CHOOSE_ITEM,function(evt){
	    	this.setSelected(evt.getUserData());
	    }.bind(this));
	    this.fill(AvatarIcon)
	},

	fill:function(a){return this.render(AvatarItem,a)}
}),

AvatarSetting=cc.Node.extend({
	ctor:function(){
		this._super();
		this._container=cc.Scale9Sprite.create("common_box.png",cc.rect(100,50,10,10)).addTo(this).size(620,450).onTouch();
		var a=this._bgTitle=cc.Scale9Sprite.create("dialog_title_bg.png",cc.rect(0,3,444,3)).addTo(this._container).size(474,60).align(display.TOP_CENTER,this._container.width/2,this._container.height-20);
		this._title=cc.LabelTTF.create(("\u66f4\u6362\u5934\u50cf"),"gh",36).addTo(a).align(display.CENTER,a.width/2,a.height/2).attr({lineWidth:2,strokeStyle:cc.color(0,0,0,255)});

		(new zy.Button({
		    	normal:"#confirm_off.png",
		    	pressed:"#confirm_on.png",
		    	size:32
		    })
		).addTo(this._container).align(display.LEFT_CENTER,this._container.width-160,400).onClick(
		    function(){
                //alert(AvatarIconChoose);

                var queryStr = backAddr + "/index/setImg/";
                queryStr += '?qid='+zy.qqJson.QID;
                queryStr += '&img='+AvatarIconChoose;
                queryStr += '&tk='+zy.qqJson.TK;

                //AvatarIconChoose!=-1&&this.dispatchEvent(AvatarSetting.HEAD_CHOOSE_ITEM,AvatarIconChoose)&&zy.sendRequest(queryStr,"",false);
                AvatarIconChoose!=-1&&this.dispatchEvent(AvatarSetting.HEAD_CHOOSE_ITEM,AvatarIconChoose)&&bb.send3GetRequest(queryStr);
                zy.qqJson.QIMG=AvatarIconChoose;
                ModelUIController.close();
		    }.bind(this));

		(new zy.Button({
			    normal:"#close_off.png",
			    pressed:"#close_on.png",
			    size:32
		    })
		).addTo(this._container).align(display.RIGHT_CENTER,this._container.width-20,400).onClick(function(){ModelUIController.close()}.bind(this));

	    this._list=(new AvatarList).addTo(this._container).pos(22,20);
    },

    onEnter:function(){
    	this._super();
    	//this.addListener(PROTOCOL.SET_AVATAR,function(a){ModelUIController.close()})
    }
});


AvatarSetting.showModel=function(){
	ModelUIController.close();
	var t = new AvatarSetting;
	ModelUIController.showModel(t)
};

AvatarSetting.EVENT_CHOOSE_ITEM="AvatarSetting.EVENT_CHOOSE_ITEM";
AvatarSetting.CHAR_CHOOSE_ITEM="AvatarSetting.CHAR_CHOOSE_ITEM";
AvatarSetting.HEAD_CHOOSE_ITEM="AvatarSetting.HEAD_CHOOSE_ITEM";

var topItemNode = cc.Node.extend({
	ctor:function () {
		this._super();
		var b=ccs.load(res.TOP_BAR_JSON).node;
		this.size(b.width,b.height);
		this._node=b.addTo(this);

        var headImgName = AvatarIcon[zy.qqJson.QIMG];
        var headImgAnchor = utils.seekWidgetByName(this, "Image_7");
		var box = cc.Sprite.create("#avatar_box.png").addTo(headImgAnchor).pos(headImgAnchor.width/2,headImgAnchor.height/2);
        box.attr({scale:0.6});

        headImgAnchor.loadTexture(headImgName||"blank_icon.png",ccui.Widget.PLIST_TEXTURE);

	    this.addListener(AvatarSetting.HEAD_CHOOSE_ITEM,function(evt){
            var headImgName = AvatarIcon[evt.getUserData()];
            headImgAnchor.loadTexture(headImgName||"blank_icon.png",ccui.Widget.PLIST_TEXTURE);
	    }.bind(this));
    }
});

var serverValidatingSetting=cc.Node.extend({
    ctor:function(mainUI){
        this._super();

        var waitItem=ccs.load(res.BOMB_WAIT_JSON).node;
        waitItem.addTo(this).pos(-200, 0);

        this.addListener("SERVER_DELAY",function(evt){
            cc.log("validating data:" + evt.getUserData());
            ModelUIController.close();
        }.bind(this));
    },
});

var StartMenuLayer = cc.Layer.extend({
	bgSprite:null,
	scoreLabel:null,

	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		var size = cc.winSize;
		// add bg
		this.bgSprite = new cc.Sprite(res.BackGround_png).addTo(this);
		this.bgSprite.attr({
			x: size.width / 2,
			y: size.height / 2,
		});

bb.validateServer(this);

        //var topItem=ccs.load(res.TOP_BAR_JSON).node;
        var topItem = new topItemNode();
        topItem.addTo(this).pos(size.width-topItem.width, size.height-topItem.height);

        var bottomItem=ccs.load(res.BOTTOM_BAR_JSON).node;
        bottomItem.addTo(this).pos(0,0);

        utils.seekWidgetByName(bottomItem,"Button_Prop").addClickEventListener(AvatarSetting.showModel);

        (new FriendList).fill(1).addTo(this).pos(10,130);

		//add start menu
		var startItem = new cc.MenuItemImage(
				res.Start_N_png,
				res.Start_S_png,
				function () {
					cc.log("Menu is clicked!");
					//cc.director.replaceScene(cc.TransitionFade(1.2, new PlayScene()));
					var layer = new HelloWorldScene();
					//var layer = new ScrollViewTestingLayer();
					layer.setPosition(bb.playRectOffX, bb.playRectOffY);

                    cc.director.runScene(layer);//浏览器不支持
				}, this);

		startItem.attr({
			x: size.width/2+230,
			y: size.height/2+80,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(startItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);

/*
		//add start menu
		var startItem1 = new cc.MenuItemImage(
				res.Start_N_png,
				res.Start_S_png,
				function () {
					cc.log("Menu is clicked!");
					//cc.director.replaceScene(cc.TransitionFade(1.2, new PlayScene()));
					var layer = new HelloWorldScene();
					//var layer = new ScrollViewTestingLayer();

					layer.setPosition(bb.playRectOffX, bb.playRectOffY);

                    cc.director.runScene(layer);//浏览器不支持
				}, this);

		startItem1.attr({
			x: size.width/2+230,
			y: size.height/2-50,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(startItem1);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);
*/

        var cb = function(userInfo) {
            var userInfoObj = JSON.parse(userInfo);
            //topItem_goldSum = cc.LabelBMFont.create(userInfoObj.G1, "res/font/fnt_24"+".fnt").addTo(topItem,1);
            //topItem_goldSum.y=28;
            //topItem_goldSum.x=590;

            userInfoObj.G1 = userInfoObj.G1>0?userInfoObj.G1:0;
            userInfoObj.G2 = userInfoObj.G2>0?userInfoObj.G2:0;

            utils.seekWidgetByName(topItem, "TextField_gold").setString(userInfoObj.G1);
            utils.seekWidgetByName(topItem, "TextField_diam").setString(userInfoObj.G2);

            zy.qqJson.G1 = userInfoObj.G1;
            zy.qqJson.G2 = userInfoObj.G2;

//this.showValidatingUi();

        }.bind(this);

        var queryStr = backAddr + "/index/getGold/";
        queryStr += '?qid='+zy.qqJson.QID;
        queryStr += '&tk='+zy.qqJson.TK;

        //zy.sendRequest(queryStr,"",false,cb,cb);
        // if fail to get result for 3 times, then go back to login scene.
        bb.send3GetRequest(queryStr, cb);

		return true;
	},

    showValidatingUi:function() {
        var es = new serverValidatingSetting(this);
        ModelUIController.showModel(es, 
            c={
                color:cc.color(0,0,0,127),
                offset:{x:0,y:0},
                popup:!0,
                closeOnTouchBlank:0,
                closeWidgets:["CloseButton"]
            }
        )
    }

});


var LoginScene=cc.Scene.extend({
	layer:null,panelType:null,

	ctor:function(){
	    this._super();
	    this.layer=(new StartMenuLayer).addTo(this);
	    //orientationPromptCheck()
	},

	onEnter:function(){
		this._super();
    },

    onResize:function(){if(this.layer&&this.layer.onResize)this.layer.onResize()}
});