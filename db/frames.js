/**
 * 驴子动画帧
 */
var getDonkeyFrames = (function() {

    var frames = {
        daiji : [{
            x : 0,
            y : 0
        }],
        run : [{
            x : 0,
            y : 0,
            duration : 10
        }, {
            x : 128,
            y : 0,
            duration : 10
        }, {
            x : 256,
            y : 0,
            duration : 10
        }, {
            x : 384,
            y : 0,
            duration : 10
        }, {
            x : 512,
            y : 0,
            duration : 10
        }, {
            x : 640,
            y : 0,
            duration : 10
        }, {
            x : 768,
            y : 0,
            duration : 10
        }, {
            x : 896,
            y : 0,
            duration : 10
        }, {
            x : 1024,
            y : 0,
            duration : 10
        }, {
            x : 1152,
            y : 0,
            duration : 10
        }, {
            x : 1280,
            y : 0,
            duration : 10
        }, {
            x : 1408,
            y : 0,
            duration : 10
        }, {
            x : 1536,
            y : 0,
            duration : 10
        }],
        superjump : [{
            x : 0,
            y : 0,
            duration : 30
        }, {
            x : 128,
            y : 0,
            duration : 30
        }, {
            x : 256,
            y : 0,
            duration : 30
        }, {
            x : 384,
            y : 0,
            duration : 30
        }, {
            x : 512,
            y : 0,
            duration : 30
        }, {
            x : 640,
            y : 0,
            duration : 30
        }, {
            x : 768,
            y : 0,
            duration : 30
        }, {
            x : 896,
            y : 0,
            duration : 30
        }, {
            x : 1024,
            y : 0,
            duration : 30
        }, {
            x : 1152,
            y : 0,
            duration : 30
        }, {
            x : 1280,
            y : 0,
            duration : 30
        }, {
            x : 1408,
            y : 0,
            duration : 30
        }],
        jump : [{
            x : 0,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 128,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 256,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 384,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 512,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 640,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 768,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 896,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1024,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1152,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1280,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1408,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1536,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1664,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1792,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 1920,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2048,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2176,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2304,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2432,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2560,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2688,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2816,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 2944,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3072,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3200,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3328,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3456,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3584,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3712,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3840,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 3968,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 4096,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }, {
            x : 4224,
            y : 0,
            duration : 10,
            collRect : [[50, 93, 28, 15]]
        }],
        dead : [{
            x : 0,
            y : 0,
            duration : 20
        }, {
            x : 128,
            y : 0,
            duration : 20
        }, {
            x : 256,
            y : 0,
            duration : 20
        }, {
            x : 384,
            y : 0,
            duration : 20
        }, {
            x : 512,
            y : 0,
            duration : 20
        }, {
            x : 640,
            y : 0,
            duration : 20
        }],
        UFO : [{
            x : 0,
            y : 0,
            duration : 30
        }, {
            x : 256,
            y : 0,
            duration : 30
        }, {
            x : 512,
            y : 0,
            duration : 30
        }, {
            x : 768,
            y : 0,
            duration : 30
        }, {
            x : 1024,
            y : 0,
            duration : 30
        }, {
            x : 1280,
            y : 0,
            duration : 30
        }, {
            x : 1536,
            y : 0,
            duration : 30
        }, {
            x : 1792,
            y : 0,
            duration : 30
        }, {
            x : 2048,
            y : 0,
            duration : 30
        }, {
            x : 2304,
            y : 0,
            duration : 30
        }, {
            x : 2560,
            y : 0,
            duration : 30
        }, {
            x : 2816,
            y : 0,
            duration : 30
        }, {
            x : 3072,
            y : 0,
            duration : 30
        }],
        plan : [{
            x : 0,
            y : 0,
            duration : 30
        }, {
            x : 256,
            y : 0,
            duration : 30
        }, {
            x : 512,
            y : 0,
            duration : 30
        }, {
            x : 768,
            y : 0,
            duration : 30
        }, {
            x : 1024,
            y : 0,
            duration : 30
        }, {
            x : 1280,
            y : 0,
            duration : 30
        }, {
            x : 1536,
            y : 0,
            duration : 30
        }, {
            x : 1792,
            y : 0,
            duration : 30
        }, {
            x : 2048,
            y : 0,
            duration : 30
        }, {
            x : 2304,
            y : 0,
            duration : 30
        }, {
            x : 2560,
            y : 0,
            duration : 30
        }, {
            x : 2816,
            y : 0,
            duration : 30
        }],
        MJ : [{
            x : 0,
            y : 0,
            duration : 60
        }, {
            x : 128,
            y : 0,
            duration : 60
        }, {
            x : 256,
            y : 0,
            duration : 60
        }, {
            x : 384,
            y : 0,
            duration : 60
        }, {
            x : 512,
            y : 0,
            duration : 60
        }, {
            x : 640,
            y : 0,
            duration : 60
        }, {
            x : 768,
            y : 0,
            duration : 60
        }, {
            x : 896,
            y : 0,
            duration : 60
        }, {
            x : 1024,
            y : 0,
            duration : 60
        }, {
            x : 1152,
            y : 0,
            duration : 60
        }, {
            x : 1280,
            y : 0,
            duration : 60
        }, {
            x : 1408,
            y : 0,
            duration : 60
        }, {
            x : 1536,
            y : 0,
            duration : 60
        }, {
            x : 1664,
            y : 0,
            duration : 60
        }],
        qiqiu : [{
            x : 0,
            y : 0,
            duration : 5
        }, {
            x : 128,
            y : 0,
            duration : 5
        }, {
            x : 256,
            y : 0,
            duration : 5
        }, {
            x : 384,
            y : 0,
            duration : 5
        }, {
            x : 512,
            y : 0,
            duration : 5
        }, {
            x : 640,
            y : 0,
            duration : 5
        }, {
            x : 768,
            y : 0,
            duration : 5
        }, {
            x : 896,
            y : 0,
            duration : 5
        }, {
            x : 1024,
            y : 0,
            duration : 5
        }, {
            x : 1152,
            y : 0,
            duration : 5
        }, {
            x : 1280,
            y : 0,
            duration : 5
        }, {
            x : 1408,
            y : 0,
            duration : 5
        }, {
            x : 1536,
            y : 0,
            duration : 5
        }, {
            x : 1664,
            y : 0,
            duration : 5
        }, {
            x : 1792,
            y : 0,
            duration : 5
        }, {
            x : 1920,
            y : 0,
            duration : 5
        }, {
            x : 2048,
            y : 0,
            duration : 5
        }, {
            x : 2176,
            y : 0,
            duration : 5
        }, {
            x : 2304,
            y : 0,
            duration : 5
        }, {
            x : 2432,
            y : 0,
            duration : 5
        }, {
            x : 2560,
            y : 0,
            duration : 5
        }, {
            x : 2688,
            y : 0,
            duration : 5
        }, {
            x : 2816,
            y : 0,
            duration : 5
        }, {
            x : 2944,
            y : 0,
            duration : 5
        }, {
            x : 3072,
            y : 0,
            duration : 5
        }, {
            x : 0,
            y : 128,
            duration : 5
        }, {
            x : 128,
            y : 128,
            duration : 5
        }, {
            x : 256,
            y : 128,
            duration : 5
        }, {
            x : 384,
            y : 128,
            duration : 5
        }, {
            x : 512,
            y : 128,
            duration : 5
        }, {
            x : 640,
            y : 128,
            duration : 5
        }, {
            x : 768,
            y : 128,
            duration : 5
        }, {
            x : 896,
            y : 128,
            duration : 5
        }, {
            x : 1024,
            y : 128,
            duration : 5
        }, {
            x : 1152,
            y : 128,
            duration : 5
        }, {
            x : 1280,
            y : 128,
            duration : 5
        }, {
            x : 1408,
            y : 128,
            duration : 5
        }, {
            x : 1536,
            y : 128,
            duration : 5
        }, {
            x : 1664,
            y : 128,
            duration : 5
        }, {
            x : 1792,
            y : 128,
            duration : 5
        }, {
            x : 1920,
            y : 128,
            duration : 5
        }, {
            x : 2048,
            y : 128,
            duration : 5
        }, {
            x : 2176,
            y : 128,
            duration : 5
        }, {
            x : 2304,
            y : 128,
            duration : 5
        }, {
            x : 2432,
            y : 128,
            duration : 5
        }, {
            x : 2560,
            y : 128,
            duration : 5
        }, {
            x : 2688,
            y : 128,
            duration : 5
        }, {
            x : 2816,
            y : 128,
            duration : 5
        }, {
            x : 2944,
            y : 128,
            duration : 5
        }, {
            x : 3072,
            y : 128,
            duration : 5
        }],
    }

    return function(animName) {
        return frames[animName];
    }
})();
/**
 * 云层动画帧
 */
var getStairFrames = (function() {

    var frames = {
        stair_friable : [{
            x : 0,
            y : 0,
            duration : 50,
            collRect : [[0, 0, 142, 58]]
        }, {
            x : 256,
            y : 0,
            duration : 50
        }, {
            x : 512,
            y : 0,
            duration : 50
        }, {
            x : 768,
            y : 0,
            duration : 50
        }, {
            x : 1024,
            y : 0,
            duration : 50
        }, {
            x : 1280,
            y : 0,
            duration : 50
        }],
        stair_moveable : [{
            x : 0,
            y : 0,
            duration : 50,
            collRect : [[0, 0, 156, 72]]
        }, {
            x : 256,
            y : 0,
            duration : 50,
            collRect : [[0, 0, 156, 72]]
        }, {
            x : 0,
            y : 0,
            duration : 50,
            collRect : [[0, 0, 156, 72]]
        }],
        stair_stable_01 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 154, 54]]
        }],
        stair_stable_02 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 153, 54]]
        }],
        stair_stable_03 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 153, 54]]
        }],
        stair_stable_04 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 153, 54]]
        }],
        stair_stable_05 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 154, 54]]
        }]
    }

    return function(animName) {
        return frames[animName];
    }
})();
/**
 * 道具动画帧
 */
var getPropFrames = (function() {

    var frames = {
        prop_spring01 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 41, 14]]
        }],
        prop_spring03 : [{
            x : 0,
            y : 0
        }],
        props_balloon : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 54, 64]]
        }],
        props_gliding01 : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 75, 64]]
        }],
        props_michael : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 80, 45]]
        }],
        props_super : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 58, 84]]
        }],
        props_ufo : [{
            x : 0,
            y : 0,
            collRect : [[0, 0, 71, 44]]
        }]
    }

    return function(animName) {
        return frames[animName];
    }
})();

/**
 * 效果动画帧
 */
var getEffectFrames = (function() {
    var frames = {
        cloud : [{
            x : 0,
            y : 0,
            duration : 30
        }, {
            x : 64,
            y : 0,
            duration : 30
        }, {
            x : 128,
            y : 0,
            duration : 30
        }, {
            x : 172,
            y : 0,
            duration : 30
        }]
    }
    return function(animName) {
        return frames[animName];
    }
})();

