/**
 * 云朵践踏效果
 */
(function() {
    var Cloud = function(cfg) {
    	Sprite.call(this,cfg);
    }
    GC.inherit(Cloud, Sprite);
    Cloud.prototype.oninit = function() {
        var anim = new Animation({
            image : GC.ImageManager.get('cloud'),
            frames : getEffectFrames('cloud'),
            loop : false
        });
        this.anim = anim;
        var self = this;
        anim.onend = function() {
            self.destory();
        }
        anim.init();
        anim.play();
    }
    window.Cloud = Cloud;
})();
