var a_ = 1;
var b_ = 2;
var ANDROID_PLATFORM = "android";
var IOS_PLATFORM = "mac os";
var WINDOWS_PLATFORM = "windows";
var OTHER_PLATFORM = "others";
var CHROME_BROWSER = "chrome";
var FIREFOX_BROWSER = "firefox";
var OTHER_BROWSER = "others";
var UnitTest = {};
var c_ = a_;
if (c_ == a_ && typeof (console) == "undefined") {
	var console = {
		log : function() {
		}
	};
}
if (c_ == a_) {
	var JumpinJack;
} (function() {
	if (c_ == a_) {
		var development = true;
		var test = true;
		var userAgent;
		var platform;
		var browser;
		var isNativeAndroidBrowser;
		if (!userAgent) {
			userAgent = navigator.userAgent;
			var ua = userAgent.toLowerCase();
			if (ua.indexOf(ANDROID_PLATFORM) > -1) {
				platform = ANDROID_PLATFORM;
			} else if (ua.indexOf(IOS_PLATFORM) > -1) {
				platform = IOS_PLATFORM;
			} else if (ua.indexOf(WINDOWS_PLATFORM) > -1) {
				platform = WINDOWS_PLATFORM;
			} else {
				platform = OTHER_PLATFORM;
			}
			if (ua.indexOf(CHROME_BROWSER) > -1) {
				browser = CHROME_BROWSER;
			} else if (ua.indexOf(FIREFOX_BROWSER) > -1) {
				browser = FIREFOX_BROWSER;
			} else
				browser = OTHER_BROWSER;
		}
		if (isNativeAndroidBrowser == undefined) {
			isNativeAndroidBrowser = platform == ANDROID_PLATFORM && browser != FIREFOX_BROWSER && browser != CHROME_BROWSER;
		}
	}
	var viewDrawImageRect;
	if (c_ == b_) {
		var Core = require("../../../NGCore/Client/Core").Core;
	}
	var d_ = 2;
	var e_ = 1;
	var supportChromeOnAndroid;
	JumpinJack = function(f_, g_, config, jsonData) {
		var h_ = function(i_, j_) {
			j_.g_ = (( typeof (g_) == "string") ? document.getElementById(g_) : g_);
			j_.i_ = i_;
			j_.revision = "$Rev: 3134 $";
			j_.config = config || {};
			if (i_.k_ != d_) {
				throw "wrong code format: " + i_.k_ + "." + i_.l_ + "\nexpected: " + d_ + "." + e_;
			}
			if (i_.l_ != e_) {
			}
			j_.m_ = {};
			j_.n_ = i_.n_;
			j_.o_ = i_.o_;
			j_.p_ = i_.p_;
			j_.q_ = [];
			j_.r_ = [];
			j_.s_ = [];
			j_.t_ = [];
			j_.u_ = null;
			j_.v_ = 0;
			j_.w_ = -1;
			j_.x_ = 0;
			j_.y_ = null;
			j_.z_ = null;
			j_.ab_ = [];
			j_.ac_ = {};
			j_.ad_ = "./";
			j_.ae_ = new af_.ag_(j_);
			j_.ah_ = new af_.ai_(j_);
			j_.ah_.aj_(j_.g_, j_.o_[2] / 20, j_.o_[3] / 20);
			j_.api = new af_.ak_(j_);
			j_.touch = new af_.al_(j_, j_.g_);
		};
		if (c_ == a_) {
			am_(f_, (function(j_) {
				return function(i_) {
					h_(i_, j_);
					j_.an_ = true;
					if (j_.config.disableAutoStart) {
						j_.an_ = false;
					}
					j_.onload && j_.onload();
					j_.start();
				};
			})(this));
		} else if (c_ == b_) {
			var j_ = this;
			h_(jsonData, j_);
			j_.updateListener = null;
			j_.onload && j_.onload();
		}
	};
	if (c_ == a_) {
		var af_ = JumpinJack;
	} else if (c_ == b_) {
		af_ = JumpinJack;
	}
	af_.prototype = {
		cachedCanvas : [],
		getAvailableCanvas : function() {
			var freeCanvas = null;
			for (var i = 0, length = this.cachedCanvas.length; i < length; i++) {
				if (!this.cachedCanvas[i].isUsed) {
					freeCanvas = this.cachedCanvas[i];
					break;
				}
			}
			return freeCanvas;
		},
		cacheCanvas : function(cv) {
			this.cachedCanvas.push(cv);
		},
		start : function() {
			this.u_ = new Date().getTime();
			this.ao_ = 0;
			this.v_ = 0;
			this.ap_ = function() {
				this.z_ = af_.aq_.ar_(this.i_.as_, null, null, false, this);
			};
			this.at_(this.i_.au_, this.i_.av_);
		},
		destroy : function() {
			if (this.updateListener) {
				Core.UpdateEmitter.removeListener(this.updateListener);
			}
			this.ah_.destroy();
		},
		aw_ : function(ax_) {
			this.ax_ = ax_;
		},
		ay_ : function(x, y) {
			var az_ = [];
			var ba_ = this.ah_.bb_(x, y);
			if (c_ == a_) {
				for (var i in ba_) {
					az_.push(ba_[i].bc_);
				}
			} else if (c_ == b_) {
				for (var i = 0; i < ba_.length; i++) {
					az_.push(ba_[i].bc_);
				}
			}
			var j_ = this;
			var bd_ = function(be_) {
				if (!be_.bf_) {
					return;
				}
				if (be_.bf_.bg_ < x * 20 && x * 20 < be_.bf_.bh_ && be_.bf_.bi_ < y * 20 && y * 20 < be_.bf_.bj_) {
					if (be_.bk_.bl_ && be_ != j_.z_) {
						az_.push(be_.bm_);
					}
				}
				for (var i = 0; i < be_.bn_.length; i++) {
					bd_(be_.bn_[i]);
				}
			};
			bd_(this.z_);
			return az_;
		},
		at_ : function(bo_, bp_) {
			var bq_;
			var replaceCount = 0;
			if (this.i_.ac_) {
				bq_ = 0;
				this.ac_ = this.i_.ac_;
				if (this.config.fileMapping) {
					for (var br_ in this.config.fileMapping) {
						replaceCount++;
						var bs_ = new Image();
						var j_ = this;
						bs_.onload = function() {
							replaceCount--;
							if (!replaceCount) {
								j_.bt_();
							}
						};
						bs_.src = this.config.fileMapping[br_];
						this.i_.ac_[br_] = bs_;
					}
				}
			} else {
				bq_ = bo_ + bp_ + ( bu_ ? 0 : bv_.length);
			}
			if (bq_ == 0) {
				if (replaceCount) {
					return;
				}
				this.bt_();
				return;
			}
			var bw_ = 0;
			if (!this.i_.ac_) {
				for (var i = 0; i < bo_; i++) {
					var br_ = (i + 1) + ".png";
					this.ac_[br_] = new Image();
					this.ac_[br_].src = this.ad_ + "png/" + br_ + "?" + new Date().getTime();
					this.ac_[br_].onload = function() {
						bw_++;
						if (bw_ == bq_) {
							this.bt_();
						}
					};
				}
				for (var i = 0; i < bp_; i++) {
					var br_ = (i + 1) + ".jpeg";
					this.ac_[br_] = new Image();
					this.ac_[br_].src = this.ad_ + "jpeg/" + br_ + "?" + new Date().getTime();
					this.ac_[br_].onload = function() {
						bw_++;
						if (bw_ == bq_) {
							this.bt_();
						}
					};
				}
			}
		},
		bt_ : function() {
			if (this.config.fps) {
				this.p_ = this.config.fps;
			}
			if (this.config.onpreload) {
				for (var i = 0; i < this.i_.as_.length; i++) {
					var bx_ = this.i_.as_[i];
					if (bx_) {
						switch (bx_.by_) {
							case "bz_":
							case "ca_":
							case "cb_":
							case "cc_":
							case "cd_":
							case "ce_":
							case "cf_":
							case "cg_":
							case "ch_":
							case "ci_":
							case "cj_":
							case "ck_":
								this.m_[bx_.bc_] = bx_;
								break;
						}
						this.ah_.cl_(bx_);
					}
				}
				var j_ = this;
				(function cm_() {
					var az_ = j_.ah_.cn_();
					if (az_) {
						if (j_.config.onpreload) {
							j_.config.onpreload(az_[0], az_[1]);
						}
						setTimeout(cm_, 0);
					} else {
						if (c_ == a_ && j_.config.onloadCallback) {
							j_.config.onloadCallback();
						}
						j_.co_();
					}
				})();
			} else {
				if (c_ == a_ && this.config.onloadCallback) {
					this.config.onloadCallback();
				}
				this.co_();
			}
		},
		co_ : function() {
			if (c_ == a_ && !this.an_) {
				return;
			}
			var j_ = this;
			if (this.config.disableFrameSkip) {
				setTimeout(function() {
					j_.co_();
				}, 1000 / this.p_);
			}
			if (this.config.disableFrameSkip) {
				cp_ = this.v_ + 1;
			} else {
				var cq_ = function(j_) {
					j_.ao_ = cr_ - cp_ / j_.p_ * 1000;
				};
				var cr_;
				if (c_ == a_) {
					cr_ = new Date().getTime();
				} else if (c_ == b_) {
					cr_ = Core.Time.getFrameTime();
				}
				if (this.ao_) {
					var cp_ = Math.floor((cr_ - this.ao_) * this.p_ / 1000) + 1;
				} else {
					this.ao_ = cr_;
					cp_ = 1;
				}
				if (this.v_ == 1) {
					cp_ = 2;
					cq_(this);
				}
				if ((c_ == a_ && cp_ - this.v_ > 50) || (c_ == b_ && cp_ - this.v_ > 12)) {
					cp_ = this.v_ + 1;
					cq_(this);
				}
			}
			this.ae_.updateDrag();
			var cs_ = 0;
			if (cp_ > this.v_) {
				cs_ = 1;
				for (var ct_ = this.v_; ct_ < cp_; ct_++) {
					this.t_ = [];
					for (var i = this.q_.length - 1; i >= 0; i--) {
						var be_ = this.q_[i];
						if (be_.cu_) {
							continue;
						}
						if (be_.cv_) {
							var cw_;
							if (be_.bk_.cx_ >= be_.bk_.cy_) {
								cw_ = 1;
							} else {
								cw_ = be_.bk_.cx_ + 1;
							}
							this.cz_(be_, cw_, false);
						}
					}
					if (!this.z_) {
						this.ap_();
						if (c_ == b_ && this.config.listener.onLoadMovieClip) {
							this.config.listener.onLoadMovieClip();
						}
					}
					var executeAction = function(j_) {
						while (j_.s_.length || j_.r_.length) {
							var action;
							if (j_.s_.length) {
								action = j_.s_.shift();
							} else {
								action = j_.r_.shift();
							}
							var da_ = true;
							if (c_ == a_) {
								for (var db_ in j_.t_) {
									if (j_.t_[db_] == action[0].dc_) {
										da_ = false;
										break;
									}
								}
							} else if (c_ == b_) {
								for (var db_ = 0; db_ < j_.t_.length; db_++) {
									if (j_.t_[db_] == action[0].dc_) {
										da_ = false;
										break;
									}
								}
							}
							if (da_) {
								j_.ae_.dd_(action[0], action[1]);
							}
						}
					};
					if (c_ == a_) {
						executeAction(this);
					}
					for (var i = this.ab_.length - 1; i >= 0; i--) {
						var de_ = this.ab_[i];
						if (de_.df_) {
							continue;
						}
						var dg_ = de_;
						while (dg_) {
							if (!dg_.dh_()) {
								break;
							}
							dg_ = dg_.dg_;
						}
						if (dg_) {
							continue;
						}
						var di_ = false;
						for (var dj_ in de_.dk_) {
							if (c_ == a_ || (c_ == b_ && de_.dk_.hasOwnProperty(dj_))) {
								if (this.touch.dl_(dj_)) {
									if (c_ == a_) {
										this.r_.push([de_.dg_, de_.dk_[dj_]]);
									} else if (c_ == b_) {
										this.r_.unshift([de_.dg_, de_.dk_[dj_]]);
									}
									di_ = true;
									break;
								} else if (dj_ == "dm_" && this.touch.dn_) {
									if (this.ah_.do_(de_, this.touch.dn_.x, this.touch.dn_.y)) {
										this.r_.push([de_.dg_, de_.dk_[dj_]]);
										di_ = true;
										break;
									}
								} else if (dj_ == "release" && this.touch.dp_) {
									if (this.ah_.do_(de_, this.touch.dp_.x, this.touch.dp_.y)) {
										this.r_.push([de_.dg_, de_.dk_[dj_]]);
										di_ = true;
										break;
									}
								}
							}
						}
						if (di_) {
							break;
						}
					}
					if (c_ == a_) {
						executeAction(this);
					} else if (c_ == b_) {
					}
					this.touch.dn_ = null;
					this.touch.dp_ = null;
					this.touch.dq_();
					if (c_ == b_) {
						executeAction(this);
					}
					if (ct_ == cp_ - 1) {
						this.ah_.dr_();
						this.w_ = ct_;
					}
					this.v_++;
					if (c_ == a_) {
						if (window.dev && window.dev.r) {
							window.dev.r(this.ao_, this.v_, this.p_, this.ah_.ds_.canvas);
						}
					}
				}
			}
			if (this.ax_) {
				this.ax_(this.v_);
			}
			var j_ = this;
			if (!this.config.disableFrameSkip) {
				if (c_ == a_) {
					setTimeout(function() {
						j_.co_();
					}, 1000 / 60);
				} else if (c_ == b_) {
					if (!this.updateListener) {
						this.updateListener = new Core.MessageListener();
						this.updateListener.onUpdate = function() {
							j_.co_();
						};
						Core.UpdateEmitter.addListener(this.updateListener, this.updateListener.onUpdate);
					}
				}
			}
			if (c_ == a_) {
			}
			if (c_ == b_) {
			}
		},
		runN : function(n) {
			for (var i = 0; i < n; i++) {
				this.co_();
			}
		},
		dt_ : function(dc_) {
			this.t_.push(dc_);
		},
		cz_ : function(be_, du_, dv_) {
			du_ = af_.dw_(du_);
			if (c_ == a_) {
			}
			if (du_ < 1) {
				du_ = 1;
			}
			var dx_ = true;
			if (du_ > be_.bk_.cy_) {
				du_ = be_.bk_.cy_;
				dx_ = false;
			}
			var dy_ = be_.bk_.cx_;
			if (be_.cu_ || dy_ == du_) {
				return;
			}
			be_.bk_.cx_ = du_;
			var dz_ = be_.ea_[du_];
			if (dz_ && dx_) {
				for (var i = 0, eb_ = dz_.length; i < eb_; i++) {
					if ((c_ == b_ && dz_.hasOwnProperty(i)) || c_ == a_) {
						if (dv_) {
							this.s_.push([be_, dz_[i]]);
						} else {
							this.r_.push([be_, dz_[i]]);
						}
					}
				}
			}
			var ec_ = be_.ed_[dy_];
			for (var ee_ in be_.ef_) {
				var span = ec_[ee_];
				if (span) {
					if (dy_ < du_) {
						var eg_ = span[1];
						if (eg_ != -1 && eg_ - 1 < du_) {
							be_.eh_(ee_);
						}
					} else {
						var ei_ = span[0];
						if (ei_ > du_) {
							be_.eh_(ee_);
						}
					}
				}
			}
			var ej_ = be_.ed_[du_];
			for (var ee_ in ej_) {
				if (c_ == b_) {
					if (!ej_.hasOwnProperty(ee_)) {
						continue;
					}
				}
				var ek_ = ej_[ee_][2];
				var el_ = (ec_ && ec_[ee_]) ? ec_[ee_][2] : null;
				if (ek_ == el_) {
					continue;
				}
				ek_ = af_.em_(ek_);
				var en_ = this.v_;
				ek_.eo_ = {
					ep_ : ++this.x_,
					eq_ : en_
				};
				if (be_.ef_[ee_]) {
					be_.er_(ee_, ek_);
					continue;
				}
				var es_ = (ej_[ee_][0] != du_);
				var et_ = this.m_[ek_.bc_];
				if (!et_) {
				} else {
					switch (et_.by_) {
						case "cf_":
							var eu_ = af_.aq_.ar_(et_.as_, be_, ek_, (es_ || dv_), this);
							eu_.ev_(ek_);
							ek_.eo_.be_ = eu_;
							break;
						case "ce_":
							var de_ = af_.aq_.ew_(et_, be_, ek_, (es_ || dv_), this);
							de_.ev_(ek_);
							ek_.eo_.be_ = de_;
							break;
						case "ch_":
							var az_ = af_.ag_.ex_(be_, et_.ey_);
							var g_ = az_[0];
							var ez_ = az_[1];
							if (g_) {
								if ( typeof (g_.fa_[ez_]) == "undefined") {
									if (ez_) {
										g_.fa_[ez_] = et_.fb_;
									}
								} else {
									et_.fb_ = g_.fa_[ez_] + "";
								}
							} else {
							}
							break;
					}
					ek_.status = "fc_";
					be_.ef_[ee_ - 0] = ek_;
				}
			}
		}
	};
	af_.aq_ = function(as_, dg_, fd_, fe_, ff_) {
		if (!ff_)
			throw "e";
		this.ff_ = ff_;
		this.ef_ = {};
		this.bk_ = {
			fg_ : 0,
			fh_ : 0,
			cx_ : 0,
			cy_ : 0,
			fi_ : 100,
			fj_ : 1,
			fk_ : 0,
			fl_ : 0,
			fm_ : null,
			fn_ : -1,
			bl_ : null,
			fo_ : null,
			fp_ : null,
			fq_ : 1,
			fr_ : 0,
			fs_ : 100,
			ft_ : 100,
			fu_ : 0,
			fv_ : 90,
			fw_ : 1,
			fx_ : 1,
			fy_ : 0,
			fz_ : 0,
			ga_ : 1,
			gb_ : 1,
			gc_ : 1,
			gd_ : 0,
			ge_ : 0,
			gf_ : 0,
			gg_ : 0
		};
		this.gh_ = false;
		this.fa_ = {};
		this.cv_ = true;
		this.gi_ = false;
		this.transform = null;
		this.gj_ = null;
		this.ea_ = null;
		this.ed_ = null;
		this.gk_ = (( typeof (fe_) == "undefined") ? false : true);
		this.dk_ = {};
		this.dg_ = dg_;
		this.bn_ = [];
		if (c_ == a_) {
			this.childrenMap = {};
		}
		this.cu_ = false;
		this.gl_ = 0;
		this.eq_ = 0;
		this.gm_ = {
			gn_ : -1,
			eq_ : true
		};
		if (!this.gk_) {
			this.go_(as_);
		} else {
			this.gp_(as_, fe_);
		}
		this.gq_(fd_);
		this.bm_ = ((dg_) ? dg_.bm_ + "/" + this.bk_.bl_ : "");
	};
	af_.aq_.prototype = {
		go_ : function(as_) {
			if (this.gj_ != null) {
				return;
			}
			this.gj_ = {};
			this.ea_ = [];
			this.ed_ = [];
			var gr_ = {};
			var gs_ = 1;
			this.ed_[gs_] = {};
			for (var i = 0; i < as_.length; i++) {
				var bx_ = as_[i];
				if (bx_) {
					switch (bx_.by_) {
						case "gt_":
							if (!this.ea_[gs_]) {
								this.ea_[gs_] = [];
							}
							this.ea_[gs_].push(bx_.gu_);
							break;
						case "gv_":
							var ee_ = bx_.ee_;
							if (ee_ == null) {
								break;
							}
							var gw_ = this.ff_.m_[bx_.bc_];
							if (gw_ && gw_.by_ == "ck_") {
								var gx_ = af_.gy_(this.ff_.m_[bx_.bc_], bx_.gz_, this.ff_.m_);
								bx_.bc_ = gx_.bc_;
							}
							if (bx_.ha_ == "fc_") {
								if (gr_[ee_]) {
									gr_[ee_ + 0.5] = [gs_, bx_];
								} else {
									gr_[ee_] = [gs_, bx_];
								}
							} else {
								if (!gr_[ee_])
									continue;
								var es_ = gr_[ee_][1];
								for (var dj_ in es_) {
									if (bx_[dj_] == null) {
										bx_[dj_] = es_[dj_];
									}
								}
								if (bx_.bc_ >= 65536) {
									var hb_ = bx_.bc_ >> 16;
									var gx_ = af_.gy_(this.ff_.m_[hb_], bx_.gz_, this.ff_.m_);
									bx_.bc_ = gx_.bc_;
									bx_.ha_ = "hc_";
								}
								if (bx_.ha_ == "hc_") {
									for (var j = gr_[ee_][0]; j < gs_; j++) {
										this.ed_[j][ee_] = [gr_[ee_][0], gs_, this.ed_[j][ee_][2]];
									}
									gr_[ee_] = [gs_, bx_];
								} else {
									gr_[ee_] = [gr_[ee_][0], bx_];
								}
							}
							break;
						case "hd_":
							var ee_ = bx_.ee_;
							if (ee_ == null) {
								break;
							}
							if (gr_[ee_]) {
								for (var j = gr_[ee_][0]; j < gs_; j++) {
									this.ed_[j][ee_] = [gr_[ee_][0], gs_, this.ed_[j][ee_][2]];
								}
								delete gr_[ee_];
							}
							break;
						case "he_":
							for (var ee_ in gr_) {
								this.ed_[gs_][ee_] = [gr_[ee_][0], -1, gr_[ee_][1]];
							}
							this.ed_[++gs_] = {};
							break;
						case "hf_":
							if (c_ == a_) {
								this.gj_[bx_.hg_] = gs_;
							} else {
								this.gj_[bx_.hg_.toLowerCase()] = gs_;
							}
							break;
						case "bz_":
						case "ca_":
						case "cb_":
						case "cc_":
						case "cd_":
							if (!(bx_.hh_ in this.ff_.ac_)) {
								throw "[DefineImage] Unknown image file : " + bx_.hh_;
							}
						case "ce_":
						case "cf_":
						case "cg_":
						case "ch_":
						case "ci_":
						case "cj_":
						case "ck_":
							this.ff_.m_[bx_.bc_] = bx_;
							break;
						case "hi_":
							this.ff_.ah_.hj_(bx_.hk_);
							break;
						default:
							break;
					}
				}
			}
			this.bk_.cy_ = gs_ - 1;
			this.bk_.fn_ = gs_ - 1;
		},
		gp_ : function(as_, hl_) {
			if (this.gj_ != null) {
				return;
			}
			this.cv_ = false;
			this.gj_ = {
				"hm_" : 1,
				"hn_" : 2,
				"ho_" : 3,
				"hp_" : 4
			};
			this.bk_.cy_ = 4;
			this.bk_.fn_ = 4;
			this.ea_ = [];
			this.ed_ = [null, {}, {}, {}, {}, {}];
			if (c_ == a_) {
				for (var i = 0, i_len = as_.length; i < i_len; i++) {
					var hq_ = as_[i];
					for (var dj_ = 0, key_len = hq_.hr_.length; dj_ < key_len; dj_++) {
						if (c_ == a_ || (c_ == b_ && hq_.hr_.hasOwnProperty(dj_))) {
							var hs_ = false;
							if (hq_.hr_[dj_] == "hp_") {
								hs_ = true;
							}
							var ek_ = {
								by_ : "gv_",
								bc_ : hq_.bc_,
								ee_ : hq_.ee_ + ( hs_ ? 65536 : 0),
								transform : hq_.transform,
								ht_ : hq_.ht_,
								hu_ : 0,
								gz_ : -1
							};
							if (hs_) {
								for (var gs_ = 1; gs_ <= 3; gs_++) {
									this.ed_[gs_][ek_.ee_] = [gs_, gs_ + 1, ek_];
								}
							} else {
								var gs_ = this.gj_[hq_.hr_[dj_]];
								this.ed_[gs_][ek_.ee_] = [gs_, gs_ + 1, ek_];
							}
						}
					}
				}
				for (var ei = 0, ei_len = hl_.length; ei < ei_len; ei++) {
					if (c_ == a_ || (c_ == b_ && hl_.hasOwnProperty(ei))) {
						var be = hl_[ei];
						if (be.hv_) {
							this.dk_[be.hv_] = be.gu_;
						}
						if (be.hw_) {
							this.dk_["dm_"] = be.gu_;
						} else if (be.hx_) {
							this.dk_["release"] = be.gu_;
						}
					}
				}
			} else if (c_ == b_) {
				for (var i in as_) {
					var hq_ = as_[i];
					for (var dj_ in hq_.hr_) {
						if (hq_.hr_.hasOwnProperty(dj_)) {
							var hs_ = false;
							if (hq_.hr_[dj_] == "hp_") {
								hs_ = true;
							}
							var ek_ = {
								by_ : "gv_",
								bc_ : hq_.bc_,
								ee_ : hq_.ee_ + ( hs_ ? 65536 : 0),
								transform : hq_.transform,
								ht_ : hq_.ht_,
								hu_ : 0,
								gz_ : -1
							};
							if (hs_) {
								for (var gs_ = 1; gs_ <= 3; gs_++) {
									this.ed_[gs_][ek_.ee_] = [gs_, gs_ + 1, ek_];
								}
							} else {
								var gs_ = this.gj_[hq_.hr_[dj_]];
								this.ed_[gs_][ek_.ee_] = [gs_, gs_ + 1, ek_];
							}
						}
					}
				}
				for (var i in hl_) {
					if (hl_.hasOwnProperty(i)) {
						var be = hl_[i];
						if (be.hv_) {
							this.dk_[be.hv_] = be.gu_;
						}
						if (be.hw_) {
							this.dk_["dm_"] = be.gu_;
						} else if (be.hx_) {
							this.dk_["release"] = be.gu_;
						}
					}
				}
			}
			this.ff_.ab_.push(this);
		},
		eh_ : function(ee_) {
			var ek_ = this.ef_[ee_];
			if (!ek_) {
				return;
			}
			this.eq_ = this.ff_.v_;
			delete this.ef_[ee_];
			if (ek_.eo_.be_) {
				var j_ = this;
				var hy_ = function(be_) {
					be_.cu_ = true;
					for (var i = be_.bn_.length - 1; i >= 0; i--) {
						hy_(be_.bn_[i]);
					}
					af_.hz_(be_.dg_.bn_, be_);
					if (c_ == a_) {
						af_.hz_(be_.dg_.childrenMap[be_.bk_.bl_], be_);
					}
					if (be_.gk_) {
						af_.hz_(j_.ff_.ab_, be_);
					} else {
						af_.hz_(j_.ff_.q_, be_);
					}
					j_.ff_.dt_(be_.dc_);
				};
				hy_(ek_.eo_.be_);
			}
			if (af_.ai_.ia_) {
				af_.ai_.ia_(ek_);
			}
		},
		er_ : function(ee_, ek_) {
			var eo_ = this.ef_[ee_].eo_;
			delete this.ef_[ee_].eo_;
			ek_.eo_ = eo_;
			ek_.eo_.eq_ = this.ff_.v_;
			if (eo_.be_) {
				if (!eo_.be_.gh_) {
					eo_.be_.ev_(ek_);
				}
			}
			this.ef_[ee_] = ek_;
			if (af_.ai_.ib_) {
				af_.ai_.ib_(this.ef_[ee_], ek_);
			}
		},
		ic_ : function(name) {
			if (c_ == a_) {
				var id_ = this.childrenMap[name];
				if (id_ && id_[0]) {
					return id_ && id_[0];
				}
			}
			if (c_ == b_) {
				for (var i = 0; i < this.bn_.length; i++) {
					var ie_ = this.bn_[i];
					if (af_.toLowerCase(ie_.bk_.bl_) == af_.toLowerCase(name)) {
						return ie_;
					}
				}
			} else {
				name = name.toLowerCase();
				var bn_ = this.bn_;
				for (var i in bn_) {
					var ie_ = bn_[i];
					if (af_.toLowerCase(ie_.bk_.bl_) == name) {
						return ie_;
					}
				}
			}
			return null;
		},
		em_ : function(name, if_) {
			var az_ = af_.aq_.ar_(this.ff_.m_[if_.bc_].as_, this.dg_, if_, true, this.ff_);
			az_.bk_ = af_.em_(this.bk_);
			var oldName = az_.bk_["bl_"];
			az_.bk_.bl_ = name;
			az_.bk_.cx_ = 1;
			az_.gi_ = true;
			return az_;
		},
		ig_ : function(w_) {
			var az_ = this.eq_;
			if (az_ > w_) {
				return true;
			}
			if (this.ih_(w_)) {
				return true;
			}
			var be_ = this.dg_;
			while (be_) {
				if (be_.eq_ > w_) {
					return true;
				}
				be_ = be_.dg_;
			}
			return false;
		},
		ih_ : function(w_) {
			if (this.gm_.gn_ == this.ff_.v_) {
				return this.gm_.eq_;
			} else {
				this.gm_.gn_ = this.ff_.v_;
				for (var i in this.ef_) {
					var if_ = this.ef_[i];
					var be_ = if_.eo_.be_;
					var c = be_ ? be_.ig_(w_) : (if_.eo_.eq_ > w_);
					if (c) {
						this.gm_.eq_ = true;
						return true;
					}
					if (this.ff_.m_[if_.bc_].by_ == "ch_") {
						this.gm_.eq_ = true;
						return true;
					}
				}
				this.gm_.eq_ = false;
				return false;
			}
		},
		gq_ : function(fd_) {
			if (fd_ && fd_.name) {
				this.bk_.bl_ = fd_.name;
			} else {
				if (this.dg_) {
					this.bk_.bl_ = "ii_" + (++this.dg_.gl_);
				} else {
					this.bk_.bl_ = "instance1";
				}
			}
			if (this.dg_) {
				this.dg_.bn_.push(this);
				if (c_ == a_) {
					var name = this.bk_.bl_;
					if (this.dg_.childrenMap[name] && this.dg_.childrenMap[name].length) {
						this.dg_.childrenMap[name].push(this);
					} else {
						this.dg_.childrenMap[this.bk_.bl_] = [this];
					}
				}
			}
		},
		ev_ : function(fd_) {
			if (fd_.transform) {
				delete fd_.transform.by_;
				this.ij_(fd_.transform);
			}
			if (fd_.ht_) {
				delete fd_.ht_.by_;
				this.ik_(fd_.ht_);
			} else {
				this.ik_(af_.il_());
			}
		},
		ij_ : function(transform) {
			this.bk_.fg_ = transform.im_ / 20;
			this.bk_.fh_ = transform.in_ / 20;
			this.bk_.fw_ = transform.io_;
			this.bk_.fx_ = transform.ip_;
			this.bk_.fy_ = transform.iq_;
			this.bk_.fz_ = transform.ir_;
			this.is_();
		},
		is_ : function() {
			this.eq_ = this.ff_.v_;
			this.bk_.fs_ = Math.sqrt(this.bk_.fw_ * this.bk_.fw_ + this.bk_.fy_ * this.bk_.fy_) * 100;
			this.bk_.ft_ = Math.sqrt(this.bk_.fx_ * this.bk_.fx_ + this.bk_.fz_ * this.bk_.fz_) * 100;
			this.bk_.fu_ = Math.atan2(this.bk_.fy_, this.bk_.fw_) * 180 / Math.PI;
			this.bk_.fv_ = Math.atan2(this.bk_.fx_, this.bk_.fz_) * 180 / Math.PI;
		},
		ik_ : function(it_) {
			this.eq_ = this.ff_.v_;
			this.bk_.fi_ = it_.iu_ * 100;
			this.bk_.ga_ = it_.iv_;
			this.bk_.gb_ = it_.iw_;
			this.bk_.gc_ = it_.ix_;
			this.bk_.gd_ = it_.iy_;
			this.bk_.ge_ = it_.iz_;
			this.bk_.gf_ = it_.ja_;
			this.bk_.gg_ = it_.jb_;
		},
		jc_ : function() {
			return {
				im_ : this.bk_.fg_ * 20,
				in_ : this.bk_.fh_ * 20,
				io_ : this.bk_.fw_,
				ip_ : this.bk_.fx_,
				iq_ : this.bk_.fy_,
				ir_ : this.bk_.fz_
			};
		},
		jd_ : function() {
			if (this.bk_.fi_ == 100 && this.bk_.ga_ == 1 && this.bk_.gb_ == 1 && this.bk_.gc_ == 1 && this.bk_.gg_ == 0 && this.bk_.gd_ == 0 && this.bk_.ge_ == 0 && this.bk_.gf_ == 0) {
				return null;
			}
			return {
				iu_ : this.bk_.fi_ / 100,
				iv_ : this.bk_.ga_,
				iw_ : this.bk_.gb_,
				ix_ : this.bk_.gc_,
				iy_ : this.bk_.gd_,
				iz_ : this.bk_.ge_,
				ja_ : this.bk_.gf_,
				jb_ : this.bk_.gg_
			};
		},
		je_ : function(ff_) {
			var az_ = [null, null, null, null];
			for (var i in this.ef_) {
				var if_ = this.ef_[i];
				var et_ = ff_.m_[if_.bc_];
				var jf_ = null;
				switch (et_.by_) {
					case "cg_":
					case "ch_":
					case "cj_":
						jf_ = et_.jf_;
						break;
					case "cf_":
						jf_ = if_.eo_.be_.je_(ff_);
						break;
					default:
						if (c_ == a_) {
						} else {
							throw "Unimplemented : " + et_.by_;
						}
				}
				if (c_ == a_ && !jf_) {
					continue;
				}
				var jg_;
				if (if_.transform) {
					var rect = af_.jh_(if_.transform, jf_[0], jf_[1], jf_[2], jf_[3]);
					jg_ = [rect.bg_, rect.bi_, rect.bh_, rect.bj_];
				} else {
					jg_ = jf_;
				}
				if (az_[0] == null || jg_[0] < az_[0]) {
					az_[0] = jg_[0];
				}
				if (az_[1] == null || jg_[1] < az_[1]) {
					az_[1] = jg_[1];
				}
				if (az_[2] == null || jg_[2] > az_[2]) {
					az_[2] = jg_[2];
				}
				if (az_[3] == null || jg_[3] > az_[3]) {
					az_[3] = jg_[3];
				}
			}
			var t = this.jc_();
			var rect = af_.jh_(t, az_[0], az_[1], az_[2], az_[3]);
			return [rect.bg_, rect.bi_, rect.bh_, rect.bj_];
		},
		ji_ : function(value) {
			this.eq_ = this.ff_.v_;
			var jj_ = this.bk_.fs_;
			if (jj_ != 0) {
				var jk_ = value / jj_;
				this.bk_.fw_ *= jk_;
				this.bk_.fy_ *= jk_;
				if (value == 0) {
					this.bk_.fu_ = af_.aq_.jl_(this.bk_.fu_);
				} else if (value < 0) {
					this.bk_.fu_ = Math.atan2(this.bk_.fy_, this.bk_.fw_) * 180 / Math.PI;
				}
			} else {
				var jm_ = this.bk_.fu_ / 180 * Math.PI;
				this.bk_.fw_ = value / 100 * Math.cos(jm_);
				this.bk_.fy_ = value / 100 * Math.sin(jm_);
			}
			this.bk_.fs_ = Math.sqrt(this.bk_.fw_ * this.bk_.fw_ + this.bk_.fy_ * this.bk_.fy_) * 100;
		},
		jn_ : function(value) {
			this.eq_ = this.ff_.v_;
			var jj_ = this.bk_.ft_;
			if (jj_ != 0) {
				var jk_ = value / jj_;
				this.bk_.fx_ *= jk_;
				this.bk_.fz_ *= jk_;
				if (value == 0) {
					this.bk_.fv_ = af_.aq_.jl_(this.bk_.fv_);
				} else if (value < 0) {
					this.bk_.fv_ = Math.atan2(this.bk_.fx_, this.bk_.fz_) * 180 / Math.PI;
				}
			} else {
				var jm_ = this.bk_.fv_ / 180 * Math.PI;
				if (c_ == a_) {
					this.bk_.fx_ = value / 100 * Math.sin(jm_);
					this.bk_.fz_ = value / 100 * Math.cos(jm_);
				} else {
					this.bk_.fx_ = value / 100 * Math.cos(jm_);
					this.bk_.fz_ = value / 100 * Math.sin(jm_);
				}
			}
			this.bk_.ft_ = Math.sqrt(this.bk_.fx_ * this.bk_.fx_ + this.bk_.fz_ * this.bk_.fz_) * 100;
		},
		jo_ : function(value) {
			var jm_ = (value - this.bk_.fu_) / 180 * Math.PI;
			var c = Math.cos(jm_);
			var s = Math.sin(jm_);
			var jp_ = {
				io_ : c,
				ir_ : -s,
				im_ : 0,
				iq_ : s,
				ip_ : c,
				in_ : 0
			};
			var jq_ = af_.jr_(jp_, this.bk_.fw_, this.bk_.fy_);
			var js_ = af_.jr_(jp_, this.bk_.fz_, this.bk_.fx_);
			this.bk_.fw_ = jq_.x;
			this.bk_.fy_ = jq_.y;
			this.bk_.fz_ = js_.x;
			this.bk_.fx_ = js_.y;
			this.is_();
		},
		jt_ : function(name, value) {
			this.eq_ = this.ff_.v_;
			this.bk_[name] = value;
		},
		dh_ : function() {
			return this.bk_.fj_ - 0 && this.bk_.fs_ > 0 && this.bk_.ft_ > 0;
		}
	};
	if (c_ == b_) {
		af_.aq_.ju_ = function(be_) {
			for (var i = 0; i < be_.bn_.length; i++) {
				af_.aq_.ju_(be_.bn_[i]);
			}
		};
	} else if (c_ == a_) {
	}
	af_.aq_.ar_ = function(as_, dg_, fd_, dv_, ff_) {
		if (!ff_.jv_) {
			ff_.jv_ = 0;
		}
		var be_ = new af_.aq_(as_, dg_, fd_, undefined, ff_);
		ff_.q_.push(be_);
		ff_.cz_(be_, 1, dv_);
		if (fd_) {
			be_.bc_ = fd_.bc_;
		}
		be_.dc_ = ff_.jv_++;
		be_.eq_ = ff_.v_;
		return be_;
	};
	af_.aq_.ew_ = function(et_, dg_, fd_, dv_, ff_) {
		var be_ = new af_.aq_(et_.jw_, dg_, fd_, et_.fe_, ff_);
		ff_.cz_(be_, 1, dv_);
		be_.dc_ = af_.aq_.ar_.jx_++;
		return be_;
	};
	af_.aq_.jl_ = function(r) {
		while (r > 180) {
			r -= 360;
		}
		while (r <= -180) {
			r += 360;
		}
		if (r <= -150) {
			return (180);
		} else if (r <= -120) {
			return (-135);
		} else if (r <= -60) {
			return (-90);
		} else if (r <= -30) {
			return (-45);
		} else if (r <= 30) {
			return (0);
		} else if (r <= 60) {
			return (45);
		} else if (r <= 120) {
			return (90);
		} else if (r <= 150) {
			return (135);
		} else {
			return (180);
		}
	};
	(function() {
		var jy_, jz_;
		af_.ai_ = function(ff_) {
			this.ff_ = ff_;
			this.ds_ = null;
			this.ka_ = null;
			this.kb_ = [];
			this.w_ = -1;
			this.kc_ = ff_.config.disableRenderCoreCache;
			supportChromeOnAndroid = ff_.config.supportChromeOnAndroid;
		};
		af_.ai_.prototype = {
			aj_ : function(g_, kd_, ke_) {
				this.ds_ = new af_.ai_.kf_(this.ff_);
				this.kg_ = [];
				this.kh_ = [af_.ki_()];
				var t = this.ds_.aj_(g_, kd_, ke_);
				if (t) {
					this.kj_(t);
					var r = af_.jh_(t, 0, 0, kd_, ke_);
					jy_ = r.bh_;
					jz_ = r.bj_;
				} else {
					jy_ = kd_;
					jz_ = ke_;
					this.kj_(af_.ki_());
				}
				this.kk_ = 0;
			},
			destroy : function() {
				if (this.ds_) {
					this.ds_.destroy();
				}
			},
			hj_ : function(kl_) {
				if (!this.backgroundColorHasSet) {
					this.backgroundColorHasSet = true;
					this.ds_.hj_(kl_);
				}
			},
			cl_ : function(et_) {
				return this.ds_.cl_ && this.ds_.cl_(et_);
			},
			cn_ : function() {
				return this.ds_.cn_ && this.ds_.cn_();
			},
			dr_ : function(be_, km_) {
				if (!be_) {
					km_ = [];
					be_ = this.ff_.z_;
				}
				if (be_.dh_()) {
					if (this.kc_ || be_.ig_(this.ff_.w_)) {
						var kn_ = [];
						this.ko_(be_, kn_);
						Array.prototype.push.apply(km_, kn_);
						be_.kp_ = kn_;
					} else if (be_.kp_.length) {
						if (!be_.kp_[0].cached) {
							for (var i = 0; i < be_.kp_.length; i++) {
								be_.kp_[i].cached = true;
							}
						}
						Array.prototype.push.apply(km_, be_.kp_);
					}
				}
				if (be_ == this.ff_.z_) {
					this.ds_.dr_(km_);
					this.kq_ = km_;
					this.w_ = this.ff_.v_;
				}
			},
			ko_ : function(be_, km_) {
				var kr_ = [];
				var bf_;
				var ks_ = !be_.ih_(this.w_);
				var ej_ = [];
				for (var ee_ in be_.ef_) {
					ej_.push(ee_);
				}
				ej_.sort(function(a, b) {
					return a - b;
				});
				var kt_ = (function(km_) {
					return function() {
						var ku_ = km_.length - 1;
						if (ku_ < 0)
							return;
						if (km_[ku_].cached) {
							return;
						}
						if (km_[ku_].ka_ == "start") {
							km_.length--;
						} else {
							if (km_[ku_].ka_) {
								km_[ku_].ka_ += "d";
							} else {
								km_[ku_].ka_ = "end";
							}
						}
					};
				})(km_);
				for (var i = 0, n = ej_.length; i < n; i++) {
					var fd_ = be_.ef_[ej_[i]];
					var transform = null;
					var ht_ = null;
					if (fd_.eo_.be_ != null) {
						transform = fd_.eo_.be_.jc_();
						ht_ = fd_.eo_.be_.jd_();
					} else {
						if (fd_.transform != null) {
							transform = fd_.transform;
						}
						if (fd_.ht_ != null) {
							ht_ = fd_.ht_;
						}
					}
					if (fd_.hu_ > 0) {
						if (kr_.length) {
						}
						this.ka_ = "start";
						kr_.push(fd_.hu_);
					}
					if (kr_.length > 0 && kr_[kr_.length - 1] < ej_[i]) {
						kr_.pop();
						kt_();
						this.ka_ = null;
					}
					if (transform) {
						this.kj_(transform);
					}
					if (ht_) {
						this.kv_(ht_);
					}
					var kw_ = (be_.gk_ && ej_[i] >= 65536);
					var rect = this.kx_(km_, fd_, be_, kw_, ks_);
					if (rect) {
						if (!be_.gk_ || kw_) {
							if (!bf_) {
								bf_ = af_.em_(rect);
							} else {
								bf_.bg_ = Math.min(bf_.bg_, rect.bg_);
								bf_.bi_ = Math.min(bf_.bi_, rect.bi_);
								bf_.bh_ = Math.max(bf_.bh_, rect.bh_);
								bf_.bj_ = Math.max(bf_.bj_, rect.bj_);
							}
						}
					}
					if (transform) {
						this.ky_();
					}
					if (ht_) {
						this.kz_();
					}
					if (!ks_ && this.kk_ != 0) {
						this.kk_ = 0;
					}
				}
				if (kr_.length) {
					for (var i = 0; i < kr_.length; i++) {
						kt_();
					}
					this.ka_ = null;
				}
				if (bf_) {
					be_.bf_ = bf_;
				}
			},
			kx_ : function(km_, fd_, be_, kw_, ks_) {
				if (!fd_) {
					return;
				}
				if (fd_.eo_.be_) {
					if (kw_) {
						return;
					}
					this.dr_(fd_.eo_.be_, km_);
					return fd_.eo_.be_.bf_;
				} else {
					var et_ = this.ff_.m_[fd_.bc_];
					var la_ = null;
					if (et_.by_ === "ch_") {
						la_ = et_.fb_;
						if (et_.ey_) {
							var lb_;
							if (et_.ey_.charAt(0) == "/" || et_.ey_.charAt(0) == ".") {
								lb_ = et_.ey_;
							} else {
								lb_ = be_.bm_ + ":" + et_.ey_;
							}
							var az_ = af_.ag_.ex_(be_, lb_);
							if (az_[0]) {
								var value = az_[0].fa_[az_[1]];
								if ( typeof (value) === "undefined") {
								} else {
									la_ = value + "";
								}
							} else {
							}
						}
					}
					return this.lc_(km_, fd_.eo_.ep_, et_, la_, kw_, ks_, be_.bk_.bl_);
				}
			},
			lc_ : function(km_, ep_, et_, la_, kw_, ks_, name) {
				var transform = this.jc_();
				var ht_ = this.jd_();
				var ld_;
				if (ks_) {
					if (!this.kk_) {
						this.kk_ = ep_;
					}
					ld_ = this.kk_;
				} else {
					ld_ = 0;
				}
				var le_ = {
					bc_ : et_.bc_,
					ep_ : ep_,
					transform : transform,
					ka_ : this.ka_,
					ht_ : ht_,
					la_ : la_,
					bf_ : af_.jh_(transform, et_.jf_[0], et_.jf_[1], et_.jf_[2], et_.jf_[3]),
					ld_ : ld_,
					name : name
				};
				if (c_ == a_) {
					le_.renderedFrame = this.ff_.v_;
				}
				if (this.ka_ || (!kw_ && le_.bf_.bh_ > 0 && le_.bf_.bg_ < jy_ * 20 && le_.bf_.bj_ > 0 && le_.bf_.bi_ < jz_ * 20)) {
					km_.push(le_);
				}
				this.ka_ = null;
				return le_.bf_;
			},
			kj_ : function(t) {
				this.kg_.push(t);
				this.kh_.push(af_.lf_(this.kh_[this.kh_.length - 1], t));
			},
			ky_ : function() {
				this.kg_.pop();
				this.kh_.pop();
			},
			jc_ : function() {
				return this.kh_[this.kh_.length - 1];
			},
			kv_ : function(t) {
				if (!this.lg_) {
					this.lg_ = [];
				}
				if (t.iu_ == 1 && t.iy_ == 0 && t.iz_ == 0 && t.ja_ == 0 && t.jb_ == 0 && t.iv_ == 1 && t.iw_ == 1 && t.ix_ == 1) {
					t.il_ = true;
				} else {
					t.il_ = false;
				}
				this.lg_.push(t);
			},
			kz_ : function() {
				this.lg_.pop();
			},
			jd_ : function() {
				var lh_ = [];
				if (this.lg_) {
					for (var i = 0; i < this.lg_.length; i++) {
						if (!this.lg_[i].il_) {
							lh_.push(this.lg_[i]);
						}
					}
				}
				return lh_;
			},
			do_ : function(be_, x, y) {
				if (be_.bf_ && be_.bf_.bg_ <= x * 20 && x * 20 < be_.bf_.bh_) {
					if (be_.bf_.bi_ <= y * 20 && y * 20 < be_.bf_.bj_) {
						return true;
					}
				}
				return false;
			},
			bb_ : function(x, y) {
				var az_ = [];
				for (var i = 0, eb_ = this.kq_.length; i < eb_; i++) {
					var rect = this.kq_[i].bf_;
					if (rect.bg_ / 20 <= x && x <= rect.bh_ / 20 && rect.bi_ / 20 <= y && y <= rect.bj_ / 20) {
						az_.push(this.kq_[i]);
					}
				}
				return az_;
			},
			getAllRenderList : function() {
				return this.kq_;
			}
		};
	})();
	(function() {
		var li_;
		var lj_ = false;
		var lk_ = 0;
		var ll_ = 0;
		var lm_ = 0;
		var ln_ = 0;
		var cacheAcceptableRatio;
		var lowQualityCache;
		af_.ai_.kf_ = function(ff_) {
			this.canvas = null;
			this.lo_ = null;
			this.lp_ = "rgb(255,255,255)";
			this.ff_ = ff_;
			this.mMatrix = {
				io_ : 1,
				iq_ : 0,
				ir_ : 0,
				ip_ : 1,
				im_ : 0,
				in_ : 0
			};
			this.lq_ = {};
			this.lr_ = this.ff_.config.disableRenderInvalidRectCache;
			cacheAcceptableRatio = this.ff_.config.cacheMaxSizeRatio || 1.2;
			lowQualityCache = this.ff_.config.enableLowQualityCache || false;
		};
		af_.ai_.kf_.prototype = {
			aj_ : function(g_, kd_, ke_) {
				var scale = 1.5;
				if (this.ff_.config.scale) {
					scale = this.ff_.config.scale;
				} else {
					this.ff_.config.scale = scale;
				}
				lm_ = this.ff_.config.cacheMaxSize || 7200000 / 2;
				ln_ = this.ff_.config.cacheMinStress || 0;
				g_.style.width = kd_ * scale + "px";
				g_.style.height = ke_ * scale + "px";
				var width = g_.offsetWidth;
				var height = g_.offsetHeight;
				this.canvas = document.createElement("canvas");
				this.canvas.width = width;
				this.canvas.height = height;
				g_.appendChild(this.canvas);
				this.lo_ = this.canvas.getContext("2d");
				if (this.ff_.config.fullScreen) {
					g_.style.position = "relative";
					g_.style.margin = "0 auto";
					var meta = document.createElement("meta");
					meta.setAttribute("name", "viewport");
					if ((userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0) || userAgent.indexOf("iPod") > 0) {
						meta.setAttribute("content", "width=" + (kd_ * scale) + ", user-scalable=no");
					} else {
						meta.setAttribute("content", "width=240, user-scalable=no");
					}
					document.getElementsByTagName("head")[0].appendChild(meta);
					document.body.style.margin = "0";
					document.body.style.padding = "0";
					var ls_ = function() {
						if ((userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0) || userAgent.indexOf("iPod") > 0) {
							var diff = 0;
							if (width != window.innerWidth && (window.innerWidth - width) < width) {
								diff = window.innerWidth - width;
							}
							var tmpSize = {};
							tmpSize.innerWidth = width;
							tmpSize.innerHeight = window.innerHeight - diff;
							var lt_ = tmpSize.innerHeight / height;
							var gz_ = Math.min(lt_, tmpSize.innerWidth / width);
							if (gz_ == lt_) {
								g_.style.zoom = Math.ceil(lt_ * 10000) / 100 + "%";
								g_.style.top = "0px";
								g_.style.left = "0px";
							} else {
								g_.style.zoom = Math.ceil(gz_ * 10000) / 100 + "%";
								g_.style.top = Math.ceil((tmpSize.innerHeight - height * gz_) / 2 / gz_) + "px";
								g_.style.left = "0px";
							}
						} else {
							var lt_ = window.innerHeight / height;
							var gz_ = Math.min(lt_, window.innerWidth / width);
							if (gz_ == lt_) {
								g_.style.zoom = Math.ceil(lt_ * 10000) / 100 + "%";
								g_.style.top = "0px";
								g_.style.left = "0px";
							} else {
								g_.style.zoom = Math.ceil(gz_ * 10000) / 100 + "%";
								g_.style.top = Math.ceil((window.innerHeight - height * gz_) / 2 / gz_) + "px";
								g_.style.left = "0px";
							}
						}
					};
					window.onorientationchange = ls_;
					window.onresize = ls_;
					ls_();
				} else if (this.ff_.config.displayScale) {
					g_.style.zoom = Math.ceil(this.ff_.config.displayScale * 10000) / 100 + "%";
				}
				this.lo_.save();
				li_ = af_.lu_(width / kd_, 0, 0, height / ke_, 0, 0);
				lk_ = width;
				ll_ = height;
				return li_;
			},
			hj_ : function(kl_) {
				this.lp_ = kl_;
				if (this.ff_.config.transparent) {
					this.lo_.clearRect(0, 0, this.canvas.width, this.canvas.height);
				} else {
					this.lo_.fillStyle = kl_;
					this.lo_.fillRect(0, 0, this.canvas.width, this.canvas.height);
				}
				this.lq_ = {};
			},
			cl_ : function(bx_) {
				if (this.lv_) {
					return this.lv_(bx_);
				}
			},
			dr_ : function(kq_) {
				var lw_ = this.lw_;
				var j_ = this;
				var lx_ = {};
				this.lo_.restore();
				this.lo_.save();
				this.lo_.lineCap = "round";
				this.lo_.lineJoin = "round";
				if (this.lr_) {
					if (this.ff_.config.transparent) {
						this.lo_.clearRect(0, 0, this.canvas.width, this.canvas.height);
					} else {
						this.lo_.fillStyle = this.lp_;
						this.lo_.fillRect(0, 0, this.canvas.width, this.canvas.height);
					}
				}
				var ly_ = [];
				var lz_ = function(ma_) {
					var mb_ = ma_.ka_;
					if (mb_ && mb_.indexOf("end") == 0) {
						for (var i = mb_.length; i >= 3; i--) {
							if (ly_.length) {
								(ly_.pop())();
							}
						}
					}
				};
				var mc_ = md_(this.lq_, kq_, this.canvas.width, this.canvas.height);
				me_.mc_ = Math.max(me_.mc_ ? me_.mc_ : 0, mc_.length);
				this.lo_.fillStyle = this.lp_;
				for (var i = 0; i < mc_.length; i++) {
					var r = mc_[i];
					if (r) {
						if (this.ff_.config.transparent) {
							this.lo_.clearRect(r.bg_, r.bi_, r.bh_ - r.bg_ + 1, r.bj_ - r.bi_ + 1);
						} else {
							this.lo_.fillRect(r.bg_, r.bi_, r.bh_ - r.bg_ + 1, r.bj_ - r.bi_ + 1);
						}
					}
				}
				var lo_ = this.lo_;
				var j_ = this;
				var mntMatrix = this.mMatrix;
				var mf_ = function(ma_) {
					if (ma_.ka_ == "start") {
						if (ly_.length) {
							ly_.pop()();
						}
						lo_.save();
						mntMatrix = {
							io_ : 1,
							iq_ : 0,
							ir_ : 0,
							ip_ : 1,
							im_ : 0,
							in_ : 0
						};
						ly_.push((function(mg_) {
							return function() {
								mg_.restore();
							};
						})(lo_));
					}
					var t = ma_.transform;
					var t_pixel = {
						io_ : t.io_,
						iq_ : t.iq_,
						ir_ : t.ir_,
						ip_ : t.ip_,
						im_ : t.im_ / 20,
						in_ : t.in_ / 20
					};
					var ht_ = ma_.ht_;
					var et_ = j_.ff_.m_[ma_.bc_];
					var fieldScale;
					if (c_ == a_ && et_.by_ == "ch_" && !et_.mh_) {
						fieldScale = [t.io_, t.ip_];
						t.io_ = t.ip_ = Math.min(t.io_, t.ip_);
						fieldScale = [fieldScale[0] / t.io_, fieldScale[1] / t.ip_];
					} else if (c_ == b_ && et_.by_ == "ch_") {
						t.io_ = t.ip_ = Math.min(t.io_, t.ip_);
					}
					var rt = af_.mi_(t);
					var rt_pixel = {
						io_ : rt.io_,
						iq_ : rt.iq_,
						ir_ : rt.ir_,
						ip_ : rt.ip_,
						im_ : rt.im_ / 20,
						in_ : rt.in_ / 20
					};
					af_.setTransform(lo_, t);
					if (c_ == a_) {
						j_.lw_(lo_, et_, (ma_.ka_ == "start"), ma_.la_, ht_, ma_.bf_, t, fieldScale);
					} else {
						j_.lw_(lo_, et_, (ma_.ka_ == "start"), ma_.la_, ht_, ma_.bf_, t);
					}
					mntMatrix = af_.lf_(mntMatrix, t_pixel);
					mntMatrix = af_.lf_(mntMatrix, rt_pixel);
					if (Math.abs(mntMatrix.im_) < 0.00000000000001 && mntMatrix.in_ == 0 && mntMatrix.io_ == 1 && mntMatrix.iq_ == 0 && mntMatrix.ir_ == 0 && mntMatrix.ip_ == 1) {
						lo_.setTransform(1, 0, 0, 1, 0, 0);
					} else {
						af_.setTransform(lo_, rt);
					}
					lz_(ma_);
				};
				var mj_ = function(lo_, mk_, ma_) {
					var rect = af_.jh_(mk_.ml_, 0, 0, mk_.canvas.width - 1, mk_.canvas.height - 1);
					mk_.ml_.im_ = ma_.bf_.bg_ - rect.bg_ * 20;
					mk_.ml_.in_ = ma_.bf_.bi_ - rect.bi_ * 20;
					lo_.save();
					af_.setTransform(lo_, mk_.ml_);
					lo_.drawImage(mk_.canvas, 0, 0);
					lo_.restore();
					mk_.ml_.im_ = 0;
					mk_.ml_.in_ = 0;
				};
				var drawUniCache = function(lo_, mk_, ma_) {
					lo_.save();
					af_.setTransform(lo_, ma_.transform);
					af_.setTransform(lo_, mk_.mm_);
					lo_.drawImage(mk_.canvas, mk_.dx / 20, mk_.dy / 20);
					lo_.restore();
				};
				for (var i = 0; i < kq_.length; i++) {
					var ma_ = kq_[i];
					lx_[ma_.ep_] = ma_;
					if (!this.lr_ && ma_.ka_ != "start") {
						if (ma_.mn_) {
							var mk_ = me_.mo_(ma_);
							if (!mk_) {
								mk_ = me_.mp_(this.ff_, ma_, this);
							}
							var t = ma_.transform;
							var rect = mq_(ma_.bf_);
							for (var j = 0; j < mc_.length; j++) {
								var r = mc_[j];
								if (r) {
									var bg_ = Math.max(rect.bg_, r.bg_) - rect.bg_;
									var bh_ = Math.min(rect.bh_, r.bh_) - rect.bg_;
									var bi_ = Math.max(rect.bi_, r.bi_) - rect.bi_;
									var bj_ = Math.min(rect.bj_, r.bj_) - rect.bi_;
									if (bg_ > bh_ || bi_ > bj_) {
										continue;
									}
									var mr_ = bh_ - bg_ + 1;
									var ms_ = bj_ - bi_ + 1;
									if (mk_.ml_ || mk_.mm_) {
										var dx = bg_ + rect.bg_;
										var dy = bi_ + rect.bi_;
										lo_.save();
										lo_.beginPath();
										lo_.rect(dx, dy, mr_, ms_);
										lo_.clip();
										if (c_ == b_ || mk_.ml_) {
											mj_(lo_, mk_, ma_);
										} else {
											drawUniCache(lo_, mk_, ma_);
										}
										lo_.restore();
									} else {
										var dx = bg_ + ((mk_.mt_) ? rect.bg_ : Math.round((mk_.dx + t.im_) / 20));
										var dy = bi_ + ((mk_.mu_) ? rect.bi_ : Math.round((mk_.dy + t.in_) / 20));
										var mv_ = (mk_.mt_) ? bg_ + rect.bg_ : bg_;
										var mw_ = (mk_.mu_) ? bi_ + rect.bi_ : bi_;
										mr_ = Math.min(mr_, mk_.canvas.width - mv_);
										ms_ = Math.min(ms_, mk_.canvas.height - mw_);
										if (mr_ > 0 && ms_ > 0) {
											var dw = mr_;
											var dh = ms_;
											if (dx + dw > r.bh_ + 1) {
												dx = bg_ + rect.bg_;
											}
											if (dy + dh > r.bj_ + 1) {
												dy = bi_ + rect.bi_;
											}
											try {
												lo_.drawImage(mk_.canvas, mv_, mw_, mr_, ms_, dx, dy, dw, dh);
											} catch(e) {
												throw e;
											}
										}
									}
								}
							}
							lz_(ma_);
							continue;
						}
					}
					if (ma_.ka_ != "start" && this.mx_(ma_.bc_) > ln_) {
						var mk_ = me_.mo_(ma_);
						if (!mk_) {
							mk_ = me_.mp_(this.ff_, ma_, this);
						}
						if (mk_.ml_) {
							mj_(lo_, mk_, ma_);
						} else if (mk_.mm_) {
							drawUniCache(lo_, mk_, ma_);
						} else {
							var t = ma_.transform;
							var dx = ((mk_.mt_) ? 0 : Math.round((mk_.dx + t.im_) / 20));
							var dy = ((mk_.mu_) ? 0 : Math.round((mk_.dy + t.in_) / 20));
							lo_.drawImage(mk_.canvas, dx, dy);
						}
						lz_(ma_);
					} else {
						if (false) {
							var x = ma_.bf_.bg_;
							var y = ma_.bf_.bi_;
							var dx = Math.round(x / 20) - x / 20;
							var dy = Math.round(y / 20) - y / 20;
							lo_.transform(1, 0, 0, 1, dx, dy);
						}
						mf_(ma_);
						if (false) {
							lo_.transform(1, 0, 0, 1, -dx, -dy);
						}
					}
				}
				this.lq_ = lx_;
			}
		};
		var my_ = function(mz_, na_, nb_, nc_) {
			if (nd_(mz_.transform, na_.transform, nb_)) {
				if (nc_ || ne_(mz_.ht_, na_.ht_)) {
					if (mz_.la_ === na_.la_) {
						return true;
					}
				}
			}
			return false;
		};
		var nd_ = function(jq_, js_, nb_) {
			if (nb_) {
				if (nf_(jq_["ir_"]) == nf_(js_["ir_"]) && nf_(jq_["io_"]) == nf_(js_["io_"]) && nf_(jq_["ip_"]) == nf_(js_["ip_"]) && nf_(jq_["iq_"]) == nf_(js_["iq_"])) {
					return true;
				}
			} else {
				if (nf_(jq_["im_"]) == nf_(js_["im_"]) && nf_(jq_["in_"]) == nf_(js_["in_"]) && nf_(jq_["ir_"]) == nf_(js_["ir_"]) && nf_(jq_["io_"]) == nf_(js_["io_"]) && nf_(jq_["ip_"]) == nf_(js_["ip_"]) && nf_(jq_["iq_"]) == nf_(js_["iq_"])) {
					return true;
				}
			}
			return false;
		};
		var ne_ = function(ng_, nh_) {
			if (ng_.length != nh_.length) {
				return false;
			}
			var ni_ = ["iv_", "iw_", "ix_", "iu_", "iy_", "iz_", "ja_", "jb_"];
			for (var i = 0; i < ng_.length; i++) {
				for (var j = 0; j < ni_.length; j++) {
					var dj_ = ni_[j];
					if (ng_[i][dj_] != nh_[i][dj_]) {
						return false;
					}
				}
			}
			return true;
		};
		var me_ = {
			mk_ : {},
			en_ : 0,
			nj_ : 0,
			nk_ : true,
			mp_ : function(ff_, ma_, renderSystem, br_, ml_) {
				var et_ = ff_.m_[ma_.bc_];
				if (!ml_) {
					var nl_ = nm_(ma_.transform);
					if (nl_) {
						var ri = af_.em_(ma_);
						ri.transform = nl_.mm_;
						ri.bf_ = af_.jh_(ri.transform, et_.jf_[0], et_.jf_[1], et_.jf_[2], et_.jf_[3]);
						var data = me_.mp_(ff_, ri, renderSystem, br_, nl_.nn_);
						if (data) {
							return data;
						}
					}
				}
				var rect = ma_.bf_;
				var t = ma_.transform;
				var c = ma_.ht_;
				var width = Math.ceil((rect.bh_ - rect.bg_) / 20) + 1;
				var height = Math.ceil((rect.bj_ - rect.bi_) / 20) + 1;
				var mt_ = false;
				var mu_ = false;
				if (width > lk_ * cacheAcceptableRatio) {
					if (ml_) {
						return null;
					}
					mt_ = true;
					width = Math.min(lk_, rect.bh_ / 20 + 1) || 1;
				}
				if (height > ll_ * cacheAcceptableRatio) {
					if (ml_) {
						return null;
					}
					mu_ = true;
					height = Math.min(ll_, rect.bj_ / 20 + 1) || 1;
				}
				var nj_ = Math.ceil(width * height);
				var no_ = nj_;
				if (c && c.length) {
					no_ *= 2;
				}
				if (me_.nj_ < lm_ * 0.3 && lm_ * 0.3 < me_.nj_ + no_) {
					me_.np_();
				}
				if (me_.nj_ + no_ > lm_) {
					me_.nq_();
				}
				if (!br_) {
					var canvas = ff_.getAvailableCanvas();
					if (canvas == null) {
						canvas = document.createElement("canvas");
						ff_.cacheCanvas(canvas);
					}
					canvas.isUsed = true;
					canvas.width = width;
					canvas.height = height;
					var lo_ = canvas.getContext("2d");
					lo_.clearRect(0, 0, width, height);
					lo_.lineCap = "round";
					lo_.lineJoin = "round";
					var left = (mt_) ? 0 : -rect.bg_ / 20;
					var top = (mu_) ? 0 : -rect.bi_ / 20;
					lo_.transform(1, 0, 0, 1, left, top);
					var fieldScale;
					if (et_.by_ == "ch_" && !et_.mh_) {
						fieldScale = [t.io_, t.ip_];
						t.io_ = t.ip_ = Math.min(t.io_, t.ip_);
						fieldScale = [fieldScale[0] / t.io_, fieldScale[1] / t.ip_];
					}
					af_.setTransform(lo_, t);
					if (c_ == a_) {
						var nr_ = renderSystem.lw_(lo_, et_, false, ma_.la_, [], rect, t, fieldScale);
					} else {
						var nr_ = renderSystem.lw_(lo_, et_, false, ma_.la_, [], rect, t);
					}
					if (c && c.length) {
						var ns_ = canvas;
						canvas = af_.nt_(c, ns_);
					}
				} else {
					var canvas = ff_.ac_[br_];
					var nr_ = ln_ + 10;
				}
				var data = {
					canvas : canvas,
					dx : rect.bg_ - t.im_,
					dy : rect.bi_ - t.in_,
					mt_ : mt_,
					mu_ : mu_,
					ml_ : ml_
				};
				if (!this.lr_ && me_.nk_) {
					var id_ = me_.mk_[ma_.bc_];
					if (!id_) {
						id_ = [];
						me_.mk_[ma_.bc_] = id_;
					}
					id_.push({
						data : data,
						ma_ : ma_,
						nj_ : nj_,
						nu_ : false,
						nv_ : mt_ || mu_
					});
					me_.en_++;
					if (c && c.length) {
						var ri = af_.em_(ma_);
						ri.ht_ = [];
						var nw_ = {
							canvas : ns_,
							dx : rect.bg_ - t.im_,
							dy : rect.bi_ - t.in_,
							mt_ : mt_,
							mu_ : mu_,
							ml_ : ml_
						};
						id_.push({
							data : nw_,
							ma_ : ri,
							nj_ : nj_,
							nu_ : false,
							nv_ : mt_ || mu_
						});
						me_.en_++;
					}
					me_.nj_ += no_;
				}
				return data;
			},
			nx_ : function(mk_, ht_) {
				var ny_ = af_.nt_(ht_, mk_.data.canvas);
				var data = {
					canvas : ny_,
					dx : mk_.data.dx,
					dy : mk_.data.dy,
					mt_ : mk_.data.mt_,
					mu_ : mk_.data.mu_,
					ml_ : null
				};
				if (!this.lr_ && me_.nk_) {
					var ri = af_.em_(mk_.ma_);
					ri.ht_ = ht_;
					var nj_ = mk_.nj_;
					var id_ = me_.mk_[ri.bc_];
					if (!id_) {
						id_ = [];
						me_.mk_[ri.bc_] = id_;
					}
					id_.push({
						data : data,
						ma_ : ri,
						nj_ : nj_,
						nu_ : false,
						nv_ : mk_.nv_
					});
					me_.en_++;
					me_.nj_ += nj_;
				}
				return data;
			},
			np_ : function() {
				if (c_ == a_) {
					for (var db_ in me_.mk_) {
						var id_ = me_.mk_[db_];
						for (var i = 0, i_len = id_.length; i < i_len; i++) {
							if (id_[i]) {
								id_[i].data.nu_ = false;
							}
						}
					}
				} else {
					for (var db_ in me_.mk_) {
						var id_ = me_.mk_[db_];
						for (var i in id_) {
							id_[i].data.nu_ = false;
						}
					}
				}
			},
			nq_ : function() {
				var nz_ = me_.nj_;
				for (var db_ in me_.mk_) {
					var id_ = me_.mk_[db_];
					if (c_ == a_) {
						for (var i = 0, i_len = id_.length; i < i_len; i++) {
							if (!id_[i]) {
								continue;
							}
							if (!id_[i].data.nu_) {
								me_.nj_ -= id_[i].nj_;
								if (id_[i].data.canvas)
									id_[i].data.canvas.isUsed = false;
								delete id_[i].data;
								delete id_[i];
							} else {
								id_[i].data.nu_ = false;
							}
						}
					} else {
						for (var i in id_) {
							if (!id_[i]) {
								continue;
							}
							if (!id_[i].data.nu_) {
								me_.nj_ -= id_[i].nj_;
								if (id_[i].data.canvas)
									id_[i].data.canvas.isUsed = false;
								delete id_[i].data;
								delete id_[i];
							} else {
								id_[i].data.nu_ = false;
							}
						}
					}
				}
			},
			mo_ : function(ma_) {
				var id_ = me_.mk_[ma_.bc_];
				if (!id_) {
					return null;
				}
				var oa_ = null;
				var ob_ = [];
				var oc_ = [];
				if (c_ == a_) {
					for (var i = 0, i_len = id_.length; i < i_len; i++) {
						var mk_ = id_[i];
						if (mk_) {
							if (mk_.ma_.la_ === ma_.la_) {
								var ct = nd_(mk_.ma_.transform, ma_.transform, !mk_.nv_);
								var cc = ne_(mk_.ma_.ht_, ma_.ht_);
								if (ct && cc) {
									mk_.data.ml_ = null;
									mk_.data.mm_ = null;
									return mk_.data;
								}
								var t = mk_.ma_.transform;
								var ccu = mk_.ma_.ht_.length == 0;
								var ctu = (t.io_ == t.ip_) && (t.iq_ == t.ir_) && (t.iq_ == 0);
								if (ct && ccu) {
									oa_ = mk_;
								} else if (cc && ctu && !mk_.nv_) {
									ob_.push(mk_);
								} else if (ccu && ctu && !mk_.nv_) {
									oc_.push(mk_);
								}
							}
						}
					}
				} else {
					for (var i in id_) {
						var mk_ = id_[i];
						if (mk_) {
							if (mk_.ma_.la_ === ma_.la_) {
								var ct = nd_(mk_.ma_.transform, ma_.transform, !mk_.nv_);
								var cc = ne_(mk_.ma_.ht_, ma_.ht_);
								if (ct && cc) {
									mk_.data.ml_ = null;
									return mk_.data;
								}
								var t = mk_.ma_.transform;
								var ccu = mk_.ma_.ht_.length == 0;
								var ctu = (t.io_ == t.ip_) && (t.iq_ == t.ir_) && (t.iq_ == 0);
								if (ct && ccu) {
									oa_ = mk_;
								} else if (cc && ctu) {
									ob_.push(mk_);
								} else if (ccu && ctu) {
									oc_.push(mk_);
								}
							}
						}
					}
				}
				if (oa_) {
					return me_.nx_(oa_, ma_.ht_);
				}
				if (ob_.length || oc_.length) {
					var nl_ = nm_(ma_.transform);
					if (nl_) {
						var od_ = [ob_, oc_];
						for (var i = 0; i < 2; i++) {
							for (var j = 0; j < od_[i].length; j++) {
								var mk_ = od_[i][j];
								if (c_ == a_ && nf_(nl_.mm_.io_) == nf_(mk_.ma_.transform.io_)) {
									if (i == 0) {
										mk_.data.ml_ = nl_.nn_;
										mk_.data.mm_ = null;
										return mk_.data;
									} else {
										var data = me_.nx_(mk_, ma_.ht_);
										data.ml_ = nl_.nn_;
										return data;
									}
								} else if (c_ == b_ && nl_.mm_.io_ == mk_.ma_.transform.io_) {
									if (i == 0) {
										mk_.data.ml_ = nl_.nn_;
										return mk_.data;
									} else {
										var data = me_.nx_(mk_, ma_.ht_);
										data.ml_ = nl_.nn_;
										return data;
									}
								}
							}
						}
					}
				}
				if (c_ == a_ && lowQualityCache) {
					var utc = ob_[0];
					if (utc) {
						var uniScale = 1 / utc.ma_.transform.io_;
						utc.data.mm_ = af_.lu_(uniScale, 0, 0, uniScale, 0, 0);
						utc.data.ml_ = null;
						return utc.data;
					}
				}
				return null;
			}
		};
		var nm_ = function(t) {
			var oe_ = nf_(t.io_);
			var of_ = nf_(t.ip_);
			var og_ = nf_(t.iq_);
			var oh_ = nf_(t.ir_);
			if (!t || (og_ != oh_ && og_ != -oh_) || (oe_ != of_ && oe_ != -of_)) {
				return null;
			}
			if (og_ == 0) {
				return null;
			}
			var r = t.iq_;
			var s = t.io_;
			var l = Math.sqrt(s * s + r * r);
			var mm_ = af_.lu_(l, 0, 0, l, t.im_, t.in_);
			var nn_ = af_.lf_(af_.mi_(mm_), t);
			return {
				mm_ : mm_,
				nn_ : nn_
			};
		};
		var nf_ = function(x) {
			if (c_ == a_)
				return Math.round(x * 100) / 100;
			else
				return Math.round(x * 100);
		};
		var oi_ = function(mc_, r, width, height) {
			if (r.bg_ >= (width - 1) * 20 || r.bh_ < 0 || r.bi_ >= (height - 1) * 20 || r.bj_ < 0) {
				return;
			}
			r = mq_(r);
			r.bg_ -= 1;
			r.bi_ -= 1;
			if (r.bg_ < 0) {
				r.bg_ = 0;
			}
			if (r.bi_ < 0) {
				r.bi_ = 0;
			}
			if (r.bh_ >= width) {
				r.bh_ = width - 1;
			}
			if (r.bj_ >= height) {
				r.bj_ = height - 1;
			}
			for (var i = 0; i < mc_.length; i++) {
				var dr = mc_[i];
				if (dr) {
					if (r.bh_ < dr.bg_ || dr.bh_ < r.bg_) {
						continue;
					}
					if (r.bj_ < dr.bi_ || dr.bj_ < r.bi_) {
						continue;
					}
					r = {
						bg_ : Math.min(dr.bg_, r.bg_),
						bh_ : Math.max(dr.bh_, r.bh_),
						bi_ : Math.min(dr.bi_, r.bi_),
						bj_ : Math.max(dr.bj_, r.bj_)
					};
					mc_[i] = null;
					i = 0;
					continue;
				}
			}
			mc_.push(r);
		};
		var mq_ = function(rect) {
			az_ = {};
			az_.bg_ = Math.round(rect.bg_ / 20);
			az_.bi_ = Math.round(rect.bi_ / 20);
			az_.bh_ = Math.ceil((rect.bh_ - rect.bg_) / 20) + az_.bg_;
			az_.bj_ = Math.ceil((rect.bj_ - rect.bi_) / 20) + az_.bi_;
			return az_;
		};
		var md_ = function(lq_, kq_) {
			var mc_ = [];
			if (!this.lr_) {
				var oj_ = af_.em_(lq_);
				for (var i = 0; i < kq_.length; i++) {
					var le_ = kq_[i];
					var ok_ = lq_[le_.ep_];
					if (ok_) {
						if (!my_(ok_, kq_[i])) {
							oi_(mc_, ok_.bf_, lk_, ll_);
							oi_(mc_, le_.bf_, lk_, ll_);
							le_.mn_ = false;
						} else {
							le_.mn_ = true;
						}
						delete oj_[le_.ep_];
					} else {
						oi_(mc_, le_.bf_, lk_, ll_);
						le_.mn_ = false;
					}
				}
				for (var i in oj_) {
					var ok_ = oj_[i];
					oi_(mc_, ok_.bf_, lk_, ll_);
				}
			}
			var az_ = [];
			if (c_ == a_) {
				for (var i = 0, i_len = mc_.length; i < i_len; i++) {
					var r = mc_[i];
					if (r) {
						az_.push(r);
					}
				}
			} else {
				for (var i in mc_) {
					var r = mc_[i];
					if (r) {
						az_.push(r);
					}
				}
			}
			return az_;
		};
		;
	})();
	(function() {
		var ol_;
		var om_;
		var on_;
		var oo_ = {};
		var op_ = {};
		var oq_ = [];
		var or_ = 0;
		af_.ai_.kf_.prototype.lv_ = function(bx_) {
			switch (bx_.by_) {
				case "cg_":
				case "cj_":
					oq_.push(bx_);
					or_++;
					break;
			}
		};
		af_.ai_.kf_.prototype.cn_ = function() {
			if (oq_.length == 0) {
				return null;
			}
			var et_ = oq_.pop();
			om_ = [];
			ol_ = 0;
			switch (et_.by_) {
				case "cg_":
					os_(null, et_, false, [], this.ff_);
					break;
				case "cj_":
					ot_(null, et_, false, [], this.ff_);
					break;
				default:
					throw "[preloadDefineObject] unknown tag detected:" + et_.bc_;
			}
			oo_[et_.bc_] = om_;
			op_[et_.bc_] = ol_;
			return [or_ - oq_.length, or_];
		};
		af_.ai_.kf_.prototype.mx_ = function(db_) {
			return op_[db_] || 99999;
		};
		af_.ai_.kf_.prototype.lw_ = function(lo_, et_, ou_, la_, ht_, bf_, transform, fieldScale) {
			var dj_ = et_.bc_ + ((ou_) ? "C" : "");
			var ov_ = oo_[dj_];
			ol_ = op_[et_.bc_];
			if (!ov_) {
				om_ = [];
				ol_ = 0;
				switch (et_.by_) {
					case "cg_":
						os_(lo_, et_, ou_, ht_, this.ff_);
						break;
					case "cj_":
						ot_(lo_, et_, ou_, ht_, this.ff_);
						break;
					case "ch_":
						ow_(lo_, et_, la_, ou_, ht_, this.ff_, fieldScale);
						break;
					default:
				}
				ov_ = om_;
				if (la_ == null) {
					oo_[dj_] = ov_;
					op_[et_.bc_] = ol_;
				}
			}
			on_ = Math.sqrt(Math.abs(transform.io_ * transform.ip_) + Math.abs(transform.iq_ * transform.ir_));
			for (var i = 0; i < ov_.length; i++) {
				var le_ = ov_[i];
				le_[0].apply(this, [lo_, ht_].concat(le_[1]));
			}
			return ol_;
		};
		var os_ = function(lo_, et_, ou_, ht_, ff_) {
			var ox_ = ou_ ? {
				oy_ : true,
				end : true
			} : null;
			oz_(lo_, et_.pa_, et_.pb_, et_.pc_.as_, ox_, ht_, ff_);
		};
		var oz_ = function(lo_, pa_, pb_, as_, ox_, ht_, ff_) {
			var pd_ = [];
			var pe_ = [];
			var pf_ = [];
			var marginPaths = [];
			var pg_ = 0;
			var ph_ = 0;
			var pi_ = 0;
			var pj_ = [];
			var x = 0, y = 0;
			var pk_ = function() {
				if (pj_.length == 0) {
					return;
				}
				if (pg_ != 0) {
					if (pe_[pg_ - 1] == null) {
						pe_[pg_ - 1] = [];
					}
					pe_[pg_ - 1].push(pj_);
				} else if (ph_ != 0 && pi_ != 0) {
					if (pb_[ph_ - 1].by_ == "pl_") {
						if (marginPaths[ph_ - 1] == null) {
							marginPaths[ph_ - 1] = [];
						}
						marginPaths[ph_ - 1].push(pj_);
					} else if (pb_[pi_ - 1].by_ == "pl_") {
						if (marginPaths[pi_ - 1] == null) {
							marginPaths[pi_ - 1] = [];
						}
						marginPaths[pi_ - 1].push(pj_);
					}
				}
				if (ph_ != 0) {
					var pm_ = ph_ - 1;
					if (ox_) {
						pm_ = 0;
					}
					if (!pf_[pm_]) {
						pf_[pm_] = [];
					}
					pf_[pm_].push(pj_);
				}
				if (pi_ != 0) {
					var pm_ = pi_ - 1;
					if (ox_) {
						pm_ = 0;
					}
					if (!pf_[pm_]) {
						pf_[pm_] = [];
					}
					var n = [];
					var pn_ = function() {
						for (var i = pj_.length - 1; i >= 0; i--) {
							if ( typeof (pj_[i].cx) === "number") {
								n.push({
									po_ : pj_[i].pp_,
									pq_ : pj_[i].pr_,
									cx : pj_[i].cx,
									cy : pj_[i].cy,
									pp_ : pj_[i].po_,
									pr_ : pj_[i].pq_
								});
							} else {
								n.push({
									po_ : pj_[i].pp_,
									pq_ : pj_[i].pr_,
									pp_ : pj_[i].po_,
									pr_ : pj_[i].pq_
								});
							}
						}
					};
					pn_();
					pf_[pm_].push(n);
				}
				pj_ = [];
			};
			var ps_ = function() {
				pd_.push({
					pa_ : pa_,
					pb_ : pb_,
					pe_ : pe_,
					pf_ : pf_,
					marginPaths : marginPaths
				});
				pe_ = [];
				pf_ = [];
				marginPaths = [];
			};
			for (var pt_ = 0; pt_ < as_.length; pt_++) {
				var pu_ = as_[pt_];
				switch (pu_.by_) {
					case "pv_":
						var cx = x + pu_.pw_;
						var cy = y + pu_.px_;
						var ax = cx + pu_.py_;
						var ay = cy + pu_.pz_;
						pj_.push({
							po_ : x,
							pq_ : y,
							cx : cx,
							cy : cy,
							pp_ : ax,
							pr_ : ay
						});
						x = ax;
						y = ay;
						break;
					case "qa_":
						var ax = x + pu_.x;
						var ay = y + pu_.y;
						pj_.push({
							po_ : x,
							pq_ : y,
							pp_ : ax,
							pr_ : ay
						});
						x = ax;
						y = ay;
						break;
					case "qb_":
						pk_();
						if (pu_.pa_ != null || pu_.pb_ != null) {
							ps_();
							if (pu_.pa_ != null) {
								pa_ = pu_.pa_;
							}
							if (pu_.pb_ != null) {
								pb_ = pu_.pb_;
							}
						}
						if (pu_.qc_ != -2147483648 || pu_.qd_ != -2147483648) {
							if (pu_.qc_ != -2147483648) {
								x = pu_.qc_;
							}
							if (pu_.qd_ != -2147483648) {
								y = pu_.qd_;
							}
						}
						if (pu_.lineStyle == -2147483648 && pu_.fillStyle == -2147483648 && pu_.qe_ == -2147483648) {
							break;
						}
						if (pu_.lineStyle != -2147483648) {
							pg_ = pu_.lineStyle;
						}
						if (pu_.fillStyle != -2147483648) {
							ph_ = pu_.fillStyle;
						}
						if (pu_.qe_ != -2147483648) {
							pi_ = pu_.qe_;
						}
						break;
					default:
						throw "Unimplemented : " + pu_.by_;
				}
			}
			pk_();
			ps_();
			qf_(qg_);
			for (var ci = 0, ci_len = pd_.length; ci < ci_len; ci++) {
				var pa_ = pd_[ci].pa_;
				var pb_ = pd_[ci].pb_;
				var pe_ = pd_[ci].pe_;
				var pf_ = pd_[ci].pf_;
				var marginPaths = pd_[ci].marginPaths;
				var drawLineFunc = function(style, qh_) {
					qf_(qi_);
					qj_(lo_, style, ht_);
					for (var qk_ = 0, lineIndex_len = qh_.length; qk_ < lineIndex_len; qk_++) {
						var ql_ = qh_[qk_];
						qf_(qm_, ql_[0].po_ / 20, ql_[0].pq_ / 20);
						for (var pm_ = 0, pathIndex_len = ql_.length; pm_ < pathIndex_len; pm_++) {
							var pj_ = ql_[pm_];
							if ( typeof (pj_.cx) == "number") {
								qf_(qn_, pj_.cx / 20, pj_.cy / 20, pj_.pp_ / 20, pj_.pr_ / 20);
								ol_++;
							} else {
								qf_(qo_, pj_.pp_ / 20, pj_.pr_ / 20);
								ol_++;
							}
						}
					}
					qf_(qp_);
					ol_++;
				};
				if (!ox_) {
					for (var i = 0; i < marginPaths.length; i++) {
						var qh_ = marginPaths[i];
						if (qh_ == null) {
							continue;
						}
						var style = af_.em_(pb_[i]);
						if (style.by_ == "pl_") {
							style.by_ = "qq_";
							style.width = 1;
						} else {
							continue;
						}
						drawLineFunc(style, qh_);
					}
				}
				for (var i = 0; i < pf_.length; i++) {
					var fill = pf_[i];
					if (fill == null) {
						continue;
					}
					fill = qr_(fill);
					if (!ox_) {
						var ft = qs_(lo_, pb_[i], ht_, ff_);
						qf_(qt_, ft);
						var rt = af_.mi_(ft);
					}
					if (!ox_ || (ox_.oy_ && ci == 0 && i == 0)) {
						qf_(qi_);
					}
					var pn_ = function(pj_) {
						if (ox_) {
							return pj_;
						}
						var qu_, az_ = {};
						qu_ = af_.jr_(rt, pj_.po_, pj_.pq_);
						az_.po_ = qu_.x;
						az_.pq_ = qu_.y;
						qu_ = af_.jr_(rt, pj_.pp_, pj_.pr_);
						az_.pp_ = qu_.x;
						az_.pr_ = qu_.y;
						if ( typeof (pj_.cx) === "number") {
							qu_ = af_.jr_(rt, pj_.cx, pj_.cy);
							az_.cx = qu_.x;
							az_.cy = qu_.y;
						}
						return az_;
					};
					for (var qv_ = 0, fillIndex_len = fill.length; qv_ < fillIndex_len; qv_++) {
						var ql_ = fill[qv_];
						var nz_ = pn_(ql_[0]);
						qf_(qm_, nz_.po_ / 20, nz_.pq_ / 20);
						for (var pm_ in ql_) {
							var pj_ = pn_(ql_[pm_]);
							if ( typeof (pj_.cx) == "number") {
								qf_(qn_, pj_.cx / 20, pj_.cy / 20, pj_.pp_ / 20, pj_.pr_ / 20);
								ol_++;
							} else {
								qf_(qo_, pj_.pp_ / 20, pj_.pr_ / 20);
								ol_++;
							}
						}
					}
					if (ox_) {
						if (ox_.end && ci == pd_.length - 1 && i == pf_.length - 1) {
							qf_(qw_);
						}
					} else {
						qf_(qx_);
						ol_++;
						qf_(qt_, rt);
					}
				}
				if (!ox_) {
					for (var i = 0; i < pe_.length; i++) {
						var qh_ = pe_[i];
						if (qh_ == null) {
							continue;
						}
						var style = pa_[i];
						drawLineFunc(style, qh_);
					}
				}
			}
		};
		var qr_ = function(ql_) {
			do {
				var az_ = [];
				var concat = false;
				for (var i = 0; i < ql_.length; i++) {
					for (var j = 0; j < az_.length; j++) {
						var qy_ = ql_[i].length - 1;
						var qz_ = az_[j].length - 1;
						if (ql_[i][0].po_ == az_[j][qz_].pp_ && ql_[i][0].pq_ == az_[j][qz_].pr_) {
							az_[j] = az_[j].concat(ql_[i]);
							concat = true;
							break;
						} else if (az_[j][0].po_ == ql_[i][qy_].pp_ && az_[j][0].pq_ == ql_[i][qy_].pr_) {
							az_[j] = ql_[i].concat(az_[j]);
							concat = true;
							break;
						}
					}
					if (j == az_.length) {
						az_.push(ql_[i]);
					}
				}
				ql_ = az_;
			} while (concat);
			return ql_;
		};
		var qj_ = function(lo_, lineStyle, ht_) {
			switch (lineStyle.by_) {
				case "qq_":
					if (lineStyle.width != null) {
						qf_(ra_, lineStyle.width / 20);
					}
					if (lineStyle.hk_ != null) {
						qf_(rb_, lineStyle.hk_);
					}
					break;
				default:
					throw "Unimplemented : " + lineStyle.by_;
			}
		};
		var qs_ = function(lo_, fillStyle, ht_, ff_) {
			var rc_ = af_.ki_();
			switch (fillStyle.by_) {
				case "rd_":
					rc_ = {
						io_ : fillStyle.transform.io_ / 20,
						ip_ : fillStyle.transform.ip_ / 20,
						iq_ : fillStyle.transform.iq_ / 20,
						ir_ : fillStyle.transform.ir_ / 20,
						im_ : fillStyle.transform.im_,
						in_ : fillStyle.transform.in_
					};
					var dict = ff_.m_[fillStyle.bc_];
					if (dict && dict.hh_) {
						qf_(re_, ff_.ac_[dict.hh_]);
						ol_++;
					} else {
						qf_(rf_, "rgb(255,0,0)", true);
					}
					break;
				case "rg_":
					rc_ = fillStyle.transform;
					qf_(rh_, fillStyle);
					ol_++;
					break;
				case "pl_":
					qf_(rf_, fillStyle.hk_);
					break;
				default:
					throw "Unimplemented : " + fillStyle;
			}
			return rc_;
		};
		var ot_ = function(lo_, et_, ou_, ht_, ff_) {
			if (et_.transform) {
				qf_(qt_, et_.transform);
			}
			var ri_ = et_.rj_;
			var font, x = 0, y = 0, height, hk_;
			for (var i = 0; i < ri_.length; i++) {
				var hq_ = ri_[i];
				if ( typeof (hq_.rk_) != "undefined") {
					font = ff_.m_[hq_.rk_];
				}
				if ( typeof (hq_.rl_) != "undefined") {
					hk_ = hq_.rl_;
				}
				if ( typeof (hq_.rm_) != "undefined") {
					x = af_.dw_(hq_.rm_);
				}
				if ( typeof (hq_.rn_) != "undefined") {
					y = af_.dw_(hq_.rn_);
				}
				if ( typeof (hq_.ro_) != "undefined") {
					height = hq_.ro_;
				}
				for (var j = 0; j < hq_.rp_.length; j++) {
					var gz_ = height / 1024;
					var ox_ = ou_ ? {
						oy_ : i == 0 && j == 0,
						end : i == ri_.length - 1 && j == hq_.rp_.length - 1
					} : null;
					qf_(qt_, {
						io_ : 1,
						ip_ : 1,
						iq_ : 0,
						ir_ : 0,
						im_ : x,
						in_ : y
					});
					qf_(qt_, {
						io_ : gz_,
						ip_ : gz_,
						iq_ : 0,
						ir_ : 0,
						im_ : 0,
						in_ : 0
					});
					ol_++;
					rq_(lo_, font, hq_.rp_[j].rr_, hk_, ox_, ht_, ff_);
					qf_(qt_, {
						io_ : 1 / gz_,
						ip_ : 1 / gz_,
						iq_ : 0,
						ir_ : 0,
						im_ : 0,
						in_ : 0
					});
					qf_(qt_, {
						io_ : 1,
						ip_ : 1,
						iq_ : 0,
						ir_ : 0,
						im_ : -x,
						in_ : -y
					});
					x += hq_.rp_[j].rs_;
				}
			}
			if (et_.transform) {
				var rt = af_.mi_(et_.transform);
				qf_(qt_, rt);
			}
		};
		var rq_ = function(lo_, font, ku_, hk_, ox_, ht_, ff_) {
			var rt_ = font.ru_[ku_];
			var pb_ = [{
				by_ : "pl_",
				hk_ : hk_,
				type : "rv_"
			}];
			oz_(lo_, null, pb_, rt_.pc_.as_, ox_, ht_, ff_);
			return;
		};
		var ow_ = function(lo_, et_, rw_, ou_, ht_, ff_, fieldScale) {
			if (et_.mh_) {
				var po_ = et_.jf_[0] / 20 + 2;
				var pq_ = et_.jf_[1] / 20 + 2;
				var pp_ = et_.jf_[2] / 20 - 2;
				var pr_ = et_.jf_[3] / 20 - 2;
				var font = ff_.m_[et_.rx_];
				var gz_ = et_.ry_ / 1024;
				if (c_ == a_) {
					rw_ = af_.normalizeLineBreak(rw_);
					qf_(qt_, {
						io_ : 1,
						ip_ : 1,
						iq_ : 0,
						ir_ : 0,
						im_ : po_ * 20,
						in_ : pq_ * 20
					});
					qf_(qt_, {
						io_ : gz_,
						ip_ : gz_,
						iq_ : 0,
						ir_ : 0,
						im_ : 0,
						in_ : 0
					});
				}
				var currentChar = 0;
				var lines = 0;
				while (currentChar < rw_.length) {
					var rz_ = 0;
					var sa_ = [];
					for (; currentChar < rw_.length; currentChar++) {
						var c = rw_.charCodeAt(currentChar);
						var ku_ = -1;
						if (c_ == a_ && et_.sb_ == 1 && c == 10) {
							currentChar++;
							break;
						}
						for (var i = 0, i_len = font.sc_.length; i < i_len; i++) {
							if (font.sc_[i] == c) {
								ku_ = i;
								break;
							}
						}
						if (ku_ != -1) {
							sa_.push(ku_);
							var sd_ = font.se_[ku_];
							if (c_ == a_ && et_.sb_ == 1 && et_.sf_ == 1 && rz_ + sd_ > (pp_ - po_) / gz_ * 20) {
								currentChar++;
								break;
							}
							rz_ += sd_;
						}
					}
					var sg_ = 0;
					switch (et_.sg_) {
						case 1:
							sg_ = (pp_ - po_) / gz_ * 20 - rz_;
							break;
						case 2:
						case 3:
							sg_ = ((pp_ - po_) / gz_ * 20 - rz_) / 2;
							break;
						default:
							break;
					}
					if (c_ == a_) {
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : sg_,
							in_ : font.sh_
						});
					} else if (c_ == b_) {
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : po_ * 20,
							in_ : pq_ * 20 + font.sh_ * gz_
						});
						qf_(qt_, {
							io_ : gz_,
							ip_ : gz_,
							iq_ : 0,
							ir_ : 0,
							im_ : 0,
							in_ : 0
						});
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : sg_,
							in_ : 0
						});
					}
					ol_++;
					for (var l = 0; l < sa_.length; l++) {
						var ku_ = sa_[l];
						var ox_ = ou_ ? {
							oy_ : l == 0 && lines == 0,
							end : l == sa_.length - 1 && currentChar == rw_.length - 1
						} : null;
						rq_(lo_, font, ku_, et_.hk_, ox_, ht_, ff_);
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : font.se_[ku_],
							in_ : 0
						});
					}
					if (c_ == a_) {
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : -(sg_ + rz_),
							in_ : font.si_
						});
					} else if (c_ == b_) {
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : -(sg_ + rz_),
							in_ : 0
						});
						qf_(qt_, {
							io_ : 1 / gz_,
							ip_ : 1 / gz_,
							iq_ : 0,
							ir_ : 0,
							im_ : 0,
							in_ : 0
						});
						qf_(qt_, {
							io_ : 1,
							ip_ : 1,
							iq_ : 0,
							ir_ : 0,
							im_ : -po_ * 20,
							in_ : -(pq_ * 20 + font.sh_ * gz_)
						});
					}
					lines++;
				}
				if (c_ == a_) {
					qf_(qt_, {
						io_ : 1 / gz_,
						ip_ : 1 / gz_,
						iq_ : 0,
						ir_ : 0,
						im_ : 0,
						in_ : -(font.sh_ + font.si_) * lines
					});
					qf_(qt_, {
						io_ : 1,
						ip_ : 1,
						iq_ : 0,
						ir_ : 0,
						im_ : -po_ * 20,
						in_ : -pq_ * 20
					});
				}
			} else {
				var po_ = (et_.jf_[0] + et_.sj_) / 20;
				var pq_ = et_.jf_[1] / 20;
				var pp_ = (et_.jf_[2] - et_.sk_) / 20 * ( fieldScale ? fieldScale[0] : 1);
				var pr_ = et_.jf_[3] / 20 * ( fieldScale ? fieldScale[1] : 1);
				qf_(qi_);
				qf_(qm_, po_, pq_);
				qf_(qo_, po_, pr_);
				qf_(qo_, pp_, pr_);
				qf_(qo_, pp_, pq_);
				qf_(sl_);
				var ry_ = et_.ry_ / 20;
				var sm_ = (et_.ry_ + et_.sn_) / 20;
				var so_ = ((et_.sf_ == 1 && et_.sb_ == 1) ? Math.floor((pp_ - po_) / ry_ * 2) : 0);
				var sp_ = af_.sq_(rw_, so_);
				qf_(sr_, ry_, et_.hk_);
				switch (et_.sg_) {
					case 1:
						qf_(ss_, "top", "end");
						if (c_ == a_) {
							for (var i = 0; i < sp_.length; i++) {
								qf_(st_, sp_[i], pp_ - 4, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						} else if (c_ == b_) {
							for (var i in sp_) {
								qf_(st_, sp_[i], pp_ - 4, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						}
						break;
					case 2:
						qf_(ss_, "top", "center");
						if (c_ == a_) {
							for (var i = 0; i < sp_.length; i++) {
								qf_(st_, sp_[i], (po_ + pp_) / 2 + 2, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						} else if (c_ == b_) {
							for (var i in sp_) {
								qf_(st_, sp_[i], (po_ + pp_) / 2 + 2, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						}
						break;
					case 3:
					default:
						qf_(ss_, "top", "start");
						if (c_ == a_) {
							for (var i = 0; i < sp_.length; i++) {
								qf_(st_, sp_[i], po_ + 2, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						} else if (c_ == b_) {
							for (var i in sp_) {
								qf_(st_, sp_[i], po_ + 2, pq_ + 2 + sm_ * i, et_.su_);
								ol_++;
							}
						}
						break;
				}
			}
		};
		var sv_ = function(ht_, sw_) {
			if (!ht_ || ht_.length == 0) {
				return sw_;
			} else {
				var hk_ = af_.sx_(sw_);
				if (hk_.length == 3) {
					hk_.push(1.0);
				}
				var sy_ = ["iv_", "iw_", "ix_", "iu_"];
				var add = ["iy_", "iz_", "ja_", "jb_"];
				for (var i = ht_.length - 1; i >= 0; i--) {
					var t = ht_[i];
					for (var j = 0; j < 4; j++) {
						var max = (j != 3) ? 255 : 1.0;
						hk_[j] = Math.max(0, Math.min(((hk_[j] * t[sy_[j]]) + t[add[j]]), max));
					}
				}
				ol_ += 4;
				return af_.sz_(hk_);
			}
		};
		var qf_ = function(ta_) {
			var tb_ = [];
			for (var i = 1; i < arguments.length; i++) {
				tb_.push(arguments[i]);
			}
			om_.push([ta_, tb_]);
		};
		var qg_ = function(lo_) {
			lo_.lineCap = "round";
			lo_.globalCompositeOperation = "source-over";
		};
		var qt_ = function(lo_, c, t) {
			af_.setTransform(lo_, t);
		};
		var qi_ = function(lo_) {
			lo_.beginPath();
		};
		var qm_ = function(lo_, c, x, y) {
			lo_.moveTo(x, y);
		};
		var qn_ = function(lo_, c, cx, cy, x, y) {
			lo_.quadraticCurveTo(cx, cy, x, y);
		};
		var qo_ = function(lo_, c, x, y) {
			lo_.lineTo(x, y);
		};
		var qw_ = function(lo_) {
			lo_.clip();
		};
		var qx_ = function(lo_) {
			lo_.fill();
		};
		var qp_ = function(lo_) {
			lo_.stroke();
		};
		var ra_ = function(lo_, c, w) {
			if (w * on_ < 1) {
				w = 1 / on_;
			}
			lo_.lineWidth = w;
		};
		var rb_ = function(lo_, ht_, c) {
			lo_.strokeStyle = sv_(ht_, c);
		};
		var re_ = function(lo_, ht_, bitmap) {
			var tc_ = "repeat";
			var img;
			if (ht_.length > 0) {
				img = af_.nt_(ht_, bitmap);
			} else {
				img = bitmap;
			}
			var td_ = lo_.createPattern(img, tc_);
			if (c_ == a_) {
				lo_.fillStyle = "rgba(0,0,0,1.00)";
			}
			lo_.fillStyle = td_;
		};
		var rf_ = function(lo_, ht_, c, f) {
			lo_.fillStyle = (f) ? c : sv_(ht_, c);
		};
		var rh_ = function(lo_, ht_, fillStyle) {
			var te_;
			if (fillStyle.type == "tf_") {
				te_ = lo_.createLinearGradient(-16384 / 20, 0, 16384 / 20, 0);
			} else if (fillStyle.type == "tg_") {
				te_ = lo_.createRadialGradient(0, 0, 0, 0, 0, 16384 / 20);
			}
			for (var th_ = 0; th_ < fillStyle.ti_.length; th_++) {
				var g = fillStyle.ti_[th_];
				te_.addColorStop(g.gz_ / 255, sv_(ht_, g.hk_));
			}
			lo_.fillStyle = te_;
		};
		var sl_ = function(lo_) {
			lo_.closePath();
		};
		var sr_ = function(lo_, ht_, ry_, c) {
			lo_.font = ry_ + "px sans-serif";
			var tj_ = af_.sx_(sv_(ht_, c));
			tj_[3] = af_.sx_(c)[3];
			lo_.fillStyle = af_.sz_(tj_);
		};
		var ss_ = function(lo_, c, b, a) {
			lo_.textBaseline = b;
			lo_.textAlign = a;
		};
		var st_ = function(lo_, c, tk_, x, y, l) {
			if (l) {
				lo_.fillText(tk_, x, y, l);
			} else {
				lo_.fillText(tk_, x, y);
			}
		};
		;
	})();
	af_.ag_ = function(ff_) {
		this.ff_ = ff_;
		this.tl_ = new af_.aq_([{
			"by_" : "he_"
		}], null, null, undefined, ff_);
		this.tl_.exception = true;
		this.tm_ = ff_.config.disableGetURL;
		this.drag = null;
	};
	af_.ag_.prototype = {
		updateDrag : function() {
			if (!this.drag) {
				return;
			}
			var gw_ = this.drag.gw_;
			var jf_ = this.drag.jf_;
			var diff = this.drag.diff;
			var qu_ = this.getFlashPosition();
			gw_.gh_ = true;
			var x = qu_.x + diff.dx;
			var y = qu_.y + diff.dy;
			if (jf_) {
				if (x < jf_.left) {
					x = jf_.left;
				} else if (x > jf_.right) {
					x = jf_.right;
				}
				if (y < jf_.top) {
					y = jf_.top;
				} else if (y > jf_.bottom) {
					y = jf_.bottom;
				}
			}
			gw_.jt_("fg_", x);
			gw_.jt_("fh_", y);
		},
		getFlashPosition : function() {
			var qu_ = af_.em_(this.ff_.touch.currentXY);
			var g_ = this.ff_.g_;
			var o_ = this.ff_.o_;
			qu_.x *= o_[2] / 20 / g_.offsetWidth;
			qu_.y *= o_[3] / 20 / g_.offsetHeight;
			return qu_;
		},
		dd_ : function(be_, gu_) {
			var tn_ = 0;
			var lh_ = [];
			var to_ = be_;
			while (tn_ < gu_.length) {
				var action = gu_[tn_];
				if (!action) {
					tn_++;
					continue;
				}
				var tp_ = action.by_;
				if (tp_ == "tq_") {
					tp_ = action.type;
				}
				switch (tp_) {
					case "End":
						return;
					case "tr_":
						lh_.push(lh_[lh_.length - 1]);
						break;
					case "Pop":
						lh_.pop();
						break;
					case "Swap":
						var ts_ = lh_[lh_.length - 2];
						lh_[lh_.length - 2] = lh_[lh_.length - 1];
						lh_[lh_.length - 1] = ts_;
						break;
					case "Add":
						var a = af_.dw_(lh_[lh_.length - 1]);
						var b = af_.dw_(lh_[lh_.length - 2]);
						lh_[lh_.length - 2] = a + b;
						lh_.pop();
						break;
					case "Subtract":
						var a = af_.dw_(lh_[lh_.length - 1]);
						var b = af_.dw_(lh_[lh_.length - 2]);
						lh_[lh_.length - 2] = b - a;
						lh_.pop();
						break;
					case "Multiply":
						var a = af_.dw_(lh_[lh_.length - 1]);
						var b = af_.dw_(lh_[lh_.length - 2]);
						lh_[lh_.length - 2] = a * b;
						lh_.pop();
						break;
					case "Divide":
						var a = af_.dw_(lh_[lh_.length - 1]);
						var b = af_.dw_(lh_[lh_.length - 2]);
						if (a == 0) {
							lh_[lh_.length - 2] = "#ERROR";
						} else {
							lh_[lh_.length - 2] = b / a;
						}
						lh_.pop();
						break;
					case "Less":
						var a = af_.dw_(lh_.pop());
						var b = af_.dw_(lh_.pop());
						lh_.push((b < a) ? 1 : 0);
						break;
					case "Equals":
						var a = af_.dw_(lh_.pop());
						var b = af_.dw_(lh_.pop());
						lh_.push((a == b) ? 1 : 0);
						break;
					case "And":
						var a = af_.dw_(lh_.pop());
						var b = af_.dw_(lh_.pop());
						lh_.push((a && b) ? 1 : 0);
						break;
					case "Or":
						var a = af_.dw_(lh_.pop());
						var b = af_.dw_(lh_.pop());
						lh_.push((a || b) ? 1 : 0);
						break;
					case "Not":
						var a = af_.dw_(lh_[lh_.length - 1]);
						lh_[lh_.length - 1] = ((a == 0) ? 1 : 0);
						break;
					case "tt_":
						if (c_ == b_) {
							lh_[lh_.length - 2] = lh_[lh_.length - 2] + "" + lh_[lh_.length - 1];
						} else if (c_ == a_) {
							if (lh_[lh_.length - 2] != null && lh_[lh_.length - 1] != null) {
								lh_[lh_.length - 2] = lh_[lh_.length - 2] + "" + lh_[lh_.length - 1];
							} else if (lh_[lh_.length - 2] != null && lh_[lh_.length - 1] == null) {
								lh_[lh_.length - 2] = lh_[lh_.length - 2] + "";
							} else if (lh_[lh_.length - 2] == null && lh_[lh_.length - 1] != null) {
								lh_[lh_.length - 2] = lh_[lh_.length - 1] + "";
							} else {
								lh_[lh_.length - 2] = "";
							}
						}
						lh_.pop();
						break;
					case "tu_":
						var a = lh_.pop() + "";
						var b = lh_.pop() + "";
						lh_.push((a == b) ? 1 : 0);
						break;
					case "tv_":
						var en_ = lh_.pop();
						var ku_ = lh_.pop();
						var tk_ = lh_.pop() + "";
						if (isNaN(parseInt(en_)) || isNaN(parseInt(ku_))) {
							lh_.push("");
						} else {
							en_ = af_.dw_(en_);
							ku_ = af_.dw_(ku_) - 1;
							if (ku_ < 0) {
								ku_ = 0;
							}
							if (en_ < 0) {
								en_ = af_.tw_(tk_);
							}
							lh_.push(af_.tx_(tk_, ku_, en_));
						}
						break;
					case "ty_":
						var en_ = lh_.pop();
						var ku_ = lh_.pop();
						var tk_ = lh_.pop() + "";
						if (isNaN(parseInt(en_)) || isNaN(parseInt(ku_))) {
							lh_.push("");
						} else {
							en_ = af_.dw_(en_);
							ku_ = af_.dw_(ku_) - 1;
							if (ku_ < 0) {
								ku_ = 0;
							}
							if (en_ < 0) {
								en_ = tk_.length;
							}
							lh_.push(tk_.substr(ku_, en_));
						}
						break;
					case "tz_":
						var tk_ = lh_[lh_.length - 1] + "";
						lh_[lh_.length - 1] = af_.tw_(tk_);
						break;
					case "ua_":
						lh_[lh_.length - 1] = (lh_[lh_.length - 1] + "").length;
						break;
					case "ub_":
						var uc_ = lh_.pop();
						var gw_ = af_.ag_.ud_(be_, uc_);
						var lockCenter = af_.dw_(lh_.pop());
						var constrain = af_.dw_(lh_.pop());
						if (constrain) {
							var height = af_.dw_(lh_.pop());
							var width = af_.dw_(lh_.pop());
							var top = af_.dw_(lh_.pop());
							var left = af_.dw_(lh_.pop());
						}
						if (!gw_) {
							break;
						}
						var diff;
						if (lockCenter) {
							diff = {
								dx : 0,
								dy : 0
							};
						} else {
							var qu_ = this.getFlashPosition();
							diff = {
								dx : gw_.bk_.fg_ - qu_.x,
								dy : gw_.bk_.fh_ - qu_.y
							};
						}
						this.drag = {
							gw_ : gw_,
							jf_ : ( constrain ? {
								left : left,
								top : top,
								right : width,
								bottom : height,
							} : null),
							diff : diff
						};
						break;
					case "ue_":
						this.drag = null;
						break;
					case "uf_":
						var b = lh_.pop() + "";
						var a = lh_.pop() + "";
						lh_.push((a < b) ? 1 : 0);
						break;
					case "ToInteger":
						lh_[lh_.length - 1] = parseInt(af_.dw_(lh_[lh_.length - 1]));
						break;
					case "ug_":
						lh_[lh_.length - 1] = (lh_[lh_.length - 1] + "").charCodeAt(0);
						break;
					case "uh_":
						lh_[lh_.length - 1] = String.fromCharCode(lh_[lh_.length - 1]);
						break;
					case "ui_":
						lh_[lh_.length - 1] = (lh_[lh_.length - 1] + "").charCodeAt(0);
						break;
					case "uj_":
						lh_[lh_.length - 1] = String.fromCharCode(lh_[lh_.length - 1]);
						break;
					case "uk_":
						var b = af_.dw_(lh_.pop());
						if (b != 0) {
							if (action.ul_ == null) {
								tn_ = gu_.length - 1;
							} else {
								tn_ += action.ul_ - 1;
							}
						}
						break;
					case "um_":
						if (action.ul_ == null) {
							tn_ = gu_.length - 1;
						} else {
							tn_ += action.ul_ - 1;
						}
						break;
					case "un_":
						for (var i = 0; i < action.uo_.length; i++) {
							var v = action.uo_[i];
							if (v.by_ == null) {
								lh_.push(v);
							} else if (v.by_ == "Null") {
								lh_.push(null);
							} else {
								throw "[Push] Unimplemented to push:" + v.by_;
								lh_.push(null);
							}
						}
						break;
					case "up_":
						var uq_ = lh_.pop();
						var value;
						var az_ = af_.ag_.ex_(be_, uq_);
						var g_ = az_[0];
						var ez_ = az_[1];
						if (c_ == b_) {
							if (g_ != null) {
								if (g_ == this.tl_) {
									g_ = this.ff_.z_;
								}
								value = g_.fa_[ez_];
							} else {
								value = "";
							}
							if ( typeof (value) == "undefined") {
								value = "";
							}
						} else if (c_ == a_) {
							value = (g_ && (((g_ == this.tl_) ? this.ff_.z_: g_).fa_[ez_]));
							value = ( typeof (value) === "undefined") ? "" : value;
						}
						lh_.push(value);
						break;
					case "ur_":
						var value = lh_.pop();
						var ez_ = lh_.pop();
						var az_ = af_.ag_.ex_(be_, ez_);
						if (az_[0] == null) {
						} else {
							if (az_[0] == this.tl_) {
								az_[0] = this.ff_.z_;
							}
							az_[0].fa_[az_[1]] = value;
						}
						break;
					case "us_":
						var p = lh_.pop();
						var pj_ = lh_.pop();
						var gw_ = af_.ag_.ud_(be_, pj_);
						var name = af_.ag_.ut_[p];
						if (gw_ && gw_ != this.tl_) {
							if (!name) {
								lh_.push(0);
							} else {
								switch (name) {
									case "fm_":
										if (gw_.dg_) {
											lh_.push(gw_.bm_);
										} else {
											lh_.push("/");
										}
										break;
									case "fk_":
										var jf_ = gw_.je_(this.ff_);
										lh_.push((jf_[2] - jf_[0]) / 20);
										break;
									case "fl_":
										var jf_ = gw_.je_(this.ff_);
										lh_.push((jf_[3] - jf_[1]) / 20);
										break;
									case "fg_":
									case "fh_":
										lh_.push(Math.floor(gw_.bk_[name] * 50) / 50);
										break;
									default:
										lh_.push(gw_.bk_[name]);
										break;
								}
							}
						} else {
							lh_.push(p);
						}
						break;
					case "uu_":
						var value = lh_.pop();
						var p = lh_.pop();
						var pj_ = lh_.pop();
						var gw_ = af_.ag_.ud_(be_, pj_);
						var name = af_.ag_.ut_[p];
						if (gw_ && gw_ != this.tl_) {
							switch (name) {
								case "fu_":
									if (value != parseFloat(value)) {
									} else {
										gw_.gh_ = true;
										gw_.jo_(value);
									}
									break;
								case "fs_":
									if (value != parseFloat(value)) {
									} else {
										gw_.gh_ = true;
										gw_.ji_(value);
									}
									break;
								case "ft_":
									if (value != parseFloat(value)) {
									} else {
										gw_.gh_ = true;
										gw_.jn_(value);
									}
									break;
								case "fi_":
								case "fg_":
								case "fh_":
									if (value != parseFloat(value)) {
									} else {
										gw_.gh_ = true;
										gw_.jt_(name, af_.dw_(value));
									}
									break;
								case "fr_":
								case "fq_":
								case "fj_":
									if (value != parseInt(af_.dw_(value)) || (value != 0 && value != 1)) {
									} else {
										gw_.jt_(name, parseInt(af_.dw_(value)));
									}
									break;
								case "fl_":
								case "fk_":
									if (c_ == a_ && value === "") {
										break;
									}
									var jf_ = gw_.je_(this.ff_);
									var _sc, base;
									if (name == "fl_") {
										base = (jf_[3] - jf_[1]) / 20;
										if (c_ == a_) {
											_sc = gw_.bk_.ft_;
											if (_sc !== 0) {
												base *= 1 / _sc;
											}
											gw_.jn_(value / (base || 1));
										} else if (c_ == b_)
											gw_.jn_(value / base * 100);
									} else {
										base = (jf_[2] - jf_[0]) / 20;
										if (c_ == a_) {
											_sc = gw_.bk_.fs_;
											if (_sc !== 0) {
												base *= 1 / Math.abs(_sc);
											}
											gw_.ji_(value / (base || 1));
										} else if (c_ == b_) {
											gw_.ji_(value / base * 100);
										}
									}
									gw_.gh_ = true;
									break;
								case "cx_":
								case "fm_":
								case "cy_":
									break;
								case "bl_":
									break;
								default:
									gw_.bk_[name] = value;
									break;
							}
						} else {
						}
						break;
					case "Play":
						be_.cv_ = true;
						break;
					case "Stop":
						be_.cv_ = false;
						break;
					case "uv_":
						var uq_ = lh_.pop();
						var az_ = af_.ag_.ex_(be_, uq_);
						var gw_ = az_[0];
						if (gw_ == null) {
							break;
						}
						var da_ = true;
						for (var i = 0, i_len = this.ff_.t_.length; i < i_len; i++) {
							if (this.ff_.t_[i] == gw_.dc_) {
								da_ = false;
								break;
							}
						}
						if (!da_) {
							break;
						}
						var uw_ = az_[1];
						var gs_ = gw_.gj_[uw_];
						if (!gs_) {
							gs_ = uw_;
						}
						if (!isNaN(parseInt(gs_))) {
							var ux_ = gw_.ea_[gs_];
							if (ux_) {
								for (var i = 0; i < ux_.length; i++) {
									this.dd_(gw_, ux_[i]);
								}
							}
						} else {
						}
						break;
					case "uy_":
						be_.cv_ = false;
						var gs_ = be_.gj_[action.hg_];
						if (gs_ > 0) {
							this.ff_.cz_(be_, be_.gj_[action.hg_], false);
						} else {
						}
						break;
					case "uz_":
						if (be_ == this.tl_) {
							break;
						}
						be_.cv_ = false;
						this.ff_.cz_(be_, action.va_, false);
						break;
					case "vb_":
						if (action.vc_) {
							throw "[GotoFrame2] unsupport sceneBias";
						}
						var uq_ = lh_.pop() + "";
						var az_ = af_.ag_.ex_(be_, uq_);
						var gw_ = az_[0];
						if (gw_ == null || gw_ == this.tl_) {
							break;
						}
						var uw_ = az_[1];
						var gs_ = gw_.gj_[uw_];
						if (!gs_) {
							gs_ = uw_;
						}
						if (!isNaN(parseInt(gs_))) {
							gw_.cv_ = (action.vd_ > 0);
							this.ff_.cz_(gw_, gs_, false);
						} else {
						}
						break;
					case "ve_":
						be_.cv_ = false;
						this.ff_.cz_(be_, be_.bk_.cx_ + 1, false);
						break;
					case "vf_":
						be_.cv_ = false;
						this.ff_.cz_(be_, be_.bk_.cx_ - 1, false);
						break;
					case "vg_":
						be_ = af_.ag_.ud_(to_, action.uc_);
						if (be_ == null) {
							be_ = this.tl_;
						}
						break;
					case "vh_":
						var uc_ = lh_.pop();
						be_ = af_.ag_.ud_(to_, uc_);
						if (be_ == null) {
							be_ = this.tl_;
						}
						break;
					case "vi_":
						break;
					case "vj_":
						var vk_ = action.vk_;
						if (vk_) {
							switch (action.gw_) {
								case "_level0":
								case "_level1":
									break;
								default:
									location.href = vk_;
									break;
							}
						}
						break;
					case "vl_":
						var vm_ = lh_.pop();
						var vk_ = lh_.pop();
						if (vk_) {
							switch (action.method) {
								case "POST":
									break;
								case "vn_":
									break;
								case "GET":
									var vo_ = new Array();
									for (var dj_ in be_.fa_) {
										var vp_ = be_.fa_[dj_];
										if (vp_ == null) {
											vp_ = "";
										}
										vo_.push(dj_ + "=" + encodeURI(vp_));
									}
									var vq_ = "";
									if (vo_.length) {
										vq_ = vo_.join("&");
										if (vk_.indexOf("?") == -1) {
											vk_ += "?" + vq_;
										} else {
											vk_ += "&" + vq_;
										}
									}
									break;
							}
							if (action.fa_ != 0) {
								var vr_ = af_.vs_();
								var method = (action.method == "POST") ? "POST" : "GET";
								vr_.open(method, vk_, true);
								if (method == "POST") {
									vr_.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=Shift-jis");
									var vo_ = new Array();
									for (var dj_ in be_.fa_) {
										var vp_ = be_.fa_[dj_];
										if (vp_ == null) {
											vp_ = "";
										}
										vo_.push(dj_ + "=" + encodeURI(vp_));
									}
									var vq_ = "";
									if (vo_.length) {
										vq_ = vo_.join("&");
									}
									if (!this.tm_) {
										vr_.send(vq_);
									} else {
									}
								} else {
									if (!this.tm_) {
										vr_.send("");
									} else {
									}
								}
								vr_.onreadystatechange = (function(currentMC) {
									return function() {
										if (vr_.readyState == 4 && vr_.status == 200) {
											var vt_ = af_.ag_.ud_(currentMC, vm_);
											if (vt_ == null) {
												vt_ = currentMC;
											}
											var vu_ = decodeURI(vr_.responseText).split("&");
											for (var dj_ = 0; dj_ < vu_.length; dj_++) {
												var vv_ = vu_[dj_].split("=");
												vt_.fa_[vv_[0]] = vv_[1];
											}
										}
									};
								})(be_);
							} else {
								if (action.method == "POST") {
									var form = document.createElement("form");
									document.body.appendChild(form);
									form.setAttribute("action", vk_);
									form.setAttribute("method", "post");
									for (var dj_ in be_.fa_) {
										var vp_ = be_.fa_[dj_];
										if (vp_ == null) {
											vp_ = "";
										}
										var input = document.createElement("input");
										input.setAttribute("type", "hidden");
										input.setAttribute("name", dj_);
										input.setAttribute("value", encodeURI(vp_));
										form.appendChild(input);
									}
									if (!this.tm_) {
										form.submit();
									} else {
									}
									document.body.removeChild(form);
								} else if (action.method == "GET") {
									if (!this.tm_) {
										location.href = vk_;
									} else {
									}
								} else {
									if (!this.tm_) {
										location.href = vk_;
									} else {
									}
								}
							}
						} else {
							af_.ag_.vw_(be_, vm_);
						}
						break;
					case "vx_":
						var hu_ = lh_.pop();
						var vy_ = "" + lh_.pop();
						var vz_ = "" + lh_.pop();
						var wa_ = af_.ag_.ud_(be_, vz_);
						var dg_ = wa_ ? wa_.dg_ : null;
						if (dg_ == null) {
							break;
						}
						var wb_ = dg_.ef_[hu_];
						if (wb_) {
							if (wb_.eo_.be_ && wb_.eo_.be_.gi_) {
								dg_.eh_(hu_);
							} else {
								break;
							}
						}
						var if_ = null;
						for (var ee_ in dg_.ef_) {
							if (dg_.ef_[ee_].eo_.be_ == wa_) {
								if_ = dg_.ef_[ee_];
								break;
							}
						}
						if_ = af_.em_(if_);
						if_.name = vy_;
						if_.ee_ = hu_;
						if_.eo_ = {};
						var wc_ = wa_.em_(vy_, if_);
						wc_.bk_.fj_ = 1;
						if_.eo_.be_ = wc_;
						dg_.ef_[hu_] = if_;
						break;
					case "wd_":
						var vm_ = lh_.pop();
						af_.ag_.vw_(be_, vm_);
						break;
					case "Trace":
						break;
					case "we_":
						lh_.push(new Date().getTime() - this.ff_.u_);
						break;
					case "wf_":
						lh_[lh_.length - 1] = parseInt(lh_[lh_.length - 1] * Math.random());
						break;
					case "wg_":
						var nj_ = lh_.pop();
						var wh_ = [];
						for (var i = 0; i < nj_; i++) {
							wh_.push(lh_.pop());
						}
						if (c_ == b_ && this.ff_.config.listener.onFSCommand2) {
							lh_.push(this.ff_.config.listener.onFSCommand2.call(null, wh_));
						} else {
							lh_.push(-1);
						}
						break;
					default:
						break;
				}
				tn_++;
			}
		}
	};
	af_.ag_.ud_ = function(be_, uc_) {
		if (be_.exception) {
			var exception = true;
			be_ = be_.ff_.z_;
		}
		if (uc_ == "") {
			return ( exception ? be_.exception : be_);
		}
		if (uc_ == "_level0") {
			while (be_.dg_) {
				be_ = be_.dg_;
			}
			return be_;
		}
		var az_ = String(uc_).split("/");
		var ku_ = 0;
		if (az_[ku_] == "") {
			while (be_.dg_) {
				be_ = be_.dg_;
			}
			ku_++;
		}
		var tk_;
		for (; ku_ < az_.length; ku_++) {
			tk_ = az_[ku_];
			if (tk_ == "") {
			} else if (tk_ == "..") {
				if (be_.dg_) {
					be_ = be_.dg_;
					while (be_.gk_) {
						be_ = be_.dg_;
					}
				} else {
					return null;
				}
			} else {
				if (tk_.charAt(0) == ".") {
					tk_ = tk_.substring(1);
				}
				be_ = be_.ic_(tk_);
				if (!be_) {
					return null;
				}
			}
		}
		return be_;
	};
	af_.ag_.ex_ = function(be_, uq_) {
		var g_ = be_;
		if (g_.gk_) {
			g_ = g_.dg_;
		}
		var ez_ = String(uq_);
		var az_ = String(uq_).split(":");
		if (az_.length == 2) {
			g_ = af_.ag_.ud_(be_, az_[0]);
			ez_ = az_[1];
		} else if (az_.length > 2) {
		}
		return [g_, ez_];
	};
	af_.ag_.vw_ = function(be_, uq_) {
		var gw_ = af_.ag_.ud_(be_, uq_);
		var dg_ = gw_ ? gw_.dg_ : null;
		if (dg_ == null || gw_ == null) {
			return;
		}
		for (var ee_ in dg_.ef_) {
			if (ee_ >= 16384) {
				be_ = dg_.ef_[ee_].eo_.be_;
				if (be_ == gw_) {
					if (be_.gi_) {
						dg_.eh_(ee_);
						return;
					} else {
					}
				}
			}
		}
	};
	af_.ag_.ut_ = ["fg_", "fh_", "fs_", "ft_", "cx_", "cy_", "fi_", "fj_", "fk_", "fl_", "fu_", "fm_", "fn_", "bl_", "fo_", "fp_", "fq_", "fr_"];
	;
	(function() {
		af_.al_ = function(ff_, g_) {
			this.ff_ = ff_;
			this.g_ = g_;
			this.wi_ = ff_.config.flick || null;
			this.lightning = (ff_.config.lightning || !this.wi_) || false;
			this.wj_ = (ff_.config.flick && ff_.config.flick.detect) || 300;
			if (c_ == a_) {
				this.wk_ = (ff_.config.touch && ff_.config.touch.clickableObject) || null;
			} else {
				this.wk_ = (ff_.config.touch && ff_.config.touch.clickableObject) || {};
			}
			this.ontouch = (ff_.config.touch && ff_.config.touch.ontouch) || null;
			this.wl_ = false;
			this.dn_ = null;
			this.dp_ = null;
			this.wm_ = {};
			this.currentXY = {
				x : 0,
				y : 0
			};
			if (!ff_.config.disableTouch) {
				var j_ = this;
				ff_.g_.addEventListener("touchstart", function(e) {
					if (c_ == a_) {
					}
					j_.wn_.call(j_, e.touches[0]);
					j_.currentXY = j_.getPositionFromEvent(e.touches[0]);
					e.preventDefault();
				}, false);
				if (ff_.config.fullScreen) {
					document.addEventListener("touchstart", function(e) {
						e.preventDefault();
					}, false);
				}
				document.addEventListener("touchend", function(e) {
					j_.dp_ = {
						x : j_.currentXY.x,
						y : j_.currentXY.y
					};
					if (j_.wl_) {
						j_.wo_.call(j_, e.touches[0]);
						e.preventDefault();
					}
				}, false);
				document.addEventListener("touchmove", function(e) {
					j_.currentXY = j_.getPositionFromEvent(e.touches[0]);
					if (j_.wl_) {
						j_.wp_.call(j_, e.touches[0]);
						e.preventDefault();
					}
				}, false);
				g_.addEventListener("mousedown", function(e) {
					j_.wn_.call(j_, e);
					e.preventDefault();
				}, false);
				document.addEventListener("mouseup", function(e) {
					j_.dp_ = {
						x : j_.currentXY.x,
						y : j_.currentXY.y
					};
					if (j_.wl_) {
						j_.wo_.call(j_, e);
						e.preventDefault();
					}
				}, false);
				document.addEventListener("mousemove", function(e) {
					j_.currentXY = j_.getPositionFromEvent(e);
					if (j_.wl_) {
						j_.wp_.call(j_, e);
						e.preventDefault();
					}
				}, false);
				document.addEventListener("keydown", function(e) {
					j_.keyDown(String.fromCharCode(e.keyCode));
				}, false);
				ff_.aw_(this.ax_);
			}
		};
		af_.al_.prototype = {
			getPositionFromEvent : function(e) {
				var x = e.clientX;
				var y = e.clientY;
				var r = this.ff_.g_.style.zoom;
				if (r) {
					var gz_ = r.substring(0, r.length - 1) / 100;
					x /= gz_;
					y /= gz_;
				}
				x -= this.ff_.g_.offsetLeft;
				y -= this.ff_.g_.offsetTop;
				return {
					x : x,
					y : y
				};
			},
			wn_ : function(e) {
				var qu_ = this.getPositionFromEvent(e);
				this.setTouchXY(qu_.x, qu_.y);
				if (this.lightning) {
					this.wq_(qu_.x, qu_.y);
					return false;
				}
				this.wl_ = true;
				this.u_ = new Date().getTime();
				this.wr_ = qu_;
				this.ws_ = qu_;
				this.wt_ = qu_;
				return false;
			},
			wp_ : function(e) {
				var qu_ = this.getPositionFromEvent(e);
				this.wt_ = qu_;
				return false;
			},
			wo_ : function(e) {
				this.wl_ = false;
				this.dp_ = {
					x : this.wt_.x,
					y : this.wt_.y
				};
				this.wu_();
				return false;
			},
			ax_ : function() {
				if (this.wl_) {
					var end = new Date().getTime();
					if (end - this.start > this.wj_) {
						this.wl_ = false;
						this.wu_();
					}
				}
			},
			wq_ : function(x, y) {
				this.setTouchXY(x, y);
				if (!(this.ontouch && this.ontouch(x, y))) {
					this.dn_ = {
						x : x,
						y : y
					};
					if (this.lightning && this.lightning !== true) {
						this.keyDown(this.lightning);
					}
					if (!this.lightning && this.wi_ && this.wi_.touch) {
						this.keyDown(this.wi_.touch);
					}
					if (this.wk_) {
						var wv_ = this.ff_.ay_(x, y);
						for (var i = wv_.length - 1; i >= 0; i--) {
							var db_ = wv_[i] + "";
							var dj_ = this.wk_[db_];
							dj_ && this.keyDown(dj_);
							var name = db_.split("/").pop();
							if (name != db_) {
								dj_ = this.wk_[name];
								dj_ && this.keyDown(dj_);
							}
						}
					}
				}
			},
			wu_ : function() {
				if (!this.wt_ || (this.wt_.x == this.ws_.x && this.wt_.y == this.ws_.y)) {
					this.wq_(this.wr_.x, this.wr_.y);
					return;
				}
				if (this.wi_) {
					var deg = Math.atan2(this.wt_.x - this.ws_.x, -this.wt_.y + this.ws_.y) / Math.PI * 180;
					for (var ww_ in this.wi_) {
						var wx_ = ww_.split(":");
						if (wx_.length == 2) {
							if ((wx_[0] <= deg && deg <= wx_[1]) || (wx_[0] <= deg + 360 && deg + 360 <= wx_[1])) {
								this.keyDown(this.wi_[ww_]);
							}
						}
					}
				}
			},
			setTouchXY : function(x, y) {
				if (this.ff_.config.enableXYTouch) {
					this.ff_.z_.fa_["_xtouch"] = Math.floor(x / this.ff_.config.scale);
					this.ff_.z_.fa_["_ytouch"] = Math.floor(y / this.ff_.config.scale);
				}
			},
			keyDown : function(dj_) {
				this.wm_[dj_] = true;
			},
			dq_ : function() {
				this.wm_ = {};
			},
			dl_ : function(dj_) {
				return this.wm_[dj_] || false;
			},
		};
	})();
	;
	(function() {
		af_.ak_ = function(ff_) {
			this.ff_ = ff_;
		};
		af_.ak_.prototype = {
			isExistMC : function(name) {
				var fullpath = false;
				if (name.charAt(0) == "/") {
					fullpath = true;
				}
				return (function bd_(be_) {
					if (!be_.dh_()) {
						return null;
					}
					if (fullpath) {
						if (be_.bm_ == name) {
							return true;
						}
					} else {
						if (be_.bm_.split("/").pop() == name) {
							return true;
						}
					}
					for (var i = 0; i < be_.bn_.length; i++) {
						var az_ = bd_(be_.bn_[i]);
						if (az_) {
							return az_;
						}
					}
					return false;
				})(this.ff_.z_);
			},
			isExistObject : function(num) {
				var kq_ = this.ff_.ah_.getAllRenderList();
				if (c_ == b_) {
					for (var i = 0; i < kq_.length; i++) {
						if (kq_[i].bc_ == num) {
							return true;
						}
					}
				} else if (c_ == a_) {
					for (var i in kq_) {
						if (kq_[i].bc_ == num) {
							return true;
						}
					}
				}
				return false;
			},
			getObjectFromPosition : function(x, y) {
				return this.ff_.ay_(x, y);
			},
			getFrameCount : function() {
				return this.ff_.v_;
			},
			getProperty : function(name, property) {
				var be_ = af_.ag_.ud_(this.ff_.z_, name);
				if (be_) {
					if ( property in be_.bk_) {
						return be_.bk_[property];
					} else {
						return be_.fa_[property];
					}
				}
			},
			getWidth : function() {
				return this.ff_.g_.offsetWidth;
			},
			getHeight : function() {
				return this.ff_.g_.offsetHeight;
			},
			sendKeyDown : function(keyCode) {
				this.ff_.touch.keyDown(keyCode);
			},
			sendTouchXY : function(x, y) {
				this.ff_.touch.wq_(x, y);
			},
			setRunning : function(v) {
				this.ff_.an_ = v;
				if (v) {
					var j_ = this;
					setTimeout(function() {
						j_.ff_.co_()
					}, 0);
				}
			},
			getMovieClipFromTargetName_ : function(name) {
				return af_.ag_.ud_(this.ff_.z_, name);
			},
			mcPlay : function(be_) {
				be_.cv_ = true;
			},
			mcStop : function(be_) {
				be_.cv_ = false;
			},
			mcGoto : function(be_, frameNoOrLabel) {
				var gs_;
				if ( typeof frameNoOrLabel === "string") {
					gs_ = be_.gj_[af_.toLowerCase(frameNoOrLabel)];
				} else {
					gs_ = frameNoOrLabel;
				}
				if (0 < gs_) {
					this.ff_.cz_(be_, gs_, false);
				}
			},
			mcGetProperty : function(be_, property) {
				if ( property in be_.bk_) {
					return be_.bk_[property];
				} else {
					return be_.fa_[property];
				}
			},
			mcSetProperty : function(be_, property, value) {
				if ( property in be_.bk_) {
					be_.bk_[property] = value;
				} else {
					be_.fa_[property] = value;
				}
			}
		};
	})();
	af_.toLowerCase = function(tk_) {
		return ( typeof (tk_) == "string") ? tk_.toLowerCase() : tk_;
	};
	af_.em_ = function(wy_) {
		var wz_ = {};
		for (var v in wy_) {
			wz_[v] = wy_[v];
		}
		return wz_;
	};
	af_.dw_ = function(value) {
		var az_ = parseFloat(value);
		return (isNaN(az_) ? 0 : az_);
	};
	af_.hz_ = function(ek_, value) {
		if (ek_.length) {
			for (var i = 0; i < ek_.length; i++) {
				if (ek_[i] == value) {
					ek_.splice(i, 1);
					return;
				}
			}
		} else {
			for (var i in ek_) {
				if (ek_[i] == value) {
					delete ek_[i];
					return;
				}
			}
		}
	};
	af_.lu_ = function(mv_, xa_, xb_, mw_, xc_, xd_) {
		return {
			io_ : mv_,
			ip_ : mw_,
			iq_ : xa_,
			ir_ : xb_,
			im_ : xc_,
			in_ : xd_
		};
	};
	af_.xe_ = function(t) {
		return [t.io_, t.iq_, t.ir_, t.ip_, t.im_, t.in_];
	};
	af_.ki_ = function() {
		return af_.lu_(1, 0, 0, 1, 0, 0);
	};
	af_.il_ = function() {
		return {
			iv_ : 1,
			iw_ : 1,
			ix_ : 1,
			iu_ : 1,
			iy_ : 0,
			iz_ : 0,
			ja_ : 0,
			jb_ : 0
		};
	};
	af_.setTransform = function(lo_, t) {
		lo_.transform(t.io_, t.iq_, t.ir_, t.ip_, t.im_ / 20, t.in_ / 20);
	};
	af_.jr_ = function(t, x, y) {
		return {
			x : (t.io_ * x + t.ir_ * y + t.im_),
			y : (t.iq_ * x + t.ip_ * y + t.in_)
		};
	};
	af_.mi_ = function(t) {
		var xf_ = (t.io_ * t.ip_ - t.iq_ * t.ir_);
		if (xf_ == 0) {
		}
		return {
			io_ : t.ip_ / xf_,
			ir_ : -t.ir_ / xf_,
			im_ : (t.ir_ * t.in_ - t.im_ * t.ip_) / xf_,
			iq_ : -t.iq_ / xf_,
			ip_ : t.io_ / xf_,
			in_ : (t.iq_ * t.im_ - t.in_ * t.io_) / xf_
		};
	};
	af_.lf_ = function(jq_, js_) {
		if (jq_.iq_ == 0 && jq_.ir_ == 0) {
			if (js_.iq_ == 0 && js_.ir_ == 0) {
				return {
					io_ : jq_.io_ * js_.io_,
					ir_ : 0,
					im_ : jq_.io_ * js_.im_ + jq_.im_,
					iq_ : 0,
					ip_ : jq_.ip_ * js_.ip_,
					in_ : jq_.ip_ * js_.in_ + jq_.in_
				};
			} else {
				return {
					io_ : jq_.io_ * js_.io_,
					ir_ : jq_.io_ * js_.ir_,
					im_ : jq_.io_ * js_.im_ + jq_.im_,
					iq_ : jq_.ip_ * js_.iq_,
					ip_ : jq_.ip_ * js_.ip_,
					in_ : jq_.ip_ * js_.in_ + jq_.in_
				};
			}
		} else {
			if (js_.iq_ == 0 && js_.ir_ == 0) {
				return {
					io_ : jq_.io_ * js_.io_,
					ir_ : jq_.ir_ * js_.ip_,
					im_ : jq_.io_ * js_.im_ + jq_.ir_ * js_.in_ + jq_.im_,
					iq_ : jq_.iq_ * js_.io_,
					ip_ : jq_.ip_ * js_.ip_,
					in_ : jq_.iq_ * js_.im_ + jq_.ip_ * js_.in_ + jq_.in_
				};
			} else {
				return {
					io_ : jq_.io_ * js_.io_ + jq_.ir_ * js_.iq_,
					ir_ : jq_.io_ * js_.ir_ + jq_.ir_ * js_.ip_,
					im_ : jq_.io_ * js_.im_ + jq_.ir_ * js_.in_ + jq_.im_,
					iq_ : jq_.iq_ * js_.io_ + jq_.ip_ * js_.iq_,
					ip_ : jq_.iq_ * js_.ir_ + jq_.ip_ * js_.ip_,
					in_ : jq_.iq_ * js_.im_ + jq_.ip_ * js_.in_ + jq_.in_
				};
			}
		}
	};
	af_.jh_ = function(rc_, po_, pq_, pp_, pr_) {
		var az_ = {};
		var w = pp_ - po_;
		var h = pr_ - pq_;
		var xg_ = af_.jr_(rc_, po_, pq_);
		var dx1 = rc_.io_ * w;
		var dy1 = rc_.iq_ * w;
		var dx2 = rc_.ir_ * h;
		var dy2 = rc_.ip_ * h;
		if (dx1 >= 0) {
			if (dx2 >= 0) {
				az_.bh_ = xg_.x + dx1 + dx2;
				az_.bg_ = xg_.x;
			} else {
				az_.bh_ = xg_.x + dx1;
				az_.bg_ = xg_.x + dx2;
			}
		} else {
			if (dx2 >= 0) {
				az_.bh_ = xg_.x + dx2;
				az_.bg_ = xg_.x + dx1;
			} else {
				az_.bh_ = xg_.x;
				az_.bg_ = xg_.x + dx1 + dx2;
			}
		}
		if (dy1 >= 0) {
			if (dy2 >= 0) {
				az_.bj_ = xg_.y + dy1 + dy2;
				az_.bi_ = xg_.y;
			} else {
				az_.bj_ = xg_.y + dy1;
				az_.bi_ = xg_.y + dy2;
			}
		} else {
			if (dy2 >= 0) {
				az_.bj_ = xg_.y + dy2;
				az_.bi_ = xg_.y + dy1;
			} else {
				az_.bj_ = xg_.y;
				az_.bi_ = xg_.y + dy1 + dy2;
			}
		}
		return az_;
	};
	af_.gy_ = function(xh_, gz_, m_) {
		var az_ = {};
		gz_ = gz_ ? gz_ : 0;
		var r = 1.0 * gz_ / 65536;
		var s = 1 - r;
		az_.by_ = "cg_";
		az_.bc_ = xh_.bc_ * 65536 + gz_;
		if (m_[az_.bc_]) {
			return m_[az_.bc_];
		}
		az_.jf_ = [];
		for (var i = 0; i < 4; i++) {
			az_.jf_.push(xh_.xi_[i] * s + xh_.xj_[i] * r);
		}
		az_.pb_ = [];
		for (var i = 0, i_len = xh_.xk_.length; i < i_len; i++) {
			var xl_ = xh_.xk_[i];
			var fill = {};
			fill.by_ = xl_.by_;
			if (xl_.by_ == "pl_") {
				fill.hk_ = af_.xm_(xl_.xn_, xl_.xo_, r, s);
				fill.type = "rv_";
				az_.pb_.push(fill);
			} else if (xl_.by_ == "rg_") {
				fill.transform = af_.xp_(xl_.xq_, xl_.xr_, r, s);
				fill.ti_ = [];
				for (var j = 0, j_len = xl_.ti_.length; j < j_len; j++) {
					var xs_ = xl_.ti_[j];
					var te_ = {};
					te_.by_ = xs_.by_;
					te_.gz_ = Math.round(xs_.xt_ * s + xs_.xu_ * r);
					te_.hk_ = af_.xm_(xs_.xn_, xs_.xo_, r, s);
					fill.ti_.push(te_);
				}
				fill.type = xl_.type;
				az_.pb_.push(fill);
			} else {
			}
		}
		az_.pa_ = [];
		for (var i = 0, i_len = xh_.xv_.length; i < i_len; i++) {
			var xw_ = xh_.xv_[i];
			var qh_ = {};
			qh_.by_ = "qq_";
			qh_.width = xw_.xx_ * s + xw_.xy_ * r;
			qh_.hk_ = af_.xm_(xw_.xn_, xw_.xo_, r, s);
			az_.pa_.push(qh_);
		}
		az_.pc_ = {};
		az_.pc_.by_ = "xz_";
		az_.pc_.as_ = [];
		if (xh_.ya_.pc_.as_.length != xh_.yb_.pc_.as_.length) {
			if (xh_.ya_.pc_.as_.length - 1 == xh_.yb_.pc_.as_.length && xh_.yb_.pc_.as_[0].by_ != "qb_") {
				xh_.yb_.pc_.as_.unshift(xh_.ya_.pc_.as_[0]);
			} else {
				m_[az_.bc_] = az_;
				return az_;
			}
		}
		for (var i = 0; i < xh_.ya_.pc_.as_.length; i++) {
			var yc_ = xh_.ya_.pc_.as_[i];
			var yd_ = xh_.yb_.pc_.as_[i];
			var ye_ = {};
			if (yc_.by_ == "pv_" && yd_.by_ == "qa_") {
				yd_.by_ = "pv_";
				yd_.pw_ = yd_.x / 2;
				yd_.px_ = yd_.y / 2;
				yd_.py_ = yd_.x / 2;
				yd_.pz_ = yd_.y / 2;
			} else if (yc_.by_ == "qa_" && yd_.by_ == "pv_") {
				yc_.by_ = "pv_";
				yc_.pw_ = yc_.x / 2;
				yc_.px_ = yc_.y / 2;
				yc_.py_ = yc_.x / 2;
				yc_.pz_ = yc_.y / 2;
			}
			ye_.by_ = yc_.by_;
			if (yc_.by_ == "qb_") {
				ye_.lineStyle = yc_.lineStyle;
				ye_.fillStyle = yc_.fillStyle;
				ye_.qe_ = yc_.qe_;
				ye_.qc_ = yc_.qc_ * s + yd_.qc_ * r;
				ye_.qd_ = yc_.qd_ * s + yd_.qd_ * r;
				ye_.pa_ = yc_.pa_;
				ye_.pb_ = yc_.pb_;
			} else if (yc_.by_ == "qa_") {
				ye_.x = yc_.x * s + yd_.x * r;
				ye_.y = yc_.y * s + yd_.y * r;
			} else if (yc_.by_ == "pv_") {
				ye_.pw_ = yc_.pw_ * s + yd_.pw_ * r;
				ye_.px_ = yc_.px_ * s + yd_.px_ * r;
				ye_.py_ = yc_.py_ * s + yd_.py_ * r;
				ye_.pz_ = yc_.pz_ * s + yd_.pz_ * r;
			} else {
				continue;
			}
			az_.pc_.as_.push(ye_);
		}
		m_[az_.bc_] = az_;
		return az_;
	};
	af_.xm_ = function(xn_, xo_, r, s) {
		var start = af_.sx_(xn_);
		var end = af_.sx_(xo_);
		var hk_ = [];
		for (var i = 0; i < start.length; i++) {
			if (i < 3) {
				hk_.push(Math.round(start[i] * s + end[i] * r));
			} else {
				hk_.push(start[i] * s + end[i] * r);
			}
		}
		return af_.sz_(hk_);
	};
	af_.sx_ = function(sw_) {
		var yf_ = new RegExp("rgb\\((\\d+),(\\d+),(\\d+)\\)", "i");
		var yg_ = new RegExp("rgba\\((\\d+),(\\d+),(\\d+),(\\d+(?:\\.\\d+)?)\\)", "i");
		var match;
		match = sw_.match(yf_);
		if (match) {
			return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
		}
		match = sw_.match(yg_);
		if (match) {
			return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseFloat(match[4])];
		}
		return null;
	};
	af_.sz_ = function(yh_) {
		if (yh_.length != 3 && yh_.length != 4) {
			return null;
		}
		for (var i = 0; i < 3; i++) {
			yh_[i] = Math.round(yh_[i]);
		}
		if (yh_.length == 3) {
			return "rgb(" + yh_.join(",") + ")";
		} else {
			return "rgba(" + yh_.join(",") + ")";
		}
	};
	af_.xp_ = function(yi_, yj_, r, s) {
		var az_ = {};
		az_.io_ = yi_.io_ * s + yj_.io_ * r;
		az_.ip_ = yi_.ip_ * s + yj_.ip_ * r;
		az_.iq_ = yi_.iq_ * s + yj_.iq_ * r;
		az_.ir_ = yi_.ir_ * s + yj_.ir_ * r;
		az_.im_ = yi_.im_ * s + yj_.im_ * r;
		az_.in_ = yi_.in_ * s + yj_.in_ * r;
		return az_;
	};
	af_.yk_ = function(c) {
		var i_ = c.charCodeAt(0);
		var yl_ = new RegExp("[\uFF61\uFF62\uFF63\uFF64\uFF65\uFF66\uFF67\uFF68\uFF69\uFF6A\uFF6B\uFF6C\uFF6D\uFF6E\uFF6F\uFF70\uFF71\uFF72\uFF73\uFF74\uFF75\uFF76\uFF77\uFF78\uFF79\uFF7A\uFF7B\uFF7C\uFF7D\uFF7E\uFF7F\uFF80\uFF81\uFF82\uFF83\uFF84\uFF85\uFF86\uFF87\uFF88\uFF89\uFF8A\uFF8B\uFF8C\uFF8D\uFF8E\uFF8F\uFF90\uFF91\uFF92\uFF93\uFF94\uFF95\uFF96\uFF97\uFF98\uFF99\uFF9A\uFF9B\uFF9C\uFF9D\uFF9E\uFF9F]");
		return (0x20 <= i_ && i_ <= 0x7e) || yl_.test(c);
	};
	var ym_ = new RegExp("\r\n", "g");
	var cr = new RegExp("\r", "g");
	af_.normalizeLineBreak = function(tk_) {
		return tk_.replace(ym_, "\n").replace(cr, "\n");
	};
	af_.sq_ = function(yn_, yo_) {
		yn_ = af_.normalizeLineBreak(yn_);
		if (yo_ == 0) {
			return yn_.split("\n");
		}
		var az_ = [];
		var yp_ = "", yq_ = 0;
		for (var i = 0; i < yn_.length; i++) {
			var tk_ = yn_.charAt(i);
			var eb_ = af_.yk_(tk_) ? 1 : 2;
			if (tk_ == "\n") {
				az_.push(yp_);
				yp_ = "";
				yq_ = 0;
			} else if (yq_ + eb_ > yo_) {
				az_.push(yp_);
				yp_ = tk_;
				yq_ = eb_;
			} else {
				yp_ += tk_;
				yq_ += eb_;
			}
		}
		az_.push(yp_);
		return az_;
	};
	af_.tx_ = function(yn_, ku_, en_) {
		var yr_ = 0;
		var yq_ = 0;
		var ys_ = [];
		var resultLength = 0;
		while (yq_ < ku_) {
			var tk_ = yn_.charAt(yr_);
			var eb_ = af_.yk_(tk_) ? 1 : 2;
			yq_ += eb_;
			yr_++;
		}
		if (yq_ != ku_) {
			ys_.push("\uFF65");
			resultLength = 1;
		}
		for (; yr_ < yn_.length && resultLength < en_; yr_++) {
			var tk_ = yn_.charAt(yr_);
			var eb_ = af_.yk_(tk_) ? 1 : 2;
			if (resultLength + eb_ > en_) {
				ys_.push("\uFF65");
				resultLength += 1;
			} else {
				ys_.push(tk_);
				resultLength += eb_;
			}
		}
		return ys_.join("");
	};
	af_.tw_ = function(yn_) {
		var eb_ = 0;
		for (var i = 0; i < yn_.length; i++) {
			eb_ += af_.yk_(yn_.charAt(i)) ? 1 : 2;
		}
		return eb_;
	};
	af_.yt_ = function(c) {
		var ni_ = ["iv_", "iw_", "ix_", "iu_", "iy_", "iz_", "ja_", "jb_"];
		var az_ = [];
		for (var i = 0; i < c.length; i++) {
			for (var j = 0; j < ni_.length; j++) {
				az_.push(c[i][ni_[j]]);
			}
		}
		return az_;
	};
	af_.yu_ = function(id_) {
		var ni_ = ["iv_", "iw_", "ix_", "iu_", "iy_", "iz_", "ja_", "jb_"];
		var ku_ = 0;
		var az_ = [];
		for (var i = 0; i < id_.length / ni_.length; i++) {
			var le_ = {};
			for (var j = 0; j < ni_.length; j++) {
				le_[ni_[j]] = id_[ku_];
				ku_++;
			}
			az_.push(le_);
		}
		return az_;
	};
	af_.vs_ = function() {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e2) {
					return null;
				}
			}
		} else {
			return null;
		}
	};
	af_.transformImageColorSpec = function(ht_, bs_) {
		var w = bs_.width;
		var h = bs_.height;
		var inputCanvas = af_.prototype.getAvailableCanvas();
		if (inputCanvas == null) {
			inputCanvas = document.createElement("canvas");
			af_.prototype.cacheCanvas(inputCanvas);
		}
		inputCanvas.isUsed = true;
		inputCanvas.width = w;
		inputCanvas.height = h;
		var ictx = inputCanvas.getContext("2d");
		var yv_ = af_.prototype.getAvailableCanvas();
		if (yv_ == null) {
			yv_ = document.createElement("canvas");
			af_.prototype.cacheCanvas(yv_);
		}
		yv_.isUsed = true;
		yv_.width = w;
		yv_.height = h;
		var yw_ = yv_.getContext("2d");
		ictx.drawImage(bs_, 0, 0);
		var input = ictx.getImageData(0, 0, w, h);
		var yx_ = yw_.createImageData(w, h);
		var inputData = input.data;
		var yy_ = yx_.data;
		var yz_ = ["iv_", "iw_", "ix_", "iu_"];
		var za_ = ["iy_", "iz_", "ja_", "jb_"];
		var dataLength = w * h * 4;
		var transformLength = ht_.length - 1;
		for (var i = 0; i < dataLength; i++) {
			var hk_ = i & 0x3;
			for (var j = transformLength; j >= 0; j--) {
				var sy_ = ht_[j][yz_[hk_]];
				var add = ht_[j][za_[hk_]];
				var az_ = inputData[i] * sy_ + add;
				if (az_ > 255) {
					az_ = 255;
				} else if (az_ < 0) {
					az_ = 0;
				}
				yy_[i] = az_;
			}
		}
		yw_.putImageData(yx_, 0, 0);
		return yv_;
	};
	af_.nt_ = function(ht_, bs_) {
		if (!ht_ || ht_.length == 0) {
			return bs_;
		}
		var w = bs_.width;
		var h = bs_.height;
		if (supportChromeOnAndroid && browser == CHROME_BROWSER && w * h > 65536) {
			return af_.transformImageColorSpec(ht_, bs_);
		}
		var yv_ = af_.prototype.getAvailableCanvas();
		if (yv_ == null) {
			yv_ = document.createElement("canvas");
			af_.prototype.cacheCanvas(yv_);
		}
		yv_.isUsed = true;
		yv_.width = w;
		yv_.height = h;
		var yw_ = yv_.getContext("2d");
		var yh_ = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)"];
		var yz_ = ["iv_", "iw_", "ix_"];
		var za_ = ["iy_", "iz_", "ja_"];
		if (this._alphaCanvas == null)
			this._alphaCanvas = document.createElement("canvas");
		var zb_ = this._alphaCanvas;
		zb_.width = w;
		zb_.height = h;
		var zc_ = zb_.getContext("2d");
		zc_.drawImage(bs_, 0, 0);
		zc_.globalCompositeOperation = "source-atop";
		zc_.fillStyle = "rgba(255,255,255,1)";
		zc_.fillRect(0, 0, w, h);
		for (var j = ht_.length - 1; j >= 0; j--) {
			zc_.globalCompositeOperation = "destination-in";
			if (c_ == a_)
				zc_.globalAlpha = Math.min(Math.max(0, ht_[j]["iu_"]), 1);
			else if (c_ == b_)
				zc_.globalAlpha = ht_[j]["iu_"];
			zc_.fillRect(0, 0, w, h);
			zc_.globalCompositeOperation = "lighter";
			zc_.fillStyle = "rgba(255,255,255,1)";
			zc_.globalAlpha = ht_[j]["jb_"] / 255;
			if (ht_[j]["jb_"]) {
				if (ht_[j]["jb_"] == -255) {
					zc_.globalCompositeOperation = "source-out";
				}
			}
			zc_.fillRect(0, 0, w, h);
		}
		var zd_ = true;
		for (var j = ht_.length - 1; j >= 0; j--) {
			var add = ht_[j]["iy_"];
			var sy_ = ht_[j]["iv_"];
			if (add != ht_[j]["iz_"] || add != ht_[j]["ja_"] || sy_ != ht_[j]["iw_"] || sy_ != ht_[j]["ix_"]) {
				zd_ = false;
				break;
			}
		}
		if (zd_) {
			yw_.drawImage(bs_, 0, 0);
			for (var j = ht_.length - 1; j >= 0; j--) {
				yw_.globalCompositeOperation = "source-over";
				yw_.fillStyle = "rgb(0,0,0)";
				yw_.globalAlpha = 1 - ht_[j]["iv_"];
				yw_.fillRect(0, 0, w, h);
				var ze_ = ht_[j]["iy_"] / 255;
				if (ze_ < 0) {
					yw_.globalCompositeOperation = "darker";
					yw_.fillStyle = "rgb(0,0,0)";
					ze_ = -ze_;
				} else {
					yw_.globalCompositeOperation = "lighter";
					yw_.fillStyle = "rgb(255,255,255)";
				}
				yw_.globalAlpha = ze_;
				yw_.fillRect(0, 0, w, h);
			}
		} else {
			var zf_ = [];
			var zg_ = [];
			if (this.zh_ == null)
				this.zh_ = [];
			for (var i = 0; i < 3; i++) {
				if (this.zh_[i] == null) {
					this.zh_[i] = document.createElement("canvas");
				}
				var zi_ = this.zh_[i];
				zi_.width = w;
				zi_.height = h;
				var zj_ = zi_.getContext("2d");
				zj_.drawImage(bs_, 0, 0);
				zj_.globalCompositeOperation = "darker";
				zj_.fillStyle = yh_[i];
				zj_.fillRect(0, 0, w, h);
				zf_.push(zj_);
				zg_.push(zi_);
			}
			yw_.globalCompositeOperation = "lighter";
			for (var i = 0; i < 3; i++) {
				var zj_ = zf_[i];
				for (var j = ht_.length - 1; j >= 0; j--) {
					zj_.globalCompositeOperation = "source-over";
					zj_.fillStyle = "rgb(0,0,0)";
					zj_.globalAlpha = 1 - ht_[j][yz_[i]];
					zj_.fillRect(0, 0, w, h);
					var ze_ = ht_[j][za_[i]] / 255;
					if (ze_ < 0) {
						zj_.globalCompositeOperation = "darker";
						zj_.fillStyle = "rgb(0,0,0)";
						ze_ = -ze_;
					} else {
						zj_.globalCompositeOperation = "lighter";
						zj_.fillStyle = yh_[i];
					}
					zj_.globalAlpha = ze_;
					zj_.fillRect(0, 0, w, h);
				}
				yw_.drawImage(zg_[i], 0, 0);
			}
		}
		yw_.globalCompositeOperation = "destination-in";
		yw_.globalAlpha = 1;
		yw_.drawImage(zb_, 0, 0);
		return yv_;
	};
	if (c_ == a_) {
	};
	var am_;
	(function() {
		var zk_ = function() {
		};
		zk_.zl_ = 0x04;
		zk_.zm_ = 0x05;
		zk_.zn_ = 0x06;
		zk_.zo_ = 0x07;
		zk_.zp_ = 0x08;
		zk_.zq_ = 0x09;
		zk_.zr_ = 0x17;
		zk_.zs_ = 0x0A;
		zk_.zt_ = 0x0B;
		zk_.zu_ = 0x0C;
		zk_.zv_ = 0x0D;
		zk_.zw_ = 0x0E;
		zk_.zx_ = 0x0F;
		zk_.zy_ = 0x10;
		zk_.zz_ = 0x11;
		zk_.aab_ = 0x12;
		zk_.aac_ = 0x13;
		zk_.aad_ = 0x14;
		zk_.aae_ = 0x15;
		zk_.aaf_ = 0x18;
		zk_.aag_ = 0x1C;
		zk_.aah_ = 0x1D;
		zk_.aai_ = 0x20;
		zk_.aaj_ = 0x21;
		zk_.aak_ = 0x22;
		zk_.aal_ = 0x23;
		zk_.aam_ = 0x24;
		zk_.aan_ = 0x25;
		zk_.aao_ = 0x26;
		zk_.aap_ = 0x27;
		zk_.aaq_ = 0x28;
		zk_.aar_ = 0x29;
		zk_.aas_ = 0x2D;
		zk_.aat_ = 0x30;
		zk_.aau_ = 0x31;
		zk_.aav_ = 0x32;
		zk_.aaw_ = 0x33;
		zk_.aax_ = 0x34;
		zk_.aay_ = 0x35;
		zk_.aaz_ = 0x36;
		zk_.aba_ = 0x37;
		zk_.abb_ = 0x4C;
		zk_.abc_ = 0x61;
		zk_.abd_ = 0x63;
		zk_.abe_ = 0x65;
		zk_.abf_ = 0x66;
		zk_.abg_ = 0x68;
		zk_.abh_ = 0x69;
		zk_.abi_ = 0x6C;
		zk_.abj_ = 0x6E;
		zk_.abk_ = 0x6F;
		zk_.abl_ = 0x72;
		zk_.abm_ = 0x74;
		zk_.abn_ = 0x78;
		zk_.abo_ = 0x9C;
		zk_.abp_ = 0x81;
		zk_.abq_ = 0x83;
		zk_.abr_ = 0x8A;
		zk_.abs_ = 0x8B;
		zk_.abt_ = 0x8C;
		zk_.abu_ = 0x96;
		zk_.abv_ = 0x99;
		zk_.abw_ = 0x9D;
		zk_.abx_ = 0x9E;
		zk_.aby_ = 0x9F;
		zk_.abz_ = 0x8D;
		zk_.aca_ = 0x9A;
		zk_.acb_ = [[0xcb, 0xc9, 0x4f, 0x4e, 0xcc, 0xc9, 0xc8, 0x2f, 0x2e, 0x01, 0x00, 0x12, 0xab, 0x03, 0xca], [0x4b, 0x49, 0x2d, 0xd3, 0xb3, 0x34, 0xd4, 0x4b, 0xce, 0xcf, 0x05, 0x00, 0x11, 0xe8, 0x03, 0x45], [0xcb, 0x4d, 0x4a, 0x4f, 0xd4, 0xcb, 0x2a, 0x00, 0x00, 0x0a, 0xa3, 0x02, 0xa0], [0x4b, 0x49, 0xcd, 0x4b, 0xd4, 0xcb, 0x2a, 0x00, 0x00, 0x0a, 0x99, 0x02, 0xa1], [0x4b, 0x2a, 0xca, 0x4f, 0x4c, 0x29, 0x49, 0xcc, 0xcc, 0xd1, 0xcb, 0x2a, 0x00, 0x00, 0x1f, 0x66, 0x04, 0xbb]];
		if (c_ == b_) {
			exports.zk_ = zk_;
		}
		acc_ = function() {
		};
		acc_.acd_ = 0x0;
		acc_.ace_ = 0x1;
		acc_.acf_ = 0x2;
		acc_.acg_ = 0x4;
		acc_.ach_ = 0x6;
		acc_.aci_ = 0x7;
		acc_.acj_ = 0x8;
		acc_.ack_ = 0x9;
		acc_.acl_ = 0xa;
		acc_.acm_ = 0xb;
		acc_.acn_ = 0xc;
		acc_.aco_ = 0x14;
		acc_.acp_ = 0x15;
		acc_.acq_ = 0x16;
		acc_.acr_ = 0x1a;
		acc_.acs_ = 0x1c;
		acc_.act_ = 0x20;
		acc_.acu_ = 0x21;
		acc_.acv_ = 0x22;
		acc_.acw_ = 0x23;
		acc_.acx_ = 0x24;
		acc_.acy_ = 0x25;
		acc_.acz_ = 0x27;
		acc_.ada_ = 0x2b;
		acc_.adb_ = 0x2e;
		acc_.adc_ = 0x30;
		if (c_ == b_) {
			exports.acc_ = acc_;
		}
		var add_ = function() {
		};
		add_.ade_ = function(data) {
			var a = data.map(function(adf_, ku_, array) {
				var tk_ = adf_.toString(16).toUpperCase();
				if (tk_.length == 1) {
					return "%0" + tk_;
				}
				return "%" + tk_;
			});
			return adg_(a.join(""));
		};
		add_.toStringFromUTF8 = function(data) {
			var a = data.map(function(adf_, ku_, array) {
				var tk_ = adf_.toString(16).toUpperCase();
				if (tk_.length == 1) {
					return "%0" + tk_;
				}
				return "%" + tk_;
			});
			return UnescapeUTF8(a.join(""));
		};
		add_.toStringFromUCS2 = function(data) {
			var a = data.reverse().map(function(adf_, ku_, array) {
				var tk_ = adf_.toString(16).toUpperCase();
				if (tk_.length == 1) {
					return "%0" + tk_;
				}
				return "%" + tk_;
			});
			return UnescapeUTF16LE(a.join(""));
		};
		add_.adh_ = function(fb, adi_) {
			return add_.adj_(fb, adi_) / 0x10000;
		};
		add_.adk_ = function(type) {
			if (type == 0x41) {
				return "adl_";
			} else if (type == 0x40) {
				return "adm_";
			} else if (type == 0x43) {
				return "adn_";
			} else if (type == 0x42) {
				return "ado_";
			} else if (type == 0x10) {
				return "tf_";
			} else if (type == 0x12) {
				return "tg_";
			} else if (type == 0x00) {
				return "rv_";
			}
			return null;
		};
		add_.adj_ = function(adp_, adi_) {
			if ((adp_ & (1 << (adi_ - 1))) != 0) {
				return adp_ - (1 << adi_);
			}
			return adp_;
		};
		add_.adq_ = function(adr_, ads_) {
			if (c_ == a_) {
				window.asfoaghirgp[3] = 0;
				if (adr_ == 0 && ads_ == 0) {
					return "hc_";
				} else if (adr_ == 1 && ads_ > 1) {
					return "Modifier";
				}
				return ((adr_ == 1) ? "fc_" : null);
			} else if (c_ == b_) {
				if (adr_ == 0 && ads_ == 1) {
					return "fc_";
				} else if (adr_ == 1 && ads_ == 0) {
					return "adt_";
				} else if (adr_ == 1 && ads_ == 1) {
					return "hc_";
				}
			}
			return null;
		};
		if (c_ == b_) {
			exports.add_ = add_;
		}
		add_.ade_ = function(data) {
			var a = data.map(function(adf_, ku_, array) {
				var tk_ = adf_.toString(16).toUpperCase();
				if (tk_.length == 1) {
					return "%0" + tk_;
				}
				return "%" + tk_;
			});
			return adu_(a.join(""));
		};
		adu_ = function(tk_) {
			return tk_.replace(new RegExp("(%A[1-9A-F]|%[B-E][0-9A-F]|%F[0-9A-E]){2}|%[0-7][0-9A-F]", "ig"), function(s) {
				var c = parseInt(s.substring(1), 16);
				return c < 128 ? String.fromCharCode(c) : adv_.charAt((c - 161) * 94 + parseInt(s.substring(4), 16) - 161)
			})
		};
		adv_ = (function() {
			var t = '8  8~8 "8/+ ",E",T R8w8o" O0%."~J "J U"~)"~,"~-8!$8O8l8 )8 *8 +8 ,8 -8 .8 /8!&8!\'8! 8!!  +!  -T /X"#JnX"hn!!n /n"*n")nln#X"!*n^n<n" "xn"|n"+n".n{n$,nFn#-n!-nSninynrnDn!.nIn#$"rnr   + "wnw#"!w0t  *$0. 0.!" 8  *X!!JSJS%<,+<,/<,.<,\'<,&<*!<* <+#<+nw+"!)n!E"!`"!)#8!#Gz:"F)"F*"F+"F,"F-"F."F/zEz`z)n$)#z[z6z7z)X$Az|zjz)+zuz9z;zCz@z}zazbzmz\'-zPzK"F "F!"FnF#"F$"F%"FJFX$Sz{zJzdzrzDz?z&X$Bz&)3#nwn!#n"#n##n$#"<#ndnk"h#n)3"!S"!{"!J"!d"!r"!D"!?"!&X!B"!&)"!&*"!v30~0 "0w0_0o0 &0 \'0l0 )0 *0 +0 ,0 -0 .0 0/! 0!!0!"0!#0!$0O0!&0!\'0U0!)0!*0!+0!,0!-0!.0!0/" 0"!0n0"#0z0<0"&0"\'0h0")0"*0"+0",0"-0".0"0/80x0#"0##0#$0I0#&0#\'0Y0#)0#*0#+0#,0#-0#.0#0/$ 0$!0$"0$#0$$0N0$&0$\'0F0$)0$*0$+0$,0$-0=0$0p 0%!0%"0%#0%$0>0%&0%\'0%(0%)0%*0%+0%,0%-0.#8$!8$"8$#8$$8N8$&8$\'8F8$)8$*8$+8$,8$-8=8H8% 8%!8%"8%#8%$8>8%&8%\'8%(8%)8%*8%+8%,8%-8%.8%/8S8{8J8d8r8D8?8&\'8B8&)8&*8v8M8W8i8y8T8q8X8k8u898;8C8@8}8a8b8m8\'-8P8K8( 8(!8("8(#8($8(%8(&8(\'8:8()8(*8(+8(,8(-8(.8(/8E8`8)"8)#5328*!8*"8*#8*$8^8*&8*\'8R8*)8**8*+8*,8*-8*.8*/8+ 8+!8+"8+#8+$8L8+&8+\'8]8+)8+*8++8+,8+-8+.8+/8, 8,!8,"8,#8,$8f8,&8,\'8e8,)8,*8,+8,,8,-8,.8,/8- 8-!8-"8-#8-$8Z8-&8-\'8g8-)8-*8-+8-,8--8-.8-/8. 8.!8."8.#8.$8_8.&8.\'8c8.)8.*8.+8.,8.-8..8./8/ 8/!8/"8/#8/$8p8/&5w`w)"w)8#[w6w7w)T#Aw)E#jw)+wVw)-wQw)/w* w*!w*8#*$w^w*S#*T#Rw*)5w+!w+"w+8#+$wLw+S#+T#]w+E#+*w++w+,w+-w+.w+/w, w,!w,8#,$wfw,S#,T#ew,)s43t! t!!t!"t!8$!$tOt~t!S$!T$Ut!E$!*t!+t!,t!-t!.t!/t" t"!tnt"8$zt<t"S$"T$ht"E$"*t"+t",t"-t".t"00-543t8txt#"t#8$#$tI N!t#S$#T$Yt#E$#*t#+t#,t#-t#.t#/t$ t$!t$"t$8$$$tNt$S$$T$Ft$E$$*t$+t$,t$-t=t$00-54~~  .!~,.  . ~!8 .E!!+  c~"+  .-~-   .,~$-  /8!-"  /"~v  /*~-$  /E!-S!g~-*~-,  /,  .*53xox d! k!lx )x *x +x ,x -x .x /x!w!!!x!"x!#x!$xOx!d!!k!Ux!)x!*x!+x!,x!-x!.x!/x"w!"!xnx"#xzx<x"d!"k!hx")G5<  <~< "<w<t<o< &< \'<l< )< *< +< ,< -< .< /<! <!!<!"<!#<!$<O<!&<!\'<U<!)<!*<!+<!,<!-<!.<!/<" <"!<n<"#<z<<<"&<"\'<h<")<"*<"+<",<"-<".<"/<8<x<#"<##<#$<I<#&<#\'<Y<#)<#*<#+<#,<#-<#.<#/<$ <$!<$"<$#<$$<N<$&<$\'<F<$)<$*<$+ssssssssssssssssss32>$*7#pm#dh%$,.> 6$, ;`;$e%#,C.c"P\':-Xx7A)@-Mh%][0*&87&)9,+: /*B$: *.? ";,_!/7>&q*,\'0!:(N +<7%{,*y+Y"*-d$,&<<#.Z$"C+ D!v9*N-/$J-F-,+)\';J(R~69-)\'YKJXY;\'-&m/;Pr$&HT(-<J-,a!;%`k.-r",J\'Yn,):!&C/XFJiJ,,H#$\'=I#$^"QP,*E*D.".&:?)V(U P-!B-"@f(B,6%Olg,"F"-c -_8%(`<"D(%($7/[1Z("!|\'O+)-J+!J^?+F,}V(-X ?;/@`S+<IOx@/:( ,e-!-[*O  -Xe%E; .+q!):*L6F"./&X,bh%-")P/\'9"-Mp(.?(0(E#,)/#+v-$`!)b!N/m@*@$-B%#-vZv-7+-D. Oc\'9/)6.-&>Z/ ^/f(/)p(,U!,"EK7%+)ag/+)K!B-",J$!H+p#g%Ic/*:/*A/*+E$-B 9/&R!):(BV-?ULn+;"^/MD(,&1"ic%++.rF%!9%!+ &m$=!)\'V|)mT+#9,>.;k+]#. r*-Jc[LM.<I^",#r /[,"b[H"p.!]"#B!!BU*izM,*jkd>%IfH*:&>P = Z.wvDm#/EcS!?=&k!,:,!&9 J$g-n\';e.")`,9/&A#-e%"!)`o#,h&6&]+S.-ScTK(",g"x=-#M*@%,/r,-m-7)1?/A#$6#6\'L&H*9U,W$L,$h.Wd-<#,A#"e##?P%@+$r#Z+-p,)N-.c+.;",?KF,ar  d+Ru|A],!C/" )H"=*\'7! A*$? ,k!Dk^,!Z.Y6K% K( *oY"&>.9$>%#O "Ug%J($[Q&qZd"y&_-.<$IT)h/?Jyr*$d*I/by:E/F!.Y/+o,U?B%0!M()7$:g!:Mr`}/om.&^7"!o$F=%(a +S.7\\F+-*JKE!.)R+\'QN$w9/$&8Ox7,S(1p/!+jT(w+)/KH:%,#R-rKfD^T+Z!$>!+h?L- 9+* J+-`M9\'F. ,a" {~b}=,C.\\\'@%=!U!.Z"!Z!/*&*\'O#*:c\'6t7,/i,!7r&6*@$o RC-;$!lQDE$d.I---aK&)#-H"l"#6%A=#"9*.a)9.&<c*6.p"!L$#)T(*d;6"N@"?<&)#/)U9% ;-/#P*/:nJ##P/ 9L(#h@,!7,e/Q{F\'H@+,-v&N"#RZ v"U &R$\'OyO8&=,.=!L!-!m)}U+m \'H,Y.Kb.!aVr&9-!N *e! &;~m+7-.,K. &9OL(%+\\@,+r*.r!#d**d"+6!7$"g/+.\'L$;"7<I)"9$$?+\'6 *#J#N."?]&=.Y-#\':(L\\%E".S"lw-Jf=#6#>E\\d+: ,?%.?,".H$? ..W.U+-_/#AMLp#d"OOR#{B&I"  d&Y.F%~<,)+}\'9+/f"8a#+S+,E%#;-9/+9/)\';(F.MTy;bb$)C*^!/#E)I(zH=i/F/.*D$,b!+X,$W*$\'1p*.!J+>.6%\'8(F"b"f.!Z/!/E!"K!$A* &Y"i,\'@AT+6!@)9La+9IH$#9Y%.); .D7 W, v+/\':6#/,7->!,L"~&Y6$ *[)Y, Y-,,X#)@)\\\';(/.g, Z#. =~;.p#..)F)A;)/ .6"Z+)R+*"=n=!f!*e$d{,<"RB +H); &L!++W!_O,J7D)\'7&U,$&E!\'9gE1\';#v-"X(*X.e+/L(IC\'A-$,&9,6$l )^.*?."O|"a./C.-6#+vLD*-K _( DO!7!p+/6(*6$":.XD?AK%i$[)-;/.E$!&Y9$,D`^)#^}].+"&\'I(-/R"#>z!S/o(O(y_,cQNH,$A)g++6*<S;%Y$JmEH` "|KS&A  f!#\\wI,!$|9Wx=(e-8%#-!K%*bHH! =H7  MZk-l%.6. &9&*\'0+&* *C/.[)"P$O!.!T.D#,g1F8Y-")X*/)7-M-LuR"+#D+A **J#/7#<)R=0(++/P+*D#c#/")9.>{A-c *>#"R+1%$"l +^.)/M+:-#A"*,)O^$"7,!L" &P+99/q!*MP\'e6[+=1%0/{zm**=8%,~&a]T<,/ 6 +A,.9*/T1E"<!*/K!g++Z[6!.$H%L$"D)"+D\'@ *N+9J;J,h/E%.NM!/b"&H /$1(&T-WiW**\'A/:+O/!\'9"+J)R\\%H./`-,D*@!"\\OO.V(Ol-\'N"&\\AB-$LEZl%=g7!,X#B!\'A-!p+,e+*#7$NAC/!^$E%&;%Sc+_D#7A"[|;-?c6.X9U&u?\'-!a0( )g-;{!/\'V?%J(-&I!:%"!*[*"K#: )+P+<,);."/&; b-);(+j-:U/K[mZr!.6% a#p$$^=%v$,r~JlQ#g /#9)6"X);AN+B#ei$7~7[)=,="^$tP-7(#A--\\ O?/N.jK+6mhw/B)9-_D#L")/SW)/jH)].*f!M%+*L/!I-.7f.J/U-"O!q[*6"/.M)\\"-/X-9a"&@F-"Z`\\/V(#,9$6\']-H8M+Z+&N)-!)/!I#.FM*j*:,#@ *!DNAP%y*7,9n.u-f<o+.!&8hE"=%?"- S"*B/^!\'I+A%!*lV"b*!)A&K% S./T$e-"p!$6.KE!+uT(VNX-@$>p")/)/6/R/B)+#e+.!;@B$"&\'-e-.R-#>"#g\\*i-*B,-6oE.Z&1&\'V:/A/,9$ej]%+&7-\';,"&=*>++#)R\'`d{RE*/)P6$"+W+>+-<!1>(*K>\'0 r+,d$-D/!{+.S(-q *M%;,$6)"/&;gn^(->Bc,&*v.+E-Z)\'g~9#/;-&6$9>)g#\'@#,/BY}+_F,H>%$l;-he)7 "M+#W+:-&]` Q&F-#^d/Q-!9->/:X. SB%H,=R&*"*:{S%h/T%$,$T-:&}Q#/W"^]p/UP*<%()H*/k#N$#f#)^~6$ _$m==%0-\'N^(/B$&] .UC$X- m,*&_D/"@&=>",J*$=)"M**J#@"+O$-9#=k#.i-!9#L"!<xB+--&)-o\\*S  W._\'Hvnk*/B%Y1(K!#dJS*#>z9.R,JqOW*I+*D.\']I"{$,Q,$@/R9C,"\';(9!/ S/&q$,?$I.$,S$g, .TTd<(\\6/+-SJ(WNW.v,!S[{&9#$7 . ??(-#/}1H!*T.7,$@++Y+/"P-:#r? p^*)+$"W%!W/@,$!W#+H!)T&]#+;"!? -!)Tg-"C)@%!/Lk_K*&k*9@a#-\'Q/b6(l,)7%(07/,l+^Q"OQ,P.)K 6$ 7@!B-:/`m$-7,D#,*S<9+.M\'<#\'I*,)P*;#"N!.l! ^-/U$-/J(oUo+dH .\'7Zz"S]W=%+,N+,h+*U++ D.</,,7$>|#P.C.*^S7b9)#)H\'I++D"*lI*):R-#.9#"[+_tC*#,=/;b&jP%*,!vm;-O9^,!&b#*6/$q=%!\'e *A"T%)@K F#";(, &P,@+!@\';".#d{\'] H.Z"&^!,\\I &)-+)"\'F-p(-#UV!6".b*-=/D D("8%<!)7/i! &c%W*9./^ />)-f, ?-$?f/9(BF+BB%6B++<#" `q7$g%$7`"\'E!q"B /&=*$E,*W$}RN* 9v,ro)H C.+H^(!!*X.U)-"|aK#$P-_"K&>)`9(/K(\\I#.+a7d.-d^;(&}/:(%\'7#?n^"*]h"B%$&C dC\';+a.-W~P-YQI)- J!h%,A"^9$f~/=,+9^(+.L,$^-/.b$+D*$`-!=,*W<(6/\'-"\'6"&=f(,":1+)C#?$+\'AU1!T.,W@%,#Z"+h#$D!J(8.\'9+?;V]=*,S,*m+.m+#P,/=6(+??y):()96:#DM6%f\\$9,|9&a-/a-_!, T*/aAd.*a;P* k7)P-=NT@=%-)O<#*7>!D.@!/e" >F_,x9j)a JgX-)9+Z,Nj\'A#,^,$oF C.)=#.M*co*J-"d&_-c%!\'@--g.!.6"/$0O#_S.C *f"&;I Q$I*!p "&C#9#CP."&F%D"+J(7#A%~$XI(V6!+Y+, P-Zu@#,,[*9!)L$!L,/+H,*a.#W%*E.!)R/>(o$7%#&O$*p/  d.7)\'9!./{B%" ^("^"g%\'=@ -C L.+;!Cm. &<+J)\'=*"T6( wJ/C .$);oC@"-+&P/Bp@ZA)C)-O(/I$+I#./i#N!$L"#L+*h+/c */>$Ia? \'I9O$"-aaS%oL$d*;"*o#.#J&I+,;ap=-a)\\".&`\'9.)#:.N)Y%a.&8c-.: .p9C+CH*6/.L++-v#_#"!\'L X,"B$&C0C#?%/9!L=(/;-N,+/a^($9%)=)+$Ol |:{";cI;$? ?#$Dy J.,J&6.-#7!N@#J,6%(@XU!$R/*#>?(#+!&;%(ZB$-Z*&*B /J.&b..7!O!TyV(,8d1(V({-"K &T,"i_uo&)[X/f.,*E,.&q;-&*&I_"+#XJ( ~HM%Q%`&*T-7-)Z"-"=% 7/\'6W(%P@,*\'-"p!"O}"r,hl+mbM.*B/!&6_!+9#ABRX(!Q,.b/!X\\}++y!#u ?\'=`,,V*$}#eYAIN$ /B!\'=#ZY6"+!@#_YDn6 :H(+$1 9."a,+m)"M^7+D")+\'FI=)H.AoF#+h1.6T%.,7~,W)p.U&>]!Y)H.S$+T+,P,#m*_!,7:!m+U"y="F\\&`,/?P=*c,or*At^ -*9)C!,_+_(/+-y?=(?F"6&I.-?%)6"!\':,"Te%"*#\'8.u##&}\'@/}q&=#$E++V-.W,L!-]-$O$!-J,.k+h#/!7/&)\\$[,#H#&K)^!,,T979%,*-):D#.&=.$iVu 7)+$@v)A/9%6"U;zW$!&KI!W)/)AtL$|b#,a+/7(D@$J."7$;)\'f*tr "b-#y /7$]"*D#J):>.ET(7#+I#&F&HV(!Q)#\':,)kh-.\\-$"QK&p.\'AN/>7$?n.j\'N$O[--H*#D,>,&>,{KO(D!M"p\\+\'Y;..$P0%,.?xL+&*i.D#9=qd* 9DJ*U/iH"&=-!M*&P+B++R$!gb*K%\'E#+6"#b*)j*!:/:$#-W!+)R&P-f):Q++k)+@ UB"jM)R<{L$!9m+=TQ*DIB/,:! )C)"|)hi.i.U%!#?/,{Jy"],"A")h#"+;/"M!I1A#+-k"]8%6!*v-+C-+[,D#&\\8<!)<.#gee-Y=Fk*+&\'j&:%`;)T)qrM*!C 6*)"6$!v,/K(.?"9+-o)+6*j6c6/\'=.e$ e$)7**,;-/68k!+B*DL/C"/`j);!m-e0@,!f/<mk}-:V%M,eqf+,D.$"B,)C" P/>!6%!$Z",6*")Ko);h"-;#,/\'@F%- }-"i#^.)6|A%!!TWM!!J+/;+/DHS*/61? c}/Q"#)=Z$ Z$\'g,",r@r\'A{!&*"U!V@cr&|L$J+7X]#*L(RQgM*+y"o+-.7$e, +\'</&\'- J,C"{=*6V?+,Z()#?*_.>%"-/{>&X(;..\';&X&C*$?"0%=^N [* E*I*!,P+#M!&=$I);(~o)F%I\'9#\'7+_M*d"l!!!Sm6/7--D$J)AOU>*.A 1%j.)qI "*M.>,#,J-/HS%##\\!bE ?.+R%"+Je%.u@+.rLd\'L0>*U`KQ!p,#/dH(t<+\'->i6$*6$-W(%SR&P X-_!-Z]!J.;,-.\'<+JW[*.P+g!!#W%I!V%/ N)\'N"**S!<)k?7(D 9)/d"*{.&m.\\+/^=?+"\'Q<v+F%->$>% ;M*$>&R-+$X"f.OSOu#?",-d)"X$f/Ai$#W#.D  &p(;g@- ;/,9%NnN#-+=%I.QD,U "R -?")LFD"hT*.:(g--!M.O$\': -^K):/FZ$7&*`$-H&7,)+>+\';,&@8JRT/7\\_/W(=,B-*@mb/@!R&T+QHd&\'@+o;/@!")k7"\'7"*L":uIv-9%&F!#.9+";*_##)9-_ /L,$U+Mb,9 HX$\'j)\'Agy "\'="\'7(&FC\'^J/,A)U-"L$,Uo(=%<;R"/A$ Z.\'I!.-\'HB+,N,H%;!M/,):9*$&@#$)+$F/.+m6%<?<!)H*=,BYB$&U#.A$+<\'-$&kNT#?iW?(,x?--T!!&q/v#*B!?"!^)++= I!,$y ?\'-"M(p!;B,L[;+&\'9?%- c!! )p D-C)F\'[!j)U-\'9e"=%.H O$"p6!@ f?(M!F/,N/wM\'-M.Y+*+dESTW#-X9J?)F.[,>#$Y/,!bP=-\\,"&=PQ-$[+![+Iz-&p,EdWN(,#N(!O-$,v" v$7a^N]O$K(f()A%#9/#*J*"&*$\'6#7%XS($BDC*\'=%$HR%-.}\'Ar*,\'1(%,.-H,/\'RZ" @8$=!$S"/\'R#[*&HL=+"\'Q&u#N".F"+7$-"}+Z+--M(!)9h/bM"<w_#Kior,.?uM8SfA\'@+/9c&u#,aC\'V+=UE+!uwM$<W*`$+Mf(gL##RM?yh.*p,Fjqi"o#-D*#&)\\]-*I#+LT(A*;u#`)+M,6!B9,*J/#X*f"Y%")-K#*T[;Y%#uQ$*&)+\'@i7, :-)K*$q#&q,IU7\'-#\'=N(.$DU%v@+*|);JTPZS/)T.Z(.,=,!=+^/,-)P\'=/]+*N" IA*P*+&<$=,-D_J c##:$,A#&Y@-q[i+D++)P-<!);#,7\'-FlA##):!>!!<+\'^Ah/+!=kM%Z!D()<(/y7"c%$*\'N.6! 6/ W*B".>/xr)"W!h$":!iV,I(%cZ+= 6#,!H!.DdB%!>-#=";$!$jjJ&L*,"\'N\\"XW*7(._ .@Y.@ "&uo"#7,|P+O ++>D\'O.\'L+?%"k,R".+&u6,\'On q\'-:v6.*7>rf(-&U!+#>($M>J$C/"_()"Hz>$B-H?$,= ^,!*:/#B*"d=a -T.@hZ"/*)KD,!O=(ELP,Z7h-$RM@" e" g-?r$N,t&O!W()}#c++.@#\'9#I$bH#:.*+W/O*" Pf\'6.M:%+*O*;9!R +.{=i!9(/ 9!/9<X\'<#$C./#C~;-L"&A -fXI.l%)xX..D+-iK(+-9,#:&\'O#$!C/#J/.D/&=, A-\\Bo+Q(+,D#/"C."HK%,=j;%VL/ /}#^(.+=!?\'0=(+J.g*)#E!Z"+/?"/>-f?,E "=ZH(-`,*|TM p. "S$I+*FVB+ZD#?z+|7%+:%+0d:>"_#-\';"D!\'g%",&a"B+#&]*J)h/)I#-F"!"W-!9(/=?(-=%+Tq)\\%*/?`?-)KX(T Q,-)/"of.&X\\0 B!!&9/J -a-D:>.+?%TyxS>%"#@  -&N$:T9"6.oB!#J/$)qf#,,X#g,~M#$\';!a _$".C*,A\'R"!e+/$@>&q$T,!D*/r6%d?~-\'VO#\\=!-v\']lD+/*>.IW+H#*H#,|\'<-/#&Cc YS "):"E O]]++e+pr!e<(r-.>1(",/`D$1C-" E!/m)p /I(%!i*p++\\+,Al#`\':$Vb)@&\'-7(+7(/P_j-#\':_e!\'^\'E$"7*C6pL7I/b ]$-!B*-> &K")u! \'-n6~J$o($,=-D]I)\'6(%$kWd!c.$]. \\ ,c"-$J*f#/ M/ )O_)"*S~MT%u-r$R-"*;"+i.69+&R 9/ yW(,"g,l%;?+./:)"@+#d*<#/)T*-M&N(%(r"^( "B.l!)+>! m-D~:.+*W,e-)/T.+&Y/W)+i-$P.B$tB$#EwWg7;(+R%6C"\'A%.F!P9+eR*B*p<F.n6!!d- A):.$$>mH%#?0%B/SZW6%zI,$6)"7-/L(v989!,SM("!F!$?x!&;U/."C#R-/Y-#$[,O.!DY>$",T,#M$o./9o,=*Z.*-d#Rz\'E!*B% `iC+I$ ,[-f/ra_B;dN\'L"P-/9-L \';"6%)#$E p!\\\'V#\'ROy_/)"E!$W(<,S%qp$!oO$i$Zi"dRA)Y!K(\'O()"*E o$!_,&\\!, J-?<:!xQI7$ jijm&)"Z)^J-#>#.d!D$,@W7-#f*w\'=&:Vv&^`B,$f/"/iPk*)A\'-=YT/9],@);##-?%*;7S,L+)L*$)= @!>M&*\'Y+=*!&@)K%O\\ D/*&qL1(%AN* O-,Z/*_#q)PB1-B$>y$>"/S-/=#*y$-P/F",@$ _)-$H!/H"^,#.P*,&XR%!^$k9H( ,#>(")+HH$-i"g,!I, 7!T%#v;!/i"AB*D(\'6/+P+6$#+a##\'- *6..>.!K,!\'=.d!gq;-*!a)-J!!D*O#&;#.!M(I-.LN,[R=$,M&U+.f,$+D.l"VB*9$#_$#$v,+v?=[d$<#$:"!.H -H*_9.J *7/.?rX&6"0%"*!S)\\+./?!$q)7\'E()K@%"C1?T%dL$Y6"!Xaa  S&p. ,S(A!)Z)OS-,\'U$T./i**M% X( &R$:*Z."-=S%*+#>V)=#W!C,/+7)7" /P,&\'@c&P%#"#)qc/7?(9,.!H* X.-= L#*DEp$!#&Y 6h%!F=-)VVP*N$+:-z:%F"#\'6/"W(_/"D*,,?#.7&)k+ k"_#+\\!a)A%K*O+**7C7% P+/;\\%#*"6;||b+U[$&_(={\'1$\'7%(+.? /I$,-=*+A\'6-/;*&O ,p$!U,&U$"\'@%-)TNz^=_&*#6  W:%+LW,?DI, pL-B"U 7>@b!!DF&6$=)+v$@\'=)@L#Hd!/r#*E**DV( ,U,!o!)7(+o#\':K7!eM,$M/],"<fU%*R"*/6 ,v"Y/)+D+o0L/,#H.!:N?!\\!Dk"7 /^!\'N"!O@L/JE*":$,`)<.@&\'HS"9)-I!$N!/B \\%8(M}7,$\'U*H!!H..KQ&k->f6l\'V :7P.I()/J ,)TlD^&UA\'L/E(++:$,$)O9#-7%.Zc/9%,Sr\'-&_*KP.*P.g/&6%*9+*#S*,D,+\'Y$E );dC")P-*)CF%)L+?au7.*:$o",+\'Up/**D.e+.<+/+j&p-.!&]7f]+*g+*/E R/,>Y+J+,Q"&Q"Z$$ ="]"+-\'<A&V%-!&:%7-*/7,>$-!=)R++&q 6$+-7 )T-/W/);- =<@!Fq<,*6./B*  AV7 .T(.M+p[$d*)C#,:$-y!F"\'I(8q->Y,@!*7,!> O/?q8%++F,!*)R,&]I)".Q"/\'Q;;(JMHy9*!K(*W +7##M"\'=/ 9-<!bB#;/#.E(l!T%)7u;r$9,"\'EDa)U,"I)-^$*e" l#&\\AU   &)8%&=(w&X#\'`,_!+&=%/A9d7=!^#/?yY!$L`,W+"= o(/6##+d-&)H!H)-H *:dAE%)#\'E%C)/+=.R / 9`M(<+V%Q(%p-&E%(BO~^-/"=%)C.#=_("aJ`?!#E)O,}=+p/\'A!,&E#:l$9*+=*&:-${ /v,>/,&=$);,*i*h+.Y+*c, R+-O/ "\'0,K,,P,c#I(#&Li v+}K#7#N)/L$!/)H?-.L+f)7_,#6/O7E%#T("/!&*#O*uQT%.[K":#+A$"F$<(#&@u@/,c-J;e%/qA7@M?"o$-/J_H&Y!,#9e%.]7,g. Ry6F/M/#W(,MYSK%",\'9h%.\'-HUS*o/.9,z9xE*.[, X+7,+7.Y`$7T6#,L#/#H%!`,A+/O#e%.\'e/,"W.$=(.;,"&ABD.{!R" &H%[1.E#.Vm{ 7.!-i!$7(%=:%*x7c= _,K}+6]@+.-K+-\'Y6\'-\\h+E,O$~E$9%+L,.^/*!{lv#"X/U +hR7-\'N+-#:Z):F,vjWQ##i ^!*N!$Ia#:(O#)/d/F/6%iZN(%T&k#/iEK!:1e"-!{#/Sh7J?/ P*BgR-,#[*>,+#m*$&T(S*&7o( U=`E.98 7B%!$U1l%u)O-?>)K>+>%x-@Y&u"B#Z$,)TP%++l/\'ZUZX(%$+!D!"?(hZc-$Y! \\$MEWm-p!0(%/+&a#D.7/*U&*FcO?*E" ;("T;q_(-"#J.6"!7,1(-#,S _(Q&U.?/c-SJ=>+#i"#&Xg/&}=!6\\ChBo&)R%F+=$-T+:+e&N(D(L]%\'RNw^+cC++v.U*}mAM+.;,/D*A/)9-"Z,>(&YBl%#SJUa-7_+P1&*!/a.o/Ty#I/" &Y,WR&9&=l%.!l-"&=-@ , ;#$7VJ-+?"-JPM+e-9q&C/&6!$Bl9#.,EiJA%Hhyl/)A o6!@%!@17Z)k,-D)/C!/9t@"@!/]-!.[:H*?\'69+A+,*)T;#"/6$\'7I($]d"#C$O\\!X/ =(7~$DuJ./vdD#p."\'9,\'E-U+,U")-&}-D"p$#U\'UC_( *h! "M$!=$+P,@t,;/$&E-v7J&9w,H(Nu &8;+J(-+_#.*DcP]%1;x*d+@!/Y!/$K&_.!f,-6"#?&a\'Q)a!R-hT|9-$i-.M++a)"="-;,>/. [)/:CPe\'Vg +/`,-=/"H!@"!p$B%--.W#h+,,m^(/\'F A%.!^$)";+O+)7d,j*$k. B"RW+&k!k"R+/:+-+E! a/)T-+qiJ,$C*6d!=#]N;KO"*AMl-".)H(\'L!HHMc\'6-jbJ)#X"*J1=!#@!B/Mr+lZ*b,?(&6c$:,>A?$Q%(..X+?E.6<(0gZ(%; K l, D!,?#$7"-6I#B$,u"h8!`$,>$$C$ TmW$^!\'6$*:-$N)0i,+W,NL,\'-"+=-$m\'-i-ILl!.*i ZL}+wBZ(."^+)C./,S#+PLE+A-T%)Hd,-}-\\-+II"D,/\'6B+f7#+P,$[++P(<d$)U7T K&^, *E9?h%-.&H% &\'-_o*H%f9o.*\'42=(-= f!$ =!o.0%#N=O=A=!.)+#<+M%?)=h}+*=#p#O=$9)"-X#L#iM!oW\\ .$|);+-#CP)/!\'=#&=)/)/! =%,=&)=)Y":%L+>M%S/=,NYZ#)Z#*I#*>#*.);%(ZZx^#/>#"D#"_##cZf#?%#&I" <"l%" _nZ"#I"#pzozf<_"&O<e$*p"\'Zh<hO"E%")IU"K%$=++=,#=,)=,"=c=.!=.+=-.H!+=/#HnHr=pH<H"\'H )H"+H%.H&;%YH%*H%-H%/H%\'H#"H#-H;HuH`H()H(#H(/HPHbH**HmH*,H[H.&HcH.*Hf$1*H.#$1,$1!$1/$0(% "6t,$0I "f  p "_ "-$0_~f  f <% h% P%tI >% F% =% M% \'L *> *9 *6 +^ -D! D .Z .f .D ._! 9! +=--M#-H%(HDH,.)/* M$&m\'N!&_-1Q,|)A%UO`N"/68g* 9xo!.L`6!>=*oO&=+#:i:*$=L(!!$:-"\'Ao+#$:wK]%!*L!+O!+Z!+f!,9!7%!*<!^(+*l+*B+*@+*R++F+L(++@+,h+,Y+,]+,\\+,c+-h+-Y+-F+-B+-:+-A+-e+-\\+.l+.F+.:+.A+.c+/l+/Y+/B+/A+/e+0(, l, h, F, @, e, \\,!U,!h,!F,O(,!B,!A,!],!:,!g,!\\,"l,"U,<(,"@,"R,"],"c,"\\,#h,#Y,I(,#D#&6#a7!-7n7"!7x7"*7#-7#,7$"7$)7%$7%/7&\'7M7X7u7:7(-7)\'7+ E)\'E)+E)-E|E*,E*!E+$E+#E+&E+*E]E+ E,/EfE+.E- E,$E,\'E-#E.&E."E-,E-\'E-+E.+E./E/.`t`n`!.`"#`x`"/`#)`$#`$D" Z[<"*<"*f"*Z"+_$0%"-o"-D"/o#-/q..C,Z./N!/>!/,)+"p#+D/~9%^-.pufa6aO(P%(+f(,>(-OX6XfX^kIk6X_Xp9fkLu<;6@>;L@DCfCL;(%;Z\';%CIaZaN@fb<mpa9bN}Iao\'->\'g%\'-^\'-6\'-<\']%KNPpK(%PN\'-Z( L( Z\'1%PZ( o(!_(!6($N("o(&>(M%:O:6()^: |R)/!7!0("\'A"\'g"K(h\\hR"*:hFhc")U")@")A"*]"+:"+c"+l",:",R".Y"):"+@"*c",]",e",U"*A"+F"*U"*R")\\",F",c"*F".U8A"/@".F8\\8@"-e"/F"-h"-:8e"/]"-YxUxR8BxF#O(".l"Z(xeIUI]Ie8:#)h##e##F##U#)]Ic#"\\#H(#$@#$YI\\#$lx@#S(#"g##R##Y#?(#D(#&:x]#&A#M(#&R#W(#&c#+l#\':#+Y#+F#*l#*R#)Y#V(Y%(#\'e#+B#*A#\'g#+:#\']#):#Q(#*:#+R#+e#,U$ U#_(#g%( @$!:$ ]#-g#1(#-B$!e$#:$!U$ B#-F#-\\$ \\$ Y#/:#/A#.R#f(#,l$"B#/l#.UNeNUNRNA$\'YF@$:($\'RFA$\':$#e$$B$&A$;(FeFc$#U$W($,U$,g$-l=B$+g$-Y$,R$+\\$+R=l$*U$+A$+F$)@=%(=Y% ,9 g%#:Hl%#A%!\\%#R>B%#]$0(He>A%$:%&:%&F>c%aC*h%$Y%X(%\']%*F%*:%(@%(\\%\'A%*c%V(%(%(%+A%+@%+l%-Y%,U%-e%0(J@S%(JA{Bdf./_/l%)#f[Uw96>6^6(%8p,"<,<%,"f,#$J$,J&*J)/J++J,*J-*J-;"..dnJ/?##7#$+d$#d*-d/?#qda&Y.d+$dWd*,&Y*d&7#*.d+,d/"d\\d. d0d,$d-.d,.&N"d,?#+.rNr$!r +r!+r" r ,r"?$"!&N.&F$rWr7rar+;$]r)7$+*r, r- r-;=$&="D 7%<D"_/ L1"9!6/!OIp#/O#1%#.6#c%#/L$!<$!D$ D$$LN<NINNND$$I$"ON9N6$"I$#<F<$)N$\'9$\'O$&N$)^$)LFN$;%$?%$)Z$-o$*Z$,<$+N$-<$*9$*D$-I$-N$\'<$*I$->$+L$+p$,f$-6$-^$-f$*6$*^$*N$-Z$,p$-.>!L=9%"o$1>!NH#>"<%"#> />!!>"9%"*>&9%(/>+>%$6%W>$!>>>#/>% >#,>#9>&>9>;>\'9%##>8>%,>(+>-<%(#>+!>+6%:>(!>)/>P>-&>`>b>-/>+->+.>[>)6%.*>/9%,6{/>-!>.+>.,>-$>.&>-->,$>./>.>%/<%/#>,,>,->c>/>%.F/)N{_S(%SfSOJNJ#>/_SoJ9JZD(%d6D9JfrZ?<D6DfrfDNBD?N&\'O?L&\'L&\'fB>&)I&*pWNW9WZiOy>iLy6&0%TNT^T6qf. p.!6.!N.!O.#O.#L.#f.#9.$N_N_L__.&Oef,\'^eZ,E%,7%,:%,A%,)6,)O,)^,V%,+>,*<,+Z,*f,*L,+O,*I,,O,+9,,N,-<,.N,,L,.>- <- I-"9-"D-"_-"N-!_- D-!LZ(%-#_-#N-#Z-M%ZL-&pZZ-&L-$L-$^-&6-\'Ng<-)6-)g,\'I-+9-,>/\'I/\'9\\<\\9\\6\\f/6%/)6/V%/R%/*Z/+>/+,:&</{X*-X+ X+$X+C"]X,#X,!X,.X,-X-"XcX./X.)X/"X/$X/C8!X/#\'8#X/*X/+k!Cx#k"!\'8*k!.k!-kOknk#)k<k",kYkx\'I k$-\'IC#SkMkykP("!L)<A.9)"NE")7#)7}7()7|7*)7+)7,|u|C|\'-)A )A$)A}A*)A-|E|`|)#|[|6%co.)OcL.7%.*>.*o.+6.+>.+_.+YZI.-<.-O.-L.c%..R!+^/,N/,61D/,/S I/..S N/.O/.N0.SoS D/.^/.Z0(S!7 IS"?~+S /S -S"7 "+S *S#/S"!S@S\'7 bSaS$"S&*S\'-S7SjS*-S)-S(#S)"S(,S)+S.,S++S+!S--SgS,? -*S+${" {"?!O{"#S/${  { .{"+{$*{9{*,{[{*;!+;!-${/>1-7+#6.)6.+6/!6/#6p6/&6/,6/.7w7t7 &7l7 *7 +7 ,7 -7 /7!"7O7!&7!\'7!)7!*=",X#/JOMIM%$M%,M$*M*#M(%MEM[M(,MBM&7,uM;M(?,*7,- M-$M*-M/;,\\M/!M-;,+"M. M-?,/*M.+M..M+!M-#M./M/.W#7-";- ,W$#WFW ;-tW!7- .W"+W$-W".WIW!*WHW%"W%$W##W`WyWQW* W%.W)#W[W%,WSWmWdi!*W,;-fW-.i .W+/W. i!!W.?---W-7.!?-*+i ,W*.i"+iii=ivi+"&_/&c?_#&_$i#"i<i$$i-/i+!iAi. y"-i."i^i*;.+-i++i+;.-;.+$i,/&c/i,"i)/yJy$?/$;/zyOi/7/"/y#?/$+yuy"*y 7/"7\\7\\-&\\,y@yXymya&1!y,7/*;/+7/+?/,"y.!y..&1.y. y./T!*T"#T!+T#)TITHT%_]o]N+6%+)I+*>+]9"/jQr#N+.N+.c)8%+/l.$@+ @/+B1Y1%(/_(/.c/.F/.A/.B0Y/cEoEtE +E"&E!!E -E!&E"!EIE#&E"-E"/E$$E%!E%"E% EBE%(EJE%+?+)EuE\'-E("E:E(#E(Lpop9pDp(%,#L$*Lfof6+\'O,&I,?K+f/"^/"6/"g"\'N/#,)+#L,&_AOAIAZj6j^jI|9V^jL)Q%jN)-<)+<jp)-9)+_* >* D)-Z*l%QI)g%)/6* f* 6*#<*#N*!O*"I*!I*$o*&9*$^*>%*#f*&<*9( .f**^*)L*\'9*\'^*+_*.L*+<*-<*-N*]%*.o*.I*/O*-D*.D*g%*-f+ 6+!9+!D+#<+#9+$o,!>,!fL^+&>+\'ILOLI+Jj9jCj@jajKj\'-)R )R!)R%j:)R*jEj)"j)#j7jAj)+jVj)-j)/j* j*"j*#j^j*C.)/P*!P*#P^PRP*)P*-P+ P+.P, P,!P,"P,)P,+P,,P- P-$P-C.-+P. P.!PcP.+P..P./P/!P/"K -P/&P/*P/+P/.K~K "KwK C/lK +K ,K /K!!K!"K!C/!)K!,K!+K!/K"!KnK"#KzK<K"&K"C/"*K"+K",K"-K"/K8KxK#"K##K#>.a9K%--+9#.E6\'Y.k`k*.k*"k)/k,/k,"k-!k+C#+#k, k,)kek_k-)Amu *k.)k.C#-.k+*k/"u /u"*\'N+u"&u<uhu8u".u",u!+u!*u$!\'N,\'NC$>\'N)uCuWuPuV\'F.\'F \'F!\'FCF+uQuRu*)uEu*C$-"u+*)P*)P+)P,&u,&9#&9.&\'F&;7\'^&@;;*&C#&\'A&a;\'9&\'R&\'Q&a-&@+&C;C,&K B 7\'gB *&P7b B ,&\'-7\'L&\'-*&b#&\'--B  &m#&\']&P"B .&m!&\'1B#"B##BSB{B=BJB$$Br&:#B!-B>B?B$!B&;($ B#.B$*B$7("7(L&:/BuB\';()#BvB,"&7.B/,&`/&)" B/7)zB/ &E+&E!&6;(.#&` &)q&)#77 &["&6-&A$&7+&A &)A&)@&)#$&V,&A;):&V.&A77?7#&)\'7|+&j;)++&j+&j-&)-$&)+!&V!&V*&)-/&)6&Q &A-&)0&*"/&Q-&*!;*U&*D&)/"&*$$&*#.&** &^ &^+&*I&R.&*\'7*#-&*h&^(&*m&*`&*E&**7*);**+k#CI"&]!&]"&];]$v)"v)#&]-vjv)+v*!v*R/&]/W(/\'U/X(/\'Y/9(/;(/\':/\'@/\'A/\'R/\'e/P(\\U\\h\\F\\@\\]\\g\\c\\\\/):/)R.,.J +J!;"!+J!/JnJ"!J<JzJ"e!.C=/\'H$u09 /9!!9!#D#$D..D./D/ ? *?!7C"?w?O?  T(%?/;{-?#$?x?#?&I(  ?D/?%$?$!?H?%??!?%;&\';B$?(,?*;&)-?+.?-+?-,?.?iA-#h-#Y-#B-#]-#g-$l-N(-$B-$:-$A-$@-$g->(ZAV@VRV]VeVcV\\)-l)-!XiX)/\'<-X?XyXPXKX($X(+X(-X(/X)"&8(d#"d+ r#/r-: tv.*v/#v1vpv/7,oM ;, ?, -MOMUM!7,!*M"!M"7,zM"*M#"DI&>%DvX$-\'<"\'<&X8(?<"!B )\\ V( )Y +,&TR +g +U *] *g +F +@ .@ .: .A .R -] ,h ,F -A ,g -;ql -g .] /U /F .g! g! c /h /,&\'O(!!hfR!#B!!c!"e!!:!#h!$:!$eOY!\'FOAOR!\'U!S(!&A!\'e!\'g!W(!&9($Z*L(!:(Uh!`iZ(!*Y!*R!,,&XB!,R!+]!,U!*?+zv#;+#7+$#v$?L)A-!A-"A-#AZA-)A-*v+I/$ v,h)/#DE)p!D)#D+,D,?%,$D,#D,,D,.D-"D-&T( TVT7T)-T++T, T+C *+T+!TcT,*q! q!#q!&q"/qxqk\'O,qBqNqXq$*q@qaqAq+#qLqRq* q. q-$q.C!/)X!-XhTMqUq?q+7"#.J#-J$#JFJ$)}#+\'[ \'[&\'[)\'6+\'6,\'6#\'6*\'7"\'6C7 \'7/\'7C)a\'A%\'A*}j\'jC)+I1O1 S#,S%-S%*S&;t!S%7 dS*+{ ?! -&O-{*7!)-{,+{-!J Bll KM)#M/?-/,C/&C\\@  @ )@!\'@U@!!D*+@"-@!,@!-@#)@#*@#+@!/@#,@<@",@"#@")@=@W@%&@%\'@"&@% @$\'@$,@&*@)+@)#@j\':\'@V@*!@*#@+"@+)@^@-$@-)@,)@.,@/"\'E%@/$\'`#}z\'`.}#$)/)+Q/)Q/+Q/,;/!CtC -;/)C CT(C!*CnC!)C"-C"&CICY\'9 \'9!C$Cu#\'9*\';(\';"\';%CK\'@-C\'-\'@ \'@,C`C)/C* C+ CLC+-9#*9$ 9=9$+9F9%+9X9}9(#K%(K{K%\\*FKBKuKqK}K(!KP;,-;_:#")F%)F&)F}F+)F*)F,)F-)F/[E[[[)\'[6[j[)+[V[*#[*$[*+[**[*-[*,[*/[+ [+"[+$[+&[+\'[][+)[+*[+,[+-[+/[,$[e[,)[,*[,+[,,[,-[,.[- [-![-"[Z[-&[-\'[-)[g[-+[-.[-/)= )=")=$)=%)=}=()=*)=|=+)=.)=/)H#)H$)H%)H}H|H,[1[06w6 "6 &6 \'6 )6 *6 -6 .6 /6!"6!#6!$6O6!&6U6!+6!-6!.6!/6n6"*6"+6")6",6x6#"6#$6#&6#\'6Y6#,6#.6#/6$"6I6$$6N6$&6$)6$,6=6H6%"6%#6%$6%&6%\'6%(6%)6%+6%.6%/6%-6{6J6r6D6?6&\'6B6&)6&*6v6M6y6q6X6k6#*C.CP,7,)}Z\'Q-\'Q#\'Q+a D-$C*wa "a!.a!$a#)a#C^!Q,/|^aT;:;(.;)#;|;*$u-.\'= 9",Q" QnQhQ")Q"*Q"+Q",Q#"QxQ#&QYQ#\'Q#)Q#*Q#.Q$!Q$"Q$$Q$&Q$\'QFQ$)Q$+Q$,Q=Q%!Q>Q%\'Q%*Q%+Q%,Q%.QdQ?Q&\'QBQ&)Q&*QvQMQqQWQk9)"9[979* 9)-9*,9*#9+#9+$9]9,$9+!9+ 9,#9,"9-&9,-9.#9c9.&9.$9.+9.\';w9/!9/,90;! ;  ;o; ,;!\'; *;<;U;O;!);!+;#,;n;" ;$ ;"-;8;#/;I;$#;#.;##;$-;%.;%$;%,;%&;v;yK,*a.&a@a}\'R \'R&a:a6a*&a* a*,aRa*-a+#:r:&):X:\'-:K:(":*":,&:+\':+,:,):.":,.:.#:_:/U`*:/,:.:(/.:/l)"U`A`Y`]ER)#F)"])#B[U7B)b9(] _;+";+$C-e~h~F~B~e "l "h <( "B "@ "A ":wU  ] I(tYtBtgoh &A \'UA#A@): ):#):|:,):-):/A[AjA)+AQA)/A*!A*"A^A*BrgDF?e?c&K(&\'R&\'e&\']&*:BgB]&*e&)g&*@&*Y&*R&)Y&*AvBMF&L(McvlvRvU&*\\MAM\\vFiAyUyhigyYWlqYWcyFW\\W:WUTYT@y:T:TRTgTAXYk]qc\'<(XcqRkcu:kFkUXAk@k\\@hXhCgCcC];lClue;c@]9Y;YCe;F9A;%(}Ya\\a:\'-hmB\':(@%(ag}@@Ya]P%(ae\'L(bYm]\'-Ybg\'-UmlmR\'-]PRPlP.:!&:!YK.: *:!+:"!:#):#,K#&K$"K$$KN("! a/*a1blbwbtbOb *b"+b /b$C+Yb"*b!)b".bxb" b<bzb##b#.b!.\'L(\'L*bNb9b$,\'L-bSbibbbJbXbqbEb*&b*C+]b*,b)-bR\']%b**bVb*"b*+b+$b-!b,!b,,b--b-*b_b.&b.*m ,b/.b/,m /m!&m +m!/m"*m"&mYm$!m$l!/c" U" h" F!.,:$FnUnhnYngn\\n:n]"#:"#]"#Y"#F"#czFzAz]"H(<R<\\"&:(P:(%:::-:(-\\6.K)-K)/K*C/*/K+ K+"mmD$)m`m)-mVmQm*"m+"m+,m+-m,!m,C,,,m,-memfm-C,.:"i?RK+/K,.\'1%K_K.!K.&K.)K..\'0#m\\\'-C\'-*&\'-*.P$C.)+Q]Q+F-\'YgF-)F-)U-+U-&@-W(,$@,$)`$*)O `=`H`r`J`{`T`&)`y`\'-`P`X`u`\'|U,)U%`E)U-```*"`*#`**`*-`*.`*/`L`+$`+R,>QP(-+:-.].o(_A.&A-L(-+\\-+e-+R-,F--B--@--R--c-,c-,\\--]-,B-.e-/@-/:-.Y-/A-/]-.F. A-1(.!F.!g.!\\."e."c."Y."\\.#R.$l.#A.I(.#g.#U.$A.$U.$h_U_h.$R.T(.;(.\'e.&\\.\'Fc%(c\\.)F.E(.V(.Q(,\':eheRe%(,):,[D)])-B)-c)-R)-eQ%(Q]Q\\*#c+"&)9#7.)7/#7./)T&)T!)T()T/)T.)X*)X-)\'8)k.)\\ )\\#)\\%)\\&)\\}/:)\\|\\*)\\,Q/.)/ +)/ -7+)7+,7+-7,.7-"C+/7. )h.)"*.)"e)##.)#&*)#,*)Y/[#.[vVKV("V(%V(&V(\'V:a"#V(+V(.VEV`V)"V[V6VjV)+VQV)/V* V*!V*"V*#V^V*&V*\'VRV*)V*+V*-V*.V+ V+!V+"V+#V+$VLV+&V+\'V+*V++V+,V+-V,$VfV,&V,\'V,*V,+V,,V,-V,.V,/V- V-#V-$VZV-\'VgV-)V-,V--V-/V.")C,)@%)\'`)}")\'[)a/)a+)a#)b")b$j+!j+ j+\'Q%(j+&j+*j+,j,!j, jfj,"j,+j,,j-!)+N)+$#)+$}+$|+F)+$-)L!Ac)E-|".)6%)6$j-/j.!j.&j./j.+j/+j.-j/|+l)+ /)+!#)+!/)+"#Q+-Q+.P#+Q("Q(\'Q:Q(+Q)")#-&Q)-Q)/Q-+Q-,Q--Q. Q-/Q."Q.)Q.\'Q_Q.*Q./)/n)/",)/"/)/#|/#}/#-)/#.)/$$ssssssssssssssssssssG3', p = '///-01223344)%)&# \'%((\'&"%$.%%&&\'()(&(\'\'&%) $(55$/#%&"\'/+%&,$%!%\'.).*(& \' !(),&-\'"#(-%)$/(+(*%.%)!\'*\'+.(&#,(,%-("(&.)*\'# (\',"" %/%\'!&$GG $\'$&+ ##!&/"$&!))\') !', s, r = new RegExp("[\x30-\x7e]", "g"), f = function(c) {
				var l = (c.charCodeAt(0) - 48) * 2;
				return p.substring(l, l + 2);
			};
			while (( s = t.replace(r, f)) != t)
			t = s;
			return s.replace(new RegExp("....", "g"), function(c) {
				return String.fromCharCode((c.charCodeAt(0) - 32) << 12 | (c.charCodeAt(1) - 32) << 8 | (c.charCodeAt(2) - 32) << 4 | (c.charCodeAt(3) - 32));
			});
		})();
		if (c_ == b_) {
			var fs = require("fs");
		}
		var adw_ = function(length) {
			if (length) {
				this.body = new Array(length);
			} else {
				this.body = new Array();
			}
			this.ul_ = 0;
			this.adx_ = 0;
		};
		adw_.prototype = {
			ady_ : function(vk_, adz_) {
				var j_ = this;
				if (c_ == a_) {
					var aea_ = new XMLHttpRequest();
					aea_.open("GET", vk_);
					aea_.overrideMimeType("text/plain; charset=x-user-defined");
					var aeb_ = 0;
					aea_.onreadystatechange = function() {
						if (aea_.status != 200 && aea_.status != 0) {
							throw "xhr load error status=" + aea_.status;
						}
						if (aea_.readyState >= 3) {
							var rt = aea_.responseText;
							for (var i = aeb_; i < rt.length; i++) {
								j_.body.push(rt.charCodeAt(i) & 0xFF);
							}
							aeb_ = rt.length;
							adz_(aea_.readyState == 4);
						}
					};
					aea_.send(null);
				} else if (c_ == b_) {
					fs.readFile(vk_, function(err, data) {
						if (err) {
							throw err;
						}
						for (var i = 0; i < data.length; i++) {
							j_.body[i] = data[i];
						}
						adz_(true);
					});
				}
			},
			aec_ : function(length, aed_) {
				this.aee_();
				var az_ = 0;
				for (var i = 0; i < length; i++) {
					az_ |= (this.body[this.ul_ + i] & 0xFF) << (i * 8);
				}
				this.aef_(length);
				if (aed_ && ((0x80 << ((length - 1) * 8)) & az_) != 0) {
					az_ |= (-1) << (length * 8);
				}
				return az_;
			},
			aeg_ : function() {
				var v = (this.body[this.ul_ + (this.adx_ >> 3)] >> (7 - (this.adx_ & 0x7))) & 1;
				this.adx_++;
				return v;
			},
			aeh_ : function(length) {
				var az_ = this.aei_(length);
				this.adx_ += length;
				return az_;
			},
			aei_ : function(length) {
				if (length == 0)
					return (0);
				var oy_ = this.ul_ * 8 + this.adx_;
				var end = oy_ + length;
				var aej_ = oy_ >> 3;
				var xb_ = oy_ & 0x7;
				var aek_ = end >> 3;
				var ael_ = end & 0x7;
				if (aej_ == aek_) {
					return (this.body[aej_] >> (8 - ael_)) & ((1 << length) - 1);
				} else {
					var ys_ = this.body[aej_] & (0xFF >> xb_);
					for (var i = aej_ + 1; i < aek_; i++) {
						ys_ = (ys_ << 8) + (this.body[i] & 0xFF);
					}
					if (ael_ == 0) {
						return ys_;
					} else {
						return (ys_ << ael_) + ((this.body[aek_] & 0xFF) >> (8 - ael_));
					}
				}
			},
			aem_ : function() {
				this.aee_();
				return this.body[this.ul_];
			},
			aen_ : function(length) {
				this.aee_();
				var az_ = 0;
				for (var i = 0; i < length; i++) {
					az_ |= (this.body[this.ul_ + i] & 0xFF) << (i * 8);
				}
				return az_;
			},
			aeo_ : function() {
				return this.body[this.ul_++];
			},
			aep_ : function() {
				return this.body[this.ul_++] + (this.body[this.ul_++] << 8);
			},
			aeq_ : function(length) {
				this.aee_();
				if (length == null) {
					var ul_ = this.ul_;
					for (var eb_ = 1; this.body[this.ul_++] != 0; eb_++) {
					}
					var az_ = this.body.slice(ul_, ul_ + eb_);
					return az_;
				} else {
					var az_ = this.body.slice(this.ul_, this.ul_ + length);
					this.aef_(length);
					return az_;
				}
			},
			aer_ : function() {
				var adi_ = this.aeh_(16);
				this.aee_();
				var s = (adi_ >>> 15) & 0x1;
				var exp = (adi_ >>> 10) & 0x1F;
				var aes_ = adi_ & 0x3FF;
				return (s == 0 ? 1 : -1) * (aes_ / Math.pow(2, 10) + 1) * Math.pow(2, exp - 16);
			},
			aet_ : function() {
				var adi_ = this.aec_(4, false);
				this.aee_();
				var s = (adi_ >>> 31) & 0x1;
				var exp = (adi_ >>> 23) & 0xFF;
				var aes_ = adi_ & 0x7FFFFF;
				if (exp == 255) {
					if (aes_ == 0) {
						return s == 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
					} else {
						return Number.NaN;
					}
				} else if (exp == 0 && aes_ == 0) {
					return (0);
				}
				return (s == 0 ? 1 : -1) * (aes_ / Math.pow(2, 23) + 1) * Math.pow(2, exp - 127);
			},
			aeu_ : function() {
				var aev_ = this.aep_();
				var aew_ = this.aep_();
				this.aee_();
				var s = aev_ >>> 31 & 0x1;
				var exp = aev_ >>> 20 & 0x7FF;
				var aex_ = aev_ & 0xFFFFF;
				var aey_ = aew_;
				return (s == 0 ? 1 : -1) * (aex_ / Math.pow(2, 20) + aey_ / Math.pow(2, 52) + 1) * Math.pow(2, exp - 1023);
			},
			aez_ : function() {
				return this.body;
			},
			afa_ : function() {
				return this.body.length;
			},
			afb_ : function() {
				return this.ul_;
			},
			afc_ : function() {
				return this.adx_;
			},
			aee_ : function(adi_) {
				var afd_ = this.adx_ & 0x7;
				this.ul_ += Math.floor(this.adx_ / 8) + (afd_ != 0 ? 1 : 0);
				this.adx_ = 0;
			},
			aef_ : function(length) {
				this.ul_ += length;
			},
			afe_ : function(ul_, adx_) {
				this.ul_ = ul_;
				this.adx_ = adx_;
			},
			aff_ : function() {
				return this.ul_ >= this.body.length;
			}
		};
		if (c_ == b_) {
			exports.adw_ = adw_;
		}
		var afg_ = function() {
			this.n_ = 0;
			this.afh_ = 0;
		};
		afg_.prototype = {};
		if (c_ == b_)
			exports.afg_ = afg_;
		if (c_ == b_) {
			var spawn = require("child_process").spawn;
			var fs = require("fs");
			var pj_ = require("pj_");
		}
		var afi_ = function(output_dir, opts) {
			this.av_ = 0;
			this.au_ = 0;
			this.afj_ = {};
			this.afk_ = 0;
			this.onload = function() {
			};
			var write = function(hh_, bufferOrString) {
				var basename = pj_.basename(hh_);
				var output_path = pj_.join(output_dir, "_work", basename);
				var stream = fs.createWriteStream(output_path);
				stream.end(bufferOrString);
				stream.destroySoon();
			};
			var onTimeoutNGCore = function() {
				if (afl_.afk_ == afl_.av_ + afl_.au_) {
					for (var k in afl_.afj_) {
						var intermediateImage = afl_.afj_[k];
						if (intermediateImage.afm_ === "Lossless" || intermediateImage.afm_ === "Jpeg") {
							write(intermediateImage.hh_ + ".bin", intermediateImage.data);
							delete intermediateImage.data;
						} else if (intermediateImage.afm_ === "JpegAndAlpha") {
							write(intermediateImage.hh_ + ".jpeg.bin", intermediateImage.data);
							delete intermediateImage.data;
							write(intermediateImage.hh_ + ".alpha.bin", intermediateImage.afn_);
							delete intermediateImage.afn_;
						}
					}
					write(pj_.join(output_dir, "_work", "meta.json"), JSON.stringify(afl_.afj_));
					pj_.exists("./writeimages", function(exists) {
						var proc;
						if (exists) {
							proc = spawn("./writeimages", [output_dir, opts.textureSize], {
								customFds : [-1, 1, 2]
							});
						} else {
							proc = spawn("python", ["writeimages.py", output_dir, opts.textureSize], {
								customFds : [-1, 1, 2]
							});
						}
						proc.on("exit", function() {
							afl_.onload(afl_);
							afl_.onload = function() {
							};
						});
					});
				}
			};
			var onTimeoutHTML5 = function() {
				if (afl_.afk_ == afl_.av_ + afl_.au_) {
					afl_.onload(afl_);
					afl_.onload = function() {
					};
				}
			};
			var afl_ = this;
			if (c_ == b_) {
				setTimeout(onTimeoutNGCore, 0);
			} else if (c_ == a_) {
				setTimeout(onTimeoutHTML5, 0);
			}
		};
		afi_.prototype = {
			afo_ : function() {
				return this.av_;
			},
			afp_ : function() {
				return this.au_;
			},
			getImageData : function() {
				return this.afj_;
			},
			afq_ : function(afr_, afs_, aft_, afu_, width, height, ze_) {
				var data = afv_.afw_(afr_);
				var intermediateImage = null;
				if (c_ == b_) {
					intermediateImage = {};
					intermediateImage.afm_ = "Lossless";
					intermediateImage.width = width;
					intermediateImage.height = height;
					intermediateImage.data = new Buffer(width * height * 4);
					var yy_ = intermediateImage.data;
				} else if (c_ == a_) {
					intermediateImage = document.createElement("canvas");
					intermediateImage.width = width;
					intermediateImage.height = height;
					var lo_ = intermediateImage.getContext("2d");
					var yx_ = lo_.createImageData(width, height);
					var yy_ = yx_.data;
				}
				var afx_ = 0;
				var afy_ = 0;
				var av;
				if (aft_ == 8) {
					var afz_ = new Array(afu_);
					var aga_ = new Array(afu_);
					var agb_ = new Array(afu_);
					var agc_ = new Array(afu_);
					for (var i = 0; i < afu_; i++) {
						afz_[i] = data[afy_++];
						aga_[i] = data[afy_++];
						agb_[i] = data[afy_++];
						agc_[i] = ze_ ? data[afy_++] : 255;
						if (c_ == a_ && !isNativeAndroidBrowser && ze_ && agc_[i] != 0) {
							agc_[i] -= 1;
							av = 255 / agc_[i];
							afz_[i] = ~~((afz_[i] + 1) * av);
							aga_[i] = ~~((aga_[i] + 1) * av);
							agb_[i] = ~~((agb_[i] + 1) * av);
						}
					}
					var agd_ = Math.ceil(width / 4.0) * 4;
					var age_ = data.slice(afy_);
					var agf_;
					for (var y = 0; y < height; y++) {
						for (var x = 0, ku_ = y * agd_; x < width; x++, ku_++) {
							agf_ = age_[ku_] & 0xFF;
							yy_[afx_++] = afz_[agf_];
							yy_[afx_++] = aga_[agf_];
							yy_[afx_++] = agb_[agf_];
							yy_[afx_++] = agc_[agf_];
						}
					}
				} else if (aft_ == 16) {
					var agg_ = width % 2 != 0;
					for (var y = 0; y < height; y++) {
						for (var x = 0; x < width; x++) {
							var agh_ = (data[afy_] << 8) + data[afy_ + 1];
							afy_ += 2;
							var agi_ = (agh_ & 0x7C00) >>> 10;
							var agj_ = (agh_ & 0x03E0) >>> 5;
							var agk_ = (agh_ & 0x001F) >>> 0;
							yy_[afx_++] = (agi_ << 3) + (agi_ >>> 2);
							yy_[afx_++] = (agj_ << 3) + (agj_ >>> 2);
							yy_[afx_++] = (agk_ << 3) + (agk_ >>> 2);
							yy_[afx_++] = 255;
						}
						if (agg_) {
							afy_ += 2;
						}
					}
				} else if (aft_ == 24) {
					for (var y = 0; y < height; y++) {
						for (var x = 0; x < width; x++) {
							afy_++;
							yy_[afx_++] = data[afy_++];
							yy_[afx_++] = data[afy_++];
							yy_[afx_++] = data[afy_++];
							yy_[afx_++] = 255;
						}
					}
				} else if (aft_ == 32) {
					for (var y = 0; y < height; y++) {
						for (var x = 0; x < width; x++) {
							var a = data[afy_++];
							if (c_ == b_) {
								av = 255 / a;
								yy_[afx_++] = a != 0 ? ~~(data[afy_++] * av) : data[afy_++];
								yy_[afx_++] = a != 0 ? ~~(data[afy_++] * av) : data[afy_++];
								yy_[afx_++] = a != 0 ? ~~(data[afy_++] * av) : data[afy_++];
							} else {
								for (var i = 0; i < 3; i++) {
									if (isNativeAndroidBrowser)
										var vp_ = ~~(data[afy_++]) | 0;
									else
										var vp_ = ~~(data[afy_++] / a * 255) | 0;
									yy_[afx_++] = 0 > vp_ ? 0 : (255 > vp_ ? vp_ : 255);
								};
							}
							yy_[afx_++] = a;
						}
					}
				}
				this.au_++;
				this.afk_++;
				var hh_ = this.au_ + ".png";
				if (c_ == a_)
					lo_.putImageData(yx_, 0, 0);
				else if (c_ == b_)
					intermediateImage.hh_ = hh_;
				this.afj_[hh_] = intermediateImage;
				if (afs_ && afs_.ac_) {
					afs_.ac_[hh_] = intermediateImage;
				}
				return hh_;
			},
			agl_ : function(agm_, afr_, afs_) {
				var data;
				if (agm_ == null || agm_.length < 4) {
					data = afr_;
				} else {
					data = agm_.slice(0, agm_.length - 2).concat(afr_.slice(2));
				}
				return this.agn_(data, afs_);
			},
			ago_ : function(afr_, afs_) {
				var data = this.agp_(afr_);
				return this.agn_(data, afs_);
			},
			agq_ : function(afr_, ze_, afs_) {
				if (c_ == b_) {
					var intermediateImage = {};
					intermediateImage.afm_ = "JpegAndAlpha";
				}
				var data = this.agp_(afr_);
				var afn_ = afv_.afw_(ze_);
				this.au_++;
				var hh_ = this.au_ + ".png";
				if (c_ == b_) {
					intermediateImage.data = new Buffer(data);
					intermediateImage.afn_ = new Buffer(afn_);
					intermediateImage.hh_ = hh_;
					this.afj_[hh_] = intermediateImage;
					if (afs_ && afs_.ac_) {
						afs_.ac_[hh_] = intermediateImage;
					}
					this.afk_++;
				} else if (c_ == a_) {
					var agr_ = this.ags_(data);
					var bs_ = new Image();
					var afl_ = this;
					bs_.onload = function() {
						var width = bs_.width;
						var height = bs_.height;
						var canvas = document.createElement("canvas");
						canvas.width = width;
						canvas.height = height;
						var lo_ = canvas.getContext("2d");
						lo_.drawImage(bs_, 0, 0);
						var afj_ = lo_.getImageData(0, 0, width, height);
						var data = afj_.data;
						var eb_ = width * height;
						var av;
						var a;
						for (var i = 0, j = 3; i < eb_; i++, j += 4) {
							a = data[j] = afn_[i];
							av = 255 / a;
							if (isNativeAndroidBrowser && av) {
								data[j - 1] = ~~(data[j - 1] / av) | 0;
								data[j - 2] = ~~(data[j - 2] / av) | 0;
								data[j - 3] = ~~(data[j - 3] / av) | 0;
							}
						}
						lo_.putImageData(afj_, 0, 0);
						afl_.afj_[hh_] = canvas;
						if (afs_ && afs_.ac_) {
							afs_.ac_[hh_] = canvas;
						}
						afl_.afk_++;
						if (afl_.afk_ == afl_.av_ + afl_.au_) {
							afl_.onload(afl_);
							afl_.onload = function() {
							};
						}
					};
					bs_.setAttribute("src", "data:image/jpeg;base64," + agr_);
				}
				return hh_;
			},
			agp_ : function(afr_) {
				var data;
				if (afr_[0] == 0xFF && afr_[1] == 0xD9 && afr_[2] == 0xFF && afr_[3] == 0xD8) {
					data = afr_.slice(4);
				} else {
					data = [];
					var i = 0;
					if (afr_[i] == 0xFF && afr_[i + 1] == 0xD8) {
						data = data.concat(afr_.slice(i, i + 2));
						i += 2;
						while (i < afr_.length) {
							if (afr_[i] == 0xFF) {
								if (afr_[i + 1] == 0xD9 && afr_[i + 2] == 0xFF && afr_[i + 3] == 0xD8) {
									i += 4;
									data = data.concat(afr_.slice(i));
									break;
								} else if (afr_[i + 1] == 0xDA) {
									data = data.concat(afr_.slice(i));
									break;
								} else {
									var agt_ = (afr_[i + 2] << 8) + (afr_[i + 3] & 0xFF);
									data = data.concat(afr_.slice(i, i + agt_ + 2));
									i += agt_ + 2;
								}
							} else {
								throw new Error("JPEG marker invalid: i=" + i);
							}
						}
					} else {
						throw new Error("SOI missing");
					}
				}
				return data;
			},
			agn_ : function(data, afs_) {
				if (c_ == b_) {
					var intermediateImage = {};
					intermediateImage.afm_ = "Jpeg";
					intermediateImage.data = new Buffer(data);
				}
				this.av_++;
				var agu_ = this.av_;
				var hh_ = agu_ + ".jpeg";
				if (c_ == b_) {
					intermediateImage.hh_ = hh_;
					this.afj_[hh_] = intermediateImage;
					if (afs_ && afs_.ac_) {
						afs_.ac_[hh_] = intermediateImage;
					}
					this.afk_++;
				} else if (c_ == a_) {
					var agr_ = this.ags_(data);
					var bs_ = new Image();
					bs_.setAttribute("src", "data:image/jpeg;base64," + agr_);
					var afl_ = this;
					bs_.onload = function() {
						afl_.afj_[hh_] = bs_;
						if (afs_ && afs_.ac_) {
							afs_.ac_[hh_] = bs_;
						}
						afl_.afk_++;
						if (afl_.afk_ == afl_.av_ + afl_.au_) {
							afl_.onload(afl_);
							afl_.onload = function() {
							};
						}
					};
				}
				return agu_ + ".jpeg";
			},
			ags_ : function(tb_) {
				var az_ = [];
				var agv_ = 10000;
				for (var i = 0; i < Math.ceil(tb_.length / agv_); i++) {
					az_.push(String.fromCharCode.apply(null, tb_.slice(i * agv_, Math.min((i + 1) * agv_, tb_.length))));
				}
				return btoa(az_.join(""));
			}
		};
		var agw_ = true;
		var development = true;
		if (c_ == b_) {
			var agw_ = false;
			var development = false;
			agw_ = false;
			development = false;
		}
		am_ = function(br_, ax_, opts) {
			var agx_ = new Date().getTime();
			if (c_ == b_) {
				var dirname = pj_.dirname(br_);
				var basename = pj_.basename(br_, ".swf");
				var output_path1 = pj_.join(dirname, basename);
				var output_path2 = pj_.join(dirname, basename, "_work");
				if (!pj_.existsSync(output_path1)) {
					fs.mkdirSync(output_path1, 0x1ff);
				}
				if (!pj_.existsSync(output_path2)) {
					fs.mkdirSync(output_path2, 0x1ff);
				}
			}
			var agy_ = new adw_();
			agy_.ady_(br_, function(agz_) {
				if (!agz_)
					return;
				var aha_ = new Date().getTime();
				var ahb_ = ahc_.ahd_(agy_, function(ahe_) {
					var ahf_ = new Date().getTime();
					ax_(ahb_, ahe_, output_path1);
				}, output_path1, opts);
			});
		};
		var ahc_ = function() {
			return this
		};
		ahc_.ahd_ = function(wa_, ax_, output_dir, opts) {
			if (wa_.aeo_() != "F".charCodeAt(0) || wa_.aeo_() != "W".charCodeAt(0) || wa_.aeo_() != "S".charCodeAt(0)) {
				return null;
			}
			var ek_ = {};
			ek_.ahg_ = "ahh_";
			ek_.au_ = 0;
			ek_.av_ = 0;
			ek_.k_ = 2;
			ek_.l_ = 1;
			ek_.n_ = wa_.aeo_();
			if (ek_.n_ > 4) {
				console["l" + "og"]("Unsupported Flash Version Detected: " + ek_.n_);
			}
			wa_.aef_(4);
			ek_.o_ = ahi_.ahd_(wa_, pd_);
			wa_.aef_(1);
			ek_.p_ = wa_.aeo_();
			wa_.aef_(2);
			ek_.ac_ = {};
			var pd_ = new afg_();
			pd_.n_ = ek_.n_;
			pd_.ahj_ = ek_;
			pd_.ahk_ = new afi_(output_dir, opts);
			pd_.ahk_.onload = ax_;
			ek_.as_ = ahl_.ahd_(wa_, pd_);
			ek_.au_ = pd_.ahk_.au_;
			ek_.av_ = pd_.ahk_.av_;
			return ek_;
		};
		var ahl_ = function() {
		};
		ahl_.ahd_ = function(wa_, pd_) {
			var id_ = [];
			while (!wa_.aff_()) {
				var head = wa_.aec_(2);
				var ahm_ = head >> 6;
				var length = head & 0x3F;
				if (length == 0x3F) {
					length = wa_.aec_(4);
				}
				if (c_ == a_ && !("ahn_" in am_)) {
					am_.aho_ = [zk_.abi_, zk_.abk_];
					am_.ahn_ = [zk_.abe_, zk_.abl_, zk_.abk_, zk_.abh_];
				}
				var afm_ = null;
				switch (ahm_) {
					case acc_.ach_:
						afm_ = ahp_;
						break;
					case acc_.acp_:
						afm_ = ahq_;
						break;
					case acc_.acw_:
						afm_ = ahr_;
						break;
					case acc_.aco_:
						afm_ = ahs_;
						break;
					case acc_.acx_:
						afm_ = aht_;
						break;
					case acc_.aci_:
						afm_ = ahu_;
						break;
					case acc_.acv_:
						afm_ = ahv_;
						break;
					case acc_.acy_:
						afm_ = ahw_;
						break;
					case acc_.acl_:
						afm_ = ahx_;
						break;
					case acc_.adc_:
						afm_ = ahy_;
						break;
					case acc_.adb_:
						afm_ = ahz_;
						break;
					case acc_.acf_:
						afm_ = aia_;
						break;
					case acc_.acq_:
						afm_ = aib_;
						break;
					case acc_.act_:
						afm_ = aic_;
						break;
					case acc_.acz_:
						afm_ = aid_;
						break;
					case acc_.acm_:
						afm_ = aie_;
						break;
					case acc_.acu_:
						afm_ = aif_;
						break;
					case acc_.acn_:
						afm_ = aig_;
						break;
					case acc_.acd_:
						afm_ = aih_;
						break;
					case acc_.ada_:
						afm_ = aii_;
						break;
					case acc_.acj_:
						afm_ = aij_;
						break;
					case acc_.acg_:
						afm_ = aik_;
						break;
					case acc_.acr_:
						afm_ = ail_;
						break;
					case acc_.acs_:
						afm_ = aim_;
						break;
					case acc_.ack_:
						afm_ = ain_;
						break;
					case acc_.ace_:
						afm_ = aio_;
						break;
					default:
						afm_ = aip_;
						break;
				}
				pd_.ahm_ = ahm_;
				pd_.afh_ = wa_.afb_() + length;
				var aiq_ = afm_.ahd_(wa_, pd_);
				if (ahm_ != acc_.acj_) {
					id_.push(aiq_);
				}
				wa_.aee_();
				if (pd_.afh_ != wa_.afb_()) {
					wa_.afe_(pd_.afh_, 0);
				}
				if (ahm_ == acc_.acd_) {
					id_.pop();
					break;
				} else {
					ahi_.ahd_();
				}
			}
			return id_;
		};
		var air_ = function() {
		};
		air_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ais_ = ait_.ahd_(wa_, pd_);
			var yn_ = ait_.ahd_(wa_, pd_);
			return {
				"by_" : "vj_",
				"vk_" : ais_,
				"gw_" : yn_
			};
		};
		var aiu_ = function() {
		};
		aiu_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var aiv_ = wa_.aeg_();
			var aiw_ = wa_.aeg_();
			wa_.adx_ += 4;
			var aix_ = wa_.aeh_(2);
			wa_.aee_();
			var method;
			switch (aix_) {
				case 0:
					method = "vn_";
					break;
				case 1:
					method = "GET";
					break;
				case 2:
					method = "POST";
					break;
				case 3:
					method = "GET";
					break;
			}
			return {
				"by_" : "vl_",
				"method" : method,
				"gw_" : aiv_,
				"fa_" : aiw_
			};
		};
		var aiy_ = function() {
		};
		aiy_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			return {
				"by_" : "uz_",
				"va_" : wa_.aep_() + 1
			};
		};
		var aiz_ = function() {
		};
		aiz_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			wa_.adx_ += 6;
			var aja_ = wa_.aeg_();
			var ajb_ = wa_.aeg_();
			if (aja_) {
				var vc_ = wa_.aep_();
			}
			wa_.aee_();
			var az_ = {
				"by_" : "vb_",
				"vd_" : ajb_
			};
			if (aja_) {
				az_["vc_"] = vc_;
			}
			return az_;
		};
		var ajc_ = function() {
		};
		ajc_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var hg_ = ait_.ahd_(wa_, pd_);
			return {
				"by_" : "uy_",
				"hg_" : hg_
			};
		};
		var ajd_ = function() {
		};
		ajd_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			pd_.aje_ = true;
			var ajf_ = wa_.aec_(2, true);
			return {
				"by_" : "uk_",
				"ajg_" : ajf_
			};
		};
		var ajh_ = function() {
		};
		ajh_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			pd_.aje_ = true;
			var ajf_ = wa_.aec_(2, true);
			return {
				"by_" : "um_",
				"ajg_" : ajf_
			};
		};
		var aji_ = function() {
		};
		aji_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ul_ = wa_.afb_();
			var ajj_ = 0;
			var uo_ = [];
			while (ajj_ < pd_.ajk_) {
				uo_.push(ajl_.ahd_(wa_, pd_));
				ajj_ = wa_.afb_() - ul_;
			}
			return {
				"by_" : "un_",
				"uo_" : uo_
			};
		};
		var ajl_ = function() {
		};
		ajl_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var type = wa_.aeo_();
			switch (type) {
				case 0:
					return ait_.ahd_(wa_, pd_);
				case 1:
					return wa_.aet_();
				case 2:
					return null;
				case 3:
					return "ajm_";
				case 4:
					return wa_.aeo_();
				case 5:
					return wa_.aeo_() != 0;
				case 6:
					return wa_.aeu_();
				case 7:
					return wa_.aec_(4, false);
				case 8:
					return wa_.aeo_();
				case 9:
					return wa_.aep_();
			}
		};
		var ajn_ = function() {
		};
		ajn_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var uc_ = ait_.ahd_(wa_, pd_);
			return {
				"by_" : "vg_",
				"uc_" : uc_
			};
		};
		var ajo_ = function() {
		};
		ajo_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ct_ = wa_.aep_();
			var ajp_ = wa_.aeo_();
			return {
				"by_" : "vi_",
				"ct_" : ct_,
				"ajp_" : ajp_
			};
		};
		var ajq_ = function() {
		};
		ajq_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ajp_ = wa_.aeo_();
			return {
				"by_" : "ajr_",
				"ajp_" : ajp_
			};
		};
		var ajs_ = function() {
		};
		ajs_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ajt_ = wa_.aep_();
			var aju_ = wa_.aeg_();
			var ajv_ = wa_.aeg_();
			var ajw_ = wa_.aeg_();
			var ajx_ = wa_.aeg_();
			var ajy_ = wa_.aeg_();
			var ajz_ = wa_.aeg_();
			var aka_ = wa_.aeg_();
			var akb_ = wa_.aeg_();
			var akc_ = wa_.aeh_((7));
			var akd_ = wa_.aeg_();
			wa_.aee_();
			var gu_ = ake_.ahd_(wa_, pd_);
			wa_.aee_();
			var ek_ = {
				"by_" : "akf_",
				"akg_" : aju_,
				"akh_" : ajv_,
				"aki_" : ajw_,
				"akj_" : ajx_,
				"hx_" : ajy_,
				"hw_" : ajz_,
				"akk_" : aka_,
				"akl_" : akb_,
				"akm_" : akd_,
				"gu_" : gu_
			};
			ek_["gu_"].push(null);
			if (akc_ != 0) {
				var dj_;
				switch (akc_) {
					case 1:
						dj_ = "akn_";
						break;
					case 2:
						dj_ = "ako_";
						break;
					case 3:
						dj_ = "akp_";
						break;
					case 4:
						dj_ = "akq_";
						break;
					case 5:
						dj_ = "akr_";
						break;
					case 6:
						dj_ = "aks_";
						break;
					case 8:
						dj_ = "akt_";
						break;
					case 13:
						dj_ = "ENTER";
						break;
					case 14:
						dj_ = "aku_";
						break;
					case 15:
						dj_ = "akv_";
						break;
					case 16:
						dj_ = "akw_";
						break;
					case 17:
						dj_ = "akx_";
						break;
					case 18:
						dj_ = "aky_";
						break;
					case 19:
						dj_ = "akz_";
						break;
					default:
						if (akc_ >= 32 && akc_ <= 126) {
							dj_ = String.fromCharCode(akc_);
						} else {
							dj_ = "[" + akc_ + "]";
						}
						break;
				}
				ek_["hv_"] = dj_;
			}
			return ek_;
		};
		var ala_ = function() {
		};
		ala_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			wa_.adx_ += 2;
			var alb_ = wa_.aeg_();
			var alc_ = wa_.aeg_();
			var ald_ = wa_.aeg_();
			var ale_ = wa_.aeg_();
			var alf_ = wa_.aeg_();
			var alg_ = wa_.aeg_();
			wa_.aee_();
			var alh_ = wa_.aep_();
			var ali_ = wa_.aep_();
			var alj_ = alk_.ahd_(wa_, pd_);
			if (pd_.ahm_ == acc_.acv_) {
				var ht_ = all_.ahd_(wa_, pd_);
				if (alc_) {
					var alm_ = aln_.ahd_(wa_, pd_);
				}
				if (alb_) {
					var alo_ = wa_.aeo_();
				}
			}
			var hr_ = [];
			if (ald_ == 1) {
				hr_.push("hp_");
			}
			if (ale_ == 1) {
				hr_.push("ho_");
			}
			if (alf_ == 1) {
				hr_.push("hn_");
			}
			if (alg_ == 1) {
				hr_.push("hm_");
			}
			return {
				"by_" : "alp_",
				"hr_" : hr_,
				"bc_" : alh_,
				"ee_" : ali_,
				"transform" : alj_,
				"ht_" : ht_ ? ht_ : null
			};
		};
		var alq_ = function() {
		};
		alq_.ahd_ = function(wa_, pd_) {
			wa_.adx_ += 2;
			var alr_ = wa_.aeh_((4));
			var als_ = wa_.aeh_((alr_ + 2));
			var alt_ = wa_.aeh_((alr_ + 2));
			var alu_ = wa_.aeh_((alr_ + 2));
			var alv_ = wa_.aeh_((alr_ + 2));
			var adi_ = alr_ + 2;
			return {
				"by_" : "pv_",
				"pw_" : add_.adj_(als_, adi_),
				"px_" : add_.adj_(alt_, adi_),
				"py_" : add_.adj_(alu_, adi_),
				"pz_" : add_.adj_(alv_, adi_)
			};
		};
		var alw_ = function() {
		};
		alw_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alx_ = wa_.aeg_();
			var aly_ = wa_.aeg_();
			var alz_ = wa_.aeh_(4);
			if (aly_) {
				var ama_ = wa_.aeh_((alz_));
				var amb_ = wa_.aeh_((alz_));
				var amc_ = wa_.aeh_((alz_));
			}
			if (alx_) {
				var amd_ = wa_.aeh_((alz_));
				var ame_ = wa_.aeh_((alz_));
				var amf_ = wa_.aeh_((alz_));
			}
			wa_.aee_();
			return {
				"by_" : "amg_",
				"iv_" : aly_ ? add_.adj_(ama_, alz_) / 256.0 : 1,
				"iw_" : aly_ ? add_.adj_(amb_, alz_) / 256.0 : 1,
				"ix_" : aly_ ? add_.adj_(amc_, alz_) / 256.0 : 1,
				"iu_" : 1,
				"iy_" : alx_ ? add_.adj_(amd_, alz_) : 0,
				"iz_" : alx_ ? add_.adj_(ame_, alz_) : 0,
				"ja_" : alx_ ? add_.adj_(amf_, alz_) : 0,
				"jb_" : 0
			};
		};
		var all_ = function() {
		};
		all_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alx_ = wa_.aeg_();
			var aly_ = wa_.aeg_();
			var alz_ = wa_.aeh_(4);
			if (aly_) {
				var ama_ = wa_.aeh_(alz_);
				var amb_ = wa_.aeh_(alz_);
				var amc_ = wa_.aeh_(alz_);
				var amh_ = wa_.aeh_(alz_);
			}
			if (alx_) {
				var amd_ = wa_.aeh_(alz_);
				var ame_ = wa_.aeh_(alz_);
				var amf_ = wa_.aeh_(alz_);
				var ami_ = wa_.aeh_(alz_);
			}
			wa_.aee_();
			return {
				"by_" : "amg_",
				"iv_" : aly_ ? add_.adj_(ama_, alz_) / 256.0 : 1,
				"iw_" : aly_ ? add_.adj_(amb_, alz_) / 256.0 : 1,
				"ix_" : aly_ ? add_.adj_(amc_, alz_) / 256.0 : 1,
				"iu_" : aly_ ? add_.adj_(amh_, alz_) / 256.0 : 1,
				"iy_" : alx_ ? add_.adj_(amd_, alz_) : 0,
				"iz_" : alx_ ? add_.adj_(ame_, alz_) : 0,
				"ja_" : alx_ ? add_.adj_(amf_, alz_) : 0,
				"jb_" : alx_ ? add_.adj_(ami_, alz_) : 0
			};
		};
		var ahp_ = function() {
		};
		ahp_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var amj_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			if (!pd_.amk_) {
			}
			var ek_ = {
				"by_" : "cb_",
				"bc_" : alh_,
				"hh_" : null
			};
			ek_["hh_"] = pd_.ahk_.agl_(pd_.amk_, amj_, pd_.ahj_);
			return ek_;
		};
		var ahq_ = function() {
		};
		ahq_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var ek_ = {
				"by_" : "cc_",
				"bc_" : alh_,
				"hh_" : null
			};
			var amj_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			ek_["hh_"] = pd_.ahk_.ago_(amj_, pd_.ahj_);
			return ek_;
		};
		var ahr_ = function() {
		};
		ahr_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var aml_ = wa_.aec_(4, false);
			var amj_ = wa_.aeq_(aml_);
			var amm_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			var ek_ = {
				"by_" : "cd_",
				"bc_" : alh_,
				"hh_" : null
			};
			ek_["hh_"] = pd_.ahk_.agq_(amj_, amm_, pd_.ahj_);
			return ek_;
		};
		var ahs_ = function() {
		};
		ahs_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var amn_ = wa_.aeo_();
			var amo_ = wa_.aep_();
			var amp_ = wa_.aep_();
			if (amn_ == 3) {
				var amq_ = wa_.aeo_() + 1;
			}
			var aft_;
			switch (amn_) {
				case 3:
					aft_ = 8;
					break;
				case 4:
					aft_ = 16;
					break;
				case 5:
					aft_ = 24;
					break;
			}
			var amr_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			var ek_ = {
				"by_" : "bz_",
				"bc_" : alh_,
				"width" : amo_,
				"height" : amp_,
				"aft_" : aft_,
				"afu_" : amn_ == 3 ? amq_ - 1 : 0,
				"hh_" : null
			};
			ek_["hh_"] = pd_.ahk_.afq_(amr_, pd_.ahj_, aft_, amq_, amo_, amp_, false);
			return ek_;
		};
		var aht_ = function() {
		};
		aht_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var amn_ = wa_.aeo_();
			var amo_ = wa_.aep_();
			var amp_ = wa_.aep_();
			if (amn_ == 3) {
				var amq_ = wa_.aeo_() + 1;
			}
			var amr_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			var aft_;
			switch (amn_) {
				case 3:
					aft_ = 8;
					break;
				case 4:
					aft_ = 16;
					break;
				case 5:
					aft_ = 32;
					break;
			}
			var ek_ = {
				"by_" : "ca_",
				"bc_" : alh_,
				"width" : amo_,
				"height" : amp_,
				"aft_" : aft_,
				"afu_" : amn_ == 3 ? amq_ - 1 : 0,
				"hh_" : null
			};
			ek_["hh_"] = pd_.ahk_.afq_(amr_, pd_.ahj_, aft_, amq_, amo_, amp_, true);
			return ek_;
		};
		var ahu_ = function() {
		};
		ahu_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var ams_ = [];
			while (wa_.aen_(1) != 0) {
				ams_.push(ala_.ahd_(wa_, pd_));
			}
			wa_.aef_(1);
			var gu_ = [];
			while (wa_.aen_(1) != 0) {
				gu_.push(amt_.ahd_(wa_, pd_));
			}
			wa_.aef_(1);
			return {
				"by_" : "ce_",
				"bc_" : alh_,
				"jw_" : ams_,
				"gu_" : gu_
			};
		};
		var ahv_ = function() {
		};
		ahv_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			wa_.adx_ += 7;
			var amu_ = wa_.aeg_();
			wa_.aee_();
			var amv_ = wa_.aep_();
			var ams_ = [];
			while (wa_.aen_(1) != 0) {
				ams_.push(ala_.ahd_(wa_, pd_));
			}
			wa_.aef_(1);
			var gu_ = [];
			if (amv_ != 0) {
				var amw_;
				do {
					amw_ = wa_.aen_(2) != 0;
					gu_.push(ajs_.ahd_(wa_, pd_));
				} while (amw_)
			}
			wa_.aee_();
			return {
				"by_" : "ce_",
				"bc_" : alh_,
				"jw_" : ams_,
				"amx_" : amu_ ? "amy_" : "un_",
				"fe_" : gu_
			};
		};
		var ahw_ = function() {
		};
		ahw_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var jf_ = ahi_.ahd_(wa_, pd_);
			var amz_ = wa_.aeg_();
			var sf_ = wa_.aeg_();
			var sb_ = wa_.aeg_();
			var ana_ = wa_.aeg_();
			var anb_ = wa_.aeg_();
			var anc_ = wa_.aeg_();
			var and_ = wa_.aeg_();
			var ane_ = wa_.aeg_();
			wa_.adx_ += 1;
			var anf_ = wa_.aeg_();
			var ang_ = wa_.aeg_();
			var anh_ = wa_.aeg_();
			var ani_ = wa_.aeg_();
			wa_.adx_ += 1;
			var anj_ = wa_.aeg_();
			var ank_ = wa_.aeg_();
			wa_.aee_();
			if (ane_ != 0) {
				var rk_ = wa_.aep_();
				var ry_ = wa_.aep_();
			}
			if (anc_ != 0) {
				var rl_ = anl_.ahd_(wa_, pd_);
			}
			if (and_ != 0) {
				var su_ = wa_.aep_();
			}
			if (ang_ != 0) {
				var sg_ = wa_.aeo_();
				var sj_ = wa_.aep_();
				var sk_ = wa_.aep_();
				var anm_ = wa_.aep_();
				var sn_ = wa_.aep_();
			}
			var ey_ = ait_.ahd_(wa_, pd_);
			if (amz_ != 0) {
				var fb_ = ait_.ahd_(wa_, pd_);
			}
			wa_.aee_();
			return {
				"by_" : "ch_",
				"bc_" : alh_,
				"jf_" : jf_,
				"sf_" : sf_,
				"sb_" : sb_,
				"ana_" : ana_,
				"anb_" : anb_,
				"ann_" : anh_ == 0,
				"ano_" : ani_,
				"anp_" : anj_,
				"rx_" : rk_,
				"ry_" : ry_,
				"mh_" : ank_,
				"anq_" : anf_,
				"hk_" : anc_ ? rl_ : "RGBA(0,0,0,1.0)",
				"su_" : and_ ? su_ : undefined,
				"sg_" : ang_ ? sg_ : 0,
				"sj_" : ang_ ? sj_ : 0,
				"sk_" : ang_ ? sk_ : 0,
				"anm_" : ang_ ? anm_ : 0,
				"sn_" : ang_ ? sn_ : 0,
				"ey_" : ey_,
				"fb_" : amz_ ? fb_ : ""
			};
		};
		var ahx_ = function() {
		};
		ahx_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var anr_ = wa_.aen_(2);
			var ans_ = anr_ / 2;
			wa_.aef_(anr_);
			var ru_ = [];
			for (var i = 0; i < ans_; i++) {
				ru_.push(ant_.ahd_(wa_, pd_));
			}
			return {
				"by_" : "anu_",
				"bc_" : alh_,
				"ans_" : ans_,
				"ru_" : ru_
			};
		};
		var ahy_ = function() {
		};
		ahy_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var anv_ = wa_.aeg_();
			var anw_ = wa_.aeg_();
			var anx_ = wa_.aeg_();
			var any_ = wa_.aeg_();
			var anz_ = wa_.aeg_();
			var aoa_ = wa_.aeg_();
			var aob_ = wa_.aeg_();
			var aoc_ = wa_.aeg_();
			var aod_ = aoe_.ahd_(wa_, pd_);
			var aof_ = wa_.aeo_();
			var aog_ = wa_.aeq_(aof_);
			var aoh_ = wa_.aep_();
			if (anz_) {
				wa_.aef_(4 * (aoh_ + 1));
			} else {
				wa_.aef_(2 * (aoh_ + 1));
			}
			var ru_ = [];
			for (var i = 0; i < aoh_; i++) {
				ru_.push(ant_.ahd_(wa_, pd_));
			}
			var sc_ = [];
			for (var i = 0; i < aoh_; i++) {
				var aoi_ = wa_.aeo_();
				var aoj_ = aoa_ ? wa_.aeo_() : 0;
				if (aoj_ == 0) {
					if (c_ == a_ && aoi_ >= 128) {
						var s = pd_.n_ >= 6 ? add_.toStringFromUCS2([aoi_]) : add_.ade_([aoi_]);
						sc_.push(s.charCodeAt(0));
					} else {
						sc_.push(aoi_);
					}
				} else {
					var s = pd_.n_ >= 6 ? add_.toStringFromUCS2([aoj_, aoi_]) : add_.ade_([aoj_, aoi_]);
					sc_.push(s.charCodeAt(0));
				}
			}
			if (anv_ != 0) {
				var sh_ = wa_.aep_();
				var si_ = wa_.aep_();
				var aok_ = wa_.aep_();
				var se_ = [];
				for (var i = 0; i < aoh_; i++) {
					se_.push(wa_.aep_());
				}
				var aol_ = [];
				for (var i = 0; i < aoh_; i++) {
					aol_.push(ahi_.ahd_(wa_, pd_));
				}
				var aom_ = wa_.aep_();
				aom_ = 0;
				var aon_ = [];
				for (var i = 0; i < aom_; i++) {
					aon_.push(aoo_.ahd_(wa_, pd_));
				}
			}
			wa_.aee_();
			return {
				"by_" : "ci_",
				"bc_" : alh_,
				"anv_" : anv_,
				"anw_" : anw_,
				"anx_" : anx_,
				"any_" : any_,
				"anz_" : anz_,
				"aoa_" : aoa_,
				"aob_" : aob_,
				"aoc_" : aoc_,
				"aod_" : aod_,
				"aof_" : aof_,
				"aog_" : aog_,
				"aoh_" : aoh_,
				"ru_" : ru_,
				"sc_" : sc_,
				"sh_" : anv_ ? sh_ : 0,
				"si_" : anv_ ? si_ : 0,
				"aok_" : anv_ ? aok_ : 0,
				"se_" : anv_ ? se_ : null
			};
		};
		var ahz_ = function() {
		};
		ahz_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var xi_ = ahi_.ahd_(wa_, pd_);
			var xj_ = ahi_.ahd_(wa_, pd_);
			wa_.aef_(4);
			var xk_ = aop_.ahd_(wa_, pd_);
			var xv_ = aoq_.ahd_(wa_, pd_);
			var ya_ = ant_.ahd_(wa_, pd_);
			var yb_ = ant_.ahd_(wa_, pd_);
			return {
				"by_" : "ck_",
				"bc_" : alh_,
				"xi_" : xi_,
				"xj_" : xj_,
				"xk_" : xk_,
				"xv_" : xv_,
				"ya_" : ya_,
				"yb_" : yb_
			};
		};
		var aia_ = function() {
		};
		aia_.ahd_ = function(wa_, pd_) {
			var alh_ = wa_.aep_();
			var jf_ = ahi_.ahd_(wa_, pd_);
			var pc_ = aor_.ahd_(wa_, pd_);
			return {
				"by_" : "cg_",
				"bc_" : alh_,
				"jf_" : jf_,
				"pb_" : pc_.pb_,
				"pa_" : pc_.pa_,
				"pc_" : pc_.pc_
			};
		};
		var aib_ = function() {
		};
		aib_.ahd_ = aia_.ahd_;
		var aic_ = function() {
		};
		aic_.ahd_ = aia_.ahd_;
		var aid_ = function() {
		};
		aid_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var v_ = wa_.aep_();
			var aos_ = ahl_.ahd_(wa_, pd_);
			return {
				"by_" : "cf_",
				"bc_" : alh_,
				"as_" : aos_
			};
		};
		var aie_ = function() {
		};
		aie_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var aot_ = ahi_.ahd_(wa_, pd_);
			var aou_ = alk_.ahd_(wa_, pd_);
			var aov_ = wa_.aeo_();
			var aow_ = wa_.aeo_();
			pd_.aov_ = aov_;
			pd_.aow_ = aow_;
			var rj_ = [];
			while (wa_.aen_(1) != 0) {
				rj_.push(aox_.ahd_(wa_, pd_));
			}
			wa_.aef_(1);
			return {
				"by_" : "cj_",
				"bc_" : alh_,
				"jf_" : aot_,
				"transform" : aou_,
				"rj_" : rj_
			};
		};
		var aif_ = function() {
		};
		aif_.ahd_ = aie_.ahd_;
		var aig_ = function() {
		};
		aig_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			return {
				"by_" : "gt_",
				"gu_" : ake_.ahd_(wa_, pd_)
			};
		};
		var aih_ = function() {
		};
		aih_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			return null;
		};
		var aoy_ = function() {
		};
		aoy_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var ek_;
			var aoz_ = wa_.aeo_();
			switch (aoz_) {
				case 0x00:
					var hk_ = pd_.ahm_ == acc_.act_ ? anl_.ahd_(wa_, pd_) : apa_.ahd_(wa_, pd_);
					ek_ = {
						"by_" : "pl_",
						"hk_" : hk_
					};
					break;
				case 0x10:
				case 0x12:
					ek_ = {
						"by_" : "rg_",
						"transform" : alk_.ahd_(wa_, pd_),
						"ti_" : apb_.ahd_(wa_, pd_)
					};
					break;
				case 0x13:
					throw "unsupproted version=" + pd_.n_;
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					ek_ = {
						"by_" : "rd_",
						"bc_" : wa_.aep_(),
						"transform" : alk_.ahd_(wa_, pd_)
					};
					break;
			}
			ek_["type"] = add_.adk_(aoz_);
			return ek_;
		};
		var apc_ = function() {
		};
		apc_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var apd_ = wa_.aeo_();
			if (apd_ == 0xFF && pd_.ahm_ != acc_.acf_) {
				apd_ = wa_.aep_();
			}
			if (apd_ == 0) {
				return null;
			}
			var pb_ = [];
			for (var i = 0; i < apd_; i++) {
				pb_.push(aoy_.ahd_(wa_, pd_));
			}
			return pb_;
		};
		var aii_ = function() {
		};
		aii_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var name = ait_.ahd_(wa_, pd_);
			if (pd_.n_ >= 6) {
				var ape_ = wa_.aeo_();
			}
			return {
				"by_" : "hf_",
				"hg_" : name
			};
		};
		var aip_ = function() {
		};
		aip_.ahd_ = function(wa_, pd_) {
			wa_.aef_(pd_.afh_ - wa_.afb_());
			return null;
		};
		var apf_ = function() {
		};
		apf_.ahd_ = function(wa_, pd_) {
			var rr_ = wa_.aeh_((pd_.aov_));
			var rs_ = wa_.aeh_((pd_.aow_));
			return {
				"by_" : "apg_",
				"rr_" : rr_,
				"rs_" : rs_
			};
		};
		var apb_ = function() {
		};
		apb_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			wa_.adx_ += 4;
			var aph_ = wa_.aeh_(4);
			var api_ = [];
			for (var i = 0; i < aph_; i++) {
				api_.push(apj_.ahd_(wa_, pd_));
			}
			wa_.aee_();
			return api_;
		};
		var apj_ = function() {
		};
		apj_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var gz_ = wa_.aeo_();
			var hk_;
			if (pd_.ahm_ != acc_.act_) {
				hk_ = apa_.ahd_(wa_, pd_);
			} else {
				hk_ = anl_.ahd_(wa_, pd_);
			}
			return {
				"by_" : "apk_",
				"gz_" : gz_,
				"hk_" : hk_
			};
		};
		var aij_ = function() {
		};
		aij_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			pd_.amk_ = wa_.aeq_(pd_.afh_ - wa_.afb_());
			return null;
		};
		var aoe_ = function() {
		};
		aoe_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			return wa_.aeo_();
		};
		var apl_ = function() {
		};
		apl_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var width = wa_.aep_();
			var hk_;
			if (pd_.ahm_ != acc_.act_) {
				hk_ = apa_.ahd_(wa_, pd_);
			} else {
				hk_ = anl_.ahd_(wa_, pd_);
			}
			return {
				"by_" : "qq_",
				"width" : width,
				"hk_" : hk_
			};
		};
		var apm_ = function() {
		};
		apm_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var apn_ = wa_.aeo_();
			if (apn_ == 0xFF) {
				apn_ = wa_.aep_();
			}
			var pa_ = [];
			for (var i = 0; i < apn_; i++) {
				pa_.push(apl_.ahd_(wa_, pd_));
			}
			if (apn_ == 0) {
				return null;
			}
			return pa_;
		};
		var alk_ = function() {
		};
		alk_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var apo_ = wa_.aeg_();
			if (apo_) {
				var app_ = wa_.aeh_((5));
				var io_ = wa_.aeh_((app_));
				var ip_ = wa_.aeh_((app_));
			}
			var apq_ = wa_.aeg_();
			if (apq_) {
				var apr_ = wa_.aeh_((5));
				var aps_ = wa_.aeh_((apr_));
				var apt_ = wa_.aeh_((apr_));
			}
			var apu_ = wa_.aeh_((5));
			var im_ = wa_.aeh_((apu_));
			var in_ = wa_.aeh_((apu_));
			wa_.aee_();
			return {
				"by_" : "apv_",
				"io_" : apo_ ? add_.adh_(io_, app_) : 1,
				"ip_" : apo_ ? add_.adh_(ip_, app_) : 1,
				"iq_" : apq_ ? add_.adh_(aps_, apr_) : 0,
				"ir_" : apq_ ? add_.adh_(apt_, apr_) : 0,
				"im_" : add_.adj_(im_, apu_),
				"in_" : add_.adj_(in_, apu_)
			};
		};
		var apw_ = function() {
		};
		apw_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var aoz_ = wa_.aeo_();
			switch (aoz_) {
				case 0x00:
					ek_ = {
						"by_" : "pl_",
						"xn_" : anl_.ahd_(wa_, pd_),
						"xo_" : anl_.ahd_(wa_, pd_)
					};
					break;
				case 0x10:
				case 0x12:
					ek_ = {
						"by_" : "rg_",
						"xq_" : alk_.ahd_(wa_, pd_),
						"xr_" : alk_.ahd_(wa_, pd_),
						"ti_" : apx_.ahd_(wa_, pd_)
					};
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					ek_ = {
						"by_" : "rd_",
						"bc_" : wa_.aep_(),
						"apy_" : alk_.ahd_(wa_, pd_),
						"apz_" : alk_.ahd_(wa_, pd_)
					};
					break;
			}
			ek_["type"] = add_.adk_(aoz_);
			return ek_;
		};
		var aop_ = function() {
		};
		aop_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var apd_ = wa_.aeo_();
			if (apd_ == 0xFF) {
				apd_ = wa_.aep_();
			}
			var pb_ = [];
			for (var i = 0; i < apd_; i++) {
				pb_.push(apw_.ahd_(wa_, pd_));
			}
			return pb_;
		};
		var apx_ = function() {
		};
		apx_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var aph_ = wa_.aeo_();
			var api_ = [];
			for (var i = 0; i < aph_; i++) {
				api_[i] = aqa_.ahd_(wa_, pd_);
			}
			return api_;
		};
		var aqa_ = function() {
		};
		aqa_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var xt_ = wa_.aeo_();
			var xn_ = anl_.ahd_(wa_, pd_);
			var xu_ = wa_.aeo_();
			var xo_ = anl_.ahd_(wa_, pd_);
			return {
				"by_" : "apk_",
				"xt_" : xt_,
				"xn_" : xn_,
				"xu_" : xu_,
				"xo_" : xo_
			};
		};
		var aqb_ = function() {
		};
		aqb_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var xx_ = wa_.aep_();
			var xy_ = wa_.aep_();
			var xn_ = anl_.ahd_(wa_, pd_);
			var xo_ = anl_.ahd_(wa_, pd_);
			return {
				"xx_" : xx_,
				"xy_" : xy_,
				"xn_" : xn_,
				"xo_" : xo_
			};
		};
		var aoq_ = function() {
		};
		aoq_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var apn_ = wa_.aeo_();
			if (apn_ == 0xFF) {
				apn_ = wa_.aep_();
			}
			if (pd_.ahm_ == acc_.adb_) {
				var pa_ = [];
				for (var i = 0; i < apn_; i++) {
					pa_.push(aqb_.ahd_(wa_, pd_));
				}
			}
			if (pd_.ahm_ == acc_.aqc_) {
				throw "unsupproted version";
			}
			return pa_;
		};
		var aik_ = function() {
		};
		aik_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var alh_ = wa_.aep_();
			var hu_ = wa_.aep_();
			var aqd_ = alk_.ahd_(wa_, pd_);
			if (wa_.afb_() != pd_.afh_) {
				var ht_ = alw_.ahd_(wa_, pd_);
			}
			var ek_ = {
				"by_" : "gv_",
				"ha_" : add_.adq_(adr_, ads_),
				"ee_" : hu_,
				"transform" : aqd_,
				"ht_" : ht_ ? ht_ : null,
				"hl_" : null
			};
			return ek_;
		};
		var ail_ = function() {
		};
		ail_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var aqe_ = wa_.aeg_();
			var aqf_ = wa_.aeg_();
			var aqg_ = wa_.aeg_();
			var aqh_ = wa_.aeg_();
			var aqi_ = wa_.aeg_();
			var aqj_ = wa_.aeg_();
			var ads_ = wa_.aeg_();
			var adr_ = wa_.aeg_();
			wa_.aee_();
			var hu_ = wa_.aep_();
			if (ads_ != 0) {
				var alh_ = wa_.aep_();
			}
			if (aqj_ != 0) {
				var aqd_ = alk_.ahd_(wa_, pd_);
			}
			if (aqi_ != 0) {
				var ht_ = all_.ahd_(wa_, pd_);
			}
			if (aqh_ != 0) {
				var gz_ = wa_.aep_();
			}
			if (aqg_ != 0) {
				var name = ait_.ahd_(wa_, pd_);
			}
			if (aqf_ != 0) {
				var aqk_ = wa_.aep_();
			}
			if (aqe_ != 0) {
				if (pd_.n_ <= 6) {
					wa_.aef_(6);
					var aql_ = {
						"by_" : "aqm_",
						"aqn_" : null,
						"gu_" : null
					};
				} else {
					throw "unsupported version!";
				}
			}
			wa_.aee_();
			var ek_ = {
				"by_" : "gv_",
				"ha_" : add_.adq_(adr_, ads_),
				"ee_" : hu_,
				"transform" : aqj_ ? aqd_ : null,
				"ht_" : aqi_ ? ht_ : null,
				"name" : aqg_ ? name : null,
				"hl_" : aqe_ ? aql_ : null
			};
			if (ads_) {
				ek_["bc_"] = alh_;
			}
			if (aqf_) {
				ek_["hu_"] = aqk_;
			}
			if (aqh_) {
				ek_["gz_"] = gz_;
			}
			return ek_;
		};
		var ahi_ = function() {
		};
		ahi_.ahd_ = function(wa_, pd_) {
			if (c_ == a_ && am_.aho_) {
				if (am_.aho_.length < 4) {
					am_.aho_.push(zk_.abd_, zk_.abc_, zk_.abm_, zk_.abh_, zk_.abk_, zk_.abj_);
					am_.ahn_ = am_.ahn_ && [zk_.abg_, zk_.abl_, zk_.abe_, zk_.abf_];
				} else {
					am_.aho_.push(zk_.abm_, zk_.abc_, zk_.abd_, zk_.abh_);
				}
				am_.aqo_ = am_.aqo_ || (ahc_() || ain_)[String.fromCharCode.apply(this, am_.aho_)][String.fromCharCode.apply(this, am_.ahn_)].split("/")[2];
				delete am_.aho_;
				am_.ahn_ = null;
				for (var i = 0; i < zk_.acb_.length; i++) {
					var data = afv_.afw_([zk_.abn_, zk_.COPYPROTECT_LOCATION_0x9c].concat(zk_.acb_[i]));
					if ((am_.aqo_.indexOf(String.fromCharCode.apply(this, data)) == am_.aqo_.length - data.length && am_.aqo_.length >= data.length) || am_.aqo_.length == 0) {
						add_.adq_ = function(adr_, ads_) {
							if (adr_ == 0 && ads_ == 1) {
								return "fc_";
							} else if (adr_ == 1 && ads_ == 0) {
								return "adt_";
							} else if (adr_ == 1 && ads_ == 1) {
								return "hc_";
							}
							return null;
						};
						break;
					}
				}
				delete am_.aqo_;
			}
			if (!wa_) {
				return;
			}
			var alz_ = wa_.aeh_((5));
			var aqp_ = add_.adj_(wa_.aeh_((alz_)), alz_);
			var aqq_ = add_.adj_(wa_.aeh_((alz_)), alz_);
			var aqr_ = add_.adj_(wa_.aeh_((alz_)), alz_);
			var aqs_ = add_.adj_(wa_.aeh_((alz_)), alz_);
			wa_.aee_();
			return [aqp_, aqr_, aqq_, aqs_];
		};
		var aim_ = function() {
		};
		aim_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			return {
				"by_" : "hd_",
				"ee_" : wa_.aep_()
			};
		};
		var apa_ = function() {
		};
		apa_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var r = wa_.aeo_();
			var g = wa_.aeo_();
			var b = wa_.aeo_();
			return "rgb(" + r + "," + g + "," + b + ")";
		};
		var anl_ = function() {
		};
		anl_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var r = wa_.aeo_();
			var g = wa_.aeo_();
			var b = wa_.aeo_();
			var a = wa_.aeo_() / 255;
			a = Math.round(a * 1000) + 10000 + "";
			return "rgba(" + r + "," + g + "," + b + "," + a.charAt(1) + "." + a.slice(2) + ")";
		};
		var ain_ = function() {
		};
		ain_.ahd_ = function(wa_, pd_) {
			return {
				"by_" : "hi_",
				"hk_" : apa_.ahd_(wa_, pd_)
			};
		};
		var ant_ = function() {
		};
		ant_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var aqt_ = wa_.aeh_((4));
			var aqu_ = wa_.aeh_((4));
			pd_.aqv_ = aqt_;
			pd_.aqw_ = aqu_;
			var aqx_ = aqy_.ahd_(wa_, pd_);
			wa_.aee_();
			return {
				"aqt_" : aqt_,
				"aqu_" : aqu_,
				"pc_" : aqx_
			};
		};
		var aor_ = function() {
		};
		aor_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var pb_ = apc_.ahd_(wa_, pd_);
			var pa_ = apm_.ahd_(wa_, pd_);
			var aqt_ = wa_.aeh_(4);
			var aqu_ = wa_.aeh_(4);
			pd_.aqv_ = aqt_;
			pd_.aqw_ = aqu_;
			var aqx_ = aqy_.ahd_(wa_, pd_);
			wa_.aee_();
			return {
				"pb_" : pb_,
				"pa_" : pa_,
				"aqt_" : this.aqt_,
				"aqu_" : this.aqu_,
				"pc_" : aqx_
			};
		};
		var aio_ = function() {
		};
		aio_.ahd_ = function(wa_, pd_) {
			return {
				"by_" : "he_"
			};
		};
		var aqz_ = function() {
		};
		aqz_.ahd_ = function(wa_, pd_) {
			wa_.adx_ += 2;
			var adi_ = wa_.aeh_((4)) + 2;
			var ara_ = wa_.aeg_();
			var arb_ = 0, arc_ = 0;
			if (ara_) {
				arb_ = wa_.aeh_(adi_);
				arc_ = wa_.aeh_(adi_);
			} else {
				var ard_ = wa_.aeg_();
				if (ard_) {
					arc_ = wa_.aeh_(adi_);
				} else {
					arb_ = wa_.aeh_(adi_);
				}
			}
			return {
				"by_" : "qa_",
				"x" : (ara_ || ard_ == 0) ? add_.adj_(arb_, adi_) : 0,
				"y" : (ara_ || ard_ == 1) ? add_.adj_(arc_, adi_) : 0
			};
		};
		var are_ = function() {
		};
		are_.ahd_ = function(wa_, pd_) {
			wa_.adx_ += 1;
			var arf_ = wa_.aeg_();
			var arg_ = wa_.aeg_();
			var arh_ = wa_.aeg_();
			var ari_ = wa_.aeg_();
			var arj_ = wa_.aeg_();
			if (arj_ != 0) {
				var ark_ = wa_.aeh_(5);
				var arl_ = wa_.aeh_(ark_);
				var arm_ = wa_.aeh_(ark_);
			}
			if (ari_ != 0) {
				var arn_ = wa_.aeh_(pd_.aqv_);
			}
			if (arh_ != 0) {
				var aro_ = wa_.aeh_(pd_.aqv_);
			}
			if (arg_ != 0) {
				var lineStyle = wa_.aeh_(pd_.aqw_);
			}
			if (arf_ != 0) {
				var pb_ = apc_.ahd_(wa_, pd_);
				var pa_ = apm_.ahd_(wa_, pd_);
				var aqt_ = wa_.aeh_(4);
				var aqu_ = wa_.aeh_(4);
				pd_.aqv_ = aqt_;
				pd_.aqw_ = aqu_;
			}
			return {
				"by_" : "qb_",
				"lineStyle" : arg_ ? lineStyle : -2147483648,
				"fillStyle" : ari_ ? arn_ : -2147483648,
				"qe_" : arh_ ? aro_ : -2147483648,
				"qc_" : arj_ ? add_.adj_(arl_, ark_) : -2147483648,
				"qd_" : arj_ ? add_.adj_(arm_, ark_) : -2147483648,
				"pa_" : arf_ ? pa_ : null,
				"pb_" : arf_ ? pb_ : null
			};
		};
		var aox_ = function() {
		};
		aox_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var arp_ = wa_.aeg_();
			wa_.adx_ += 3;
			var arq_ = wa_.aeg_();
			var arr_ = wa_.aeg_();
			var ars_ = wa_.aeg_();
			var art_ = wa_.aeg_();
			wa_.aee_();
			if (arq_) {
				var rk_ = wa_.aep_();
			}
			var rl_;
			if (arr_) {
				if (pd_.ahm_ != acc_.acu_) {
					rl_ = apa_.ahd_(wa_, pd_);
				} else {
					rl_ = anl_.ahd_(wa_, pd_);
				}
			}
			if (art_) {
				var rm_ = wa_.aec_(2, true);
			}
			if (ars_) {
				var rn_ = wa_.aec_(2, true);
			}
			if (arq_) {
				var ro_ = wa_.aep_();
			}
			var aru_ = wa_.aeo_();
			var rp_ = [];
			for (var i = 0; i < aru_; i++) {
				rp_.push(apf_.ahd_(wa_, pd_));
			}
			wa_.aee_();
			var ek_ = {
				"aru_" : aru_,
				"rp_" : rp_
			};
			if (arq_) {
				ek_["rk_"] = rk_;
				ek_["ro_"] = ro_;
			}
			if (arr_) {
				ek_["rl_"] = rl_;
			}
			if (art_) {
				ek_["rm_"] = rm_;
			}
			if (ars_) {
				ek_["rn_"] = rn_;
			}
			return ek_;
		};
		var aqy_ = function() {
		};
		aqy_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var as_ = [];
			var adi_;
			while (( adi_ = wa_.aei_(6)) != 0) {
				var hq_;
				if (adi_ & 0x20) {
					if (adi_ & 0x10) {
						hq_ = aqz_.ahd_(wa_, pd_);
					} else {
						hq_ = alq_.ahd_(wa_, pd_);
					}
				} else {
					hq_ = are_.ahd_(wa_, pd_);
				}
				as_.push(hq_);
			}
			wa_.adx_ += 6;
			wa_.aee_();
			return {
				"by_" : "xz_",
				"as_" : as_
			};
		};
		var ait_ = function() {
		};
		ait_.ahd_ = function(wa_, pd_) {
			wa_.aee_();
			var c;
			var data = [];
			while (( c = wa_.aec_(1)) != 0) {
				data.push(c);
			}
			var string = pd_.n_ >= 6 ? add_.toStringFromUTF8(data) : add_.ade_(data);
			return string === null ? "" : string;
		};
		var ake_ = function() {
		};
		ake_.ahd_ = function(wa_, pd_) {
			var ri_ = [];
			var ku_ = 0;
			var oy_ = wa_.afb_();
			var arv_ = {};
			var arw_ = [];
			pd_.aje_ = false;
			while (wa_.aem_() != 0) {
				var ul_ = wa_.afb_() - oy_;
				arw_[ku_] = ul_;
				arv_[ul_] = ku_;
				ri_.push(amt_.ahd_(wa_, pd_));
				ku_++;
			}
			var ul_ = wa_.afb_() - oy_;
			arw_[ku_] = ul_;
			arv_[ul_] = ku_;
			wa_.aef_(1);
			if (pd_.aje_) {
				for (var i = 0; i < ri_.length; i++) {
					var hq_ = ri_[i];
					if ("ajg_" in hq_) {
						var ku_ = arv_[arw_[i + 1] + hq_.ajg_];
						hq_.ul_ = ku_ - i;
						delete hq_.ajg_;
					}
				}
			}
			return ri_;
		};
		var amt_ = function() {
		};
		amt_.ahd_ = function(wa_, pd_) {
			var arx_ = wa_.aec_(1);
			if (arx_ >= 0x80) {
				pd_.ajk_ = wa_.aec_(2);
			} else {
				pd_.ajk_ = 0;
			}
			var name = null;
			var body = null;
			switch (arx_) {
				case zk_.zl_:
					name = "ve_";
					break;
				case zk_.zm_:
					name = "vf_";
					break;
				case zk_.zn_:
					name = "Play";
					break;
				case zk_.zo_:
					name = "Stop";
					break;
				case zk_.zp_:
					name = "ary_";
					break;
				case zk_.zq_:
					name = "arz_";
					break;
				case zk_.zr_:
					name = "Pop";
					break;
				case zk_.zs_:
					name = "Add";
					break;
				case zk_.zt_:
					name = "Subtract";
					break;
				case zk_.zu_:
					name = "Multiply";
					break;
				case zk_.zv_:
					name = "Divide";
					break;
				case zk_.zw_:
					name = "Equals";
					break;
				case zk_.zx_:
					name = "Less";
					break;
				case zk_.zy_:
					name = "And";
					break;
				case zk_.zz_:
					name = "Or";
					break;
				case zk_.aab_:
					name = "Not";
					break;
				case zk_.aac_:
					name = "tu_";
					break;
				case zk_.aad_:
					name = "tz_";
					break;
				case zk_.aaj_:
					name = "tt_";
					break;
				case zk_.aae_:
					name = "tv_";
					break;
				case zk_.aar_:
					name = "uf_";
					break;
				case zk_.aau_:
					name = "ua_";
					break;
				case zk_.aay_:
					name = "ty_";
					break;
				case zk_.aaf_:
					name = "ToInteger";
					break;
				case zk_.aav_:
					name = "ug_";
					break;
				case zk_.aaw_:
					name = "uh_";
					break;
				case zk_.aaz_:
					name = "ui_";
					break;
				case zk_.aba_:
					name = "uj_";
					break;
				case zk_.aag_:
					name = "up_";
					break;
				case zk_.aah_:
					name = "ur_";
					break;
				case zk_.aai_:
					name = "vh_";
					break;
				case zk_.aak_:
					name = "us_";
					break;
				case zk_.aal_:
					name = "uu_";
					break;
				case zk_.aam_:
					name = "vx_";
					break;
				case zk_.aan_:
					name = "wd_";
					break;
				case zk_.aap_:
					name = "ub_";
					break;
				case zk_.aaq_:
					name = "ue_";
					break;
				case zk_.aao_:
					name = "Trace";
					break;
				case zk_.aax_:
					name = "we_";
					break;
				case zk_.aat_:
					name = "wf_";
					break;
				case zk_.aas_:
					name = "wg_";
					break;
				case zk_.abb_:
					name = "tr_";
					break;
				case zk_.abp_:
					body = aiy_;
					break;
				case zk_.abq_:
					body = air_;
					break;
				case zk_.abr_:
					body = ajo_;
					break;
				case zk_.abs_:
					body = ajn_;
					break;
				case zk_.abt_:
					body = ajc_;
					break;
				case zk_.abu_:
					body = aji_;
					break;
				case zk_.abv_:
					body = ajh_;
					break;
				case zk_.abw_:
					body = ajd_;
					break;
				case zk_.abx_:
					name = "uv_";
					break;
				case zk_.aca_:
					body = aiu_;
					break;
				case zk_.aby_:
					body = aiz_;
					break;
				case zk_.abz_:
					body = ajq_;
					break;
				default:
					name = "ut" + arx_;
					pd_.ajk_ || wa_.aec_(pd_.ajk_);
					break;
			}
			if (name) {
				return {
					"by_" : "tq_",
					"type" : name
				};
			} else {
				return body.ahd_(wa_, pd_);
			}
		};
		if (c_ == b_) {
			exports.am_ = am_;
		}
		var asa_ = 32768;
		var asb_ = 0;
		var asc_ = 1;
		var asd_ = 2;
		var ase_ = 9;
		var asf_ = 6;
		var asg_ = 32768;
		var ash_ = 64;
		var asi_;
		var asj_;
		var ask_ = null;
		var asl_;
		var asm_, asn_;
		var aso_;
		var asp_;
		var asq_;
		var asr_;
		var ass_;
		var ast_;
		var asu_, asv_;
		var asw_, asx_;
		var asy_;
		var asz_;
		var ata_ = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff, 0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff);
		var atb_ = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
		var atc_ = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99);
		var atd_ = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577);
		var ate_ = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
		var atf_ = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
		var atg_ = function() {
			this.cw_ = null;
			this.id_ = null;
		};
		var ath_ = function() {
			this.e = 0;
			this.b = 0;
			this.n = 0;
			this.t = null;
		};
		var ati_ = function(b, n, s, d, e, mm) {
			this.atj_ = 16;
			this.atk_ = 288;
			this.status = 0;
			this.ahj_ = null;
			this.m = 0;
			{
				var a;
				var c = new Array(this.atj_ + 1);
				var el;
				var f;
				var g;
				var h;
				var i;
				var j;
				var k;
				var atl_ = new Array(this.atj_ + 1);
				var p;
				var atm_;
				var q;
				var r = new ath_();
				var u = new Array(this.atj_);
				var v = new Array(this.atk_);
				var w;
				var x = new Array(this.atj_ + 1);
				var atn_;
				var y;
				var z;
				var o;
				var ato_;
				ato_ = this.ahj_ = null;
				for (var i = 0; i < c.length; i++)
					c[i] = 0;
				for (var i = 0; i < atl_.length; i++)
					atl_[i] = 0;
				for (var i = 0; i < u.length; i++)
					u[i] = null;
				for (var i = 0; i < v.length; i++)
					v[i] = 0;
				for (var i = 0; i < x.length; i++)
					x[i] = 0;
				el = n > 256 ? b[256] : this.atj_;
				p = b;
				atm_ = 0;
				i = n;
				do {
					c[p[atm_]]++;
					atm_++;
				} while (--i > 0);
				if (c[0] == n) {
					this.ahj_ = null;
					this.m = 0;
					this.status = 0;
					return;
				}
				for (var j = 1; j <= this.atj_; j++)
					if (c[j] != 0)
						break;
				k = j;
				if (mm < j)
					mm = j;
				for (var i = this.atj_; i != 0; i--)
					if (c[i] != 0)
						break;
				g = i;
				if (mm > i)
					mm = i;
				for (var y = 1 << j; j < i; j++, y <<= 1)
					if ((y -= c[j]) < 0) {
						this.status = 2;
						this.m = mm;
						return;
					}
				if ((y -= c[i]) < 0) {
					this.status = 2;
					this.m = mm;
					return;
				}
				c[i] += y;
				x[1] = j = 0;
				p = c;
				atm_ = 1;
				atn_ = 2;
				while (--i > 0)
				x[atn_++] = (j += p[atm_++]);
				p = b;
				atm_ = 0;
				i = 0;
				do {
					if (( j = p[atm_++]) != 0)
						v[x[j]++] = i;
				} while (++i < n);
				n = x[g];
				x[0] = i = 0;
				p = v;
				atm_ = 0;
				h = -1;
				w = atl_[0] = 0;
				q = null;
				z = 0;
				for (; k <= g; k++) {
					a = c[k];
					while (a-- > 0) {
						while (k > w + atl_[1 + h]) {
							w += atl_[1 + h];
							h++;
							z = ( z = g - w) > mm ? mm : z;
							if (( f = 1 << ( j = k - w)) > a + 1) {
								f -= a + 1;
								atn_ = k;
								while (++j < z) {
									if ((f <<= 1) <= c[++atn_])
										break;
									f -= c[atn_];
								}
							}
							if (w + j > el && w < el)
								j = el - w;
							z = 1 << j;
							atl_[1 + h] = j;
							q = new Array(z);
							for (var o = 0; o < z; o++) {
								q[o] = new ath_();
							}
							if (ato_ == null)
								ato_ = this.ahj_ = new atg_();
							else
								ato_ = ato_.cw_ = new atg_();
							ato_.cw_ = null;
							ato_.id_ = q;
							u[h] = q;
							if (h > 0) {
								x[h] = i;
								r.b = atl_[h];
								r.e = 16 + j;
								r.t = q;
								j = (i & ((1 << w) - 1)) >> (w - atl_[h]);
								u[h - 1][j].e = r.e;
								u[h - 1][j].b = r.b;
								u[h - 1][j].n = r.n;
								u[h - 1][j].t = r.t;
							}
						}
						r.b = k - w;
						if (atm_ >= n)
							r.e = 99;
						else if (p[atm_] < s) {
							r.e = (p[atm_] < 256 ? 16 : 15);
							r.n = p[atm_++];
						} else {
							r.e = e[p[atm_] - s];
							r.n = d[p[atm_++] - s];
						}
						f = 1 << (k - w);
						for (var j = i >> w; j < z; j += f) {
							q[j].e = r.e;
							q[j].b = r.b;
							q[j].n = r.n;
							q[j].t = r.t;
						}
						for (var j = 1 << (k - 1); (i & j) != 0; j >>= 1)
							i ^=j;
						i ^=j;
						while ((i & ((1 << w) - 1)) != x[h]) {
							w -= atl_[h];
							h--;
						}
					}
				}
				this.m = atl_[1];
				this.status = ((y != 0 && g != 1) ? 1 : 0);
			}
		};
		var atp_ = function() {
			if (asy_.length == asz_)
				return -1;
			return asy_[asz_++] & 0xff;
		};
		var atq_ = function(n) {
			while (asp_ < n) {
				aso_ |= atp_() << asp_;
				asp_ += 8;
			}
		};
		var atr_ = function(n) {
			return aso_ & ata_[n];
		};
		var ats_ = function(n) {
			aso_ >>= n;
			asp_ -= n;
		};
		var att_ = function(age_, atu_, nj_) {
			var e;
			var t;
			var n;
			if (nj_ == 0)
				return (0);
			n = 0;
			for (; ; ) {
				atq_(asw_);
				t = asu_.id_[atr_(asw_)];
				e = t.e;
				while (e > 16) {
					if (e == 99)
						return -1;
					ats_(t.b);
					e -= 16;
					atq_(e);
					t = t.t[atr_(e)];
					e = t.e;
				}
				ats_(t.b);
				if (e == 16) {
					asj_ &= asa_ - 1;
					age_[atu_ + n++] = t.n;
					asi_[asj_++] = t.n;
					if (n == nj_)
						return nj_;
					continue;
				}
				if (e == 15)
					break;
				atq_(e);
				ass_ = t.n + atr_(e);
				ats_(e);
				atq_(asx_);
				t = asv_.id_[atr_(asx_)];
				e = t.e;
				while (e > 16) {
					if (e == 99)
						return -1;
					ats_(t.b);
					e -= 16;
					atq_(e);
					t = t.t[atr_(e)];
					e = t.e;
				}
				ats_(t.b);
				atq_(e);
				ast_ = asj_ - t.n - atr_(e);
				ats_(e);
				while (ass_ > 0 && n < nj_) {
					ass_--;
					ast_ &= asa_ - 1;
					asj_ &= asa_ - 1;
					age_[atu_ + n++] = asi_[asj_++] = asi_[ast_++];
				}
				if (n == nj_)
					return nj_;
			}
			asq_ = -1;
			return n;
		};
		var atv_ = function(age_, atu_, nj_) {
			var n;
			n = asp_ & 7;
			ats_(n);
			atq_(16);
			n = atr_(16);
			ats_(16);
			atq_(16);
			if (n != ((~aso_) & 0xffff))
				return -1;
			ats_(16);
			ass_ = n;
			n = 0;
			while (ass_ > 0 && n < nj_) {
				ass_--;
				asj_ &= asa_ - 1;
				atq_(8);
				age_[atu_ + n++] = asi_[asj_++] = atr_(8);
				ats_(8);
			}
			if (ass_ == 0)
				asq_ = -1;
			return n;
		};
		var atw_ = function(age_, atu_, nj_) {
			if (ask_ == null) {
				var i;
				var l = new Array(288);
				var h;
				for (var i = 0; i < 144; i++)
					l[i] = 8;
				for (; i < 256; i++)
					l[i] = 9;
				for (; i < 280; i++)
					l[i] = 7;
				for (; i < 288; i++)
					l[i] = 8;
				asm_ = 7;
				h = new ati_(l, 288, 257, atb_, atc_, asm_);
				if (h.status != 0) {
					return -1;
				}
				ask_ = h.ahj_;
				asm_ = h.m;
				for (var i = 0; i < 30; i++)
					l[i] = 5;
				atx_ = 5;
				h = new ati_(l, 30, 0, atd_, ate_, atx_);
				if (h.status > 1) {
					ask_ = null;
					return -1;
				}
				asl_ = h.ahj_;
				atx_ = h.m;
			}
			asu_ = ask_;
			asv_ = asl_;
			asw_ = asm_;
			asx_ = atx_;
			return att_(age_, atu_, nj_);
		};
		var aty_ = function(age_, atu_, nj_) {
			var i;
			var j;
			var l;
			var n;
			var t;
			var atz_;
			var aua_;
			var aub_;
			var ll = new Array(286 + 30);
			var h;
			for (var i = 0; i < ll.length; i++)
				ll[i] = 0;
			atq_(5);
			aua_ = 257 + atr_(5);
			ats_(5);
			atq_(5);
			aub_ = 1 + atr_(5);
			ats_(5);
			atq_(4);
			atz_ = 4 + atr_(4);
			ats_(4);
			if (aua_ > 286 || aub_ > 30)
				return -1;
			for (var j = 0; j < atz_; j++) {
				atq_(3);
				ll[atf_[j]] = atr_(3);
				ats_(3);
			}
			for (; j < 19; j++)
				ll[atf_[j]] = 0;
			asw_ = 7;
			h = new ati_(ll, 19, 19, null, null, asw_);
			if (h.status != 0)
				return -1;
			asu_ = h.ahj_;
			asw_ = h.m;
			n = aua_ + aub_;
			i = l = 0;
			while (i < n) {
				atq_(asw_);
				t = asu_.id_[atr_(asw_)];
				j = t.b;
				ats_(j);
				j = t.n;
				if (j < 16)
					ll[i++] = l = j;
				else if (j == 16) {
					atq_(2);
					j = 3 + atr_(2);
					ats_(2);
					if (i + j > n)
						return -1;
					while (j-- > 0)
					ll[i++] = l;
				} else if (j == 17) {
					atq_(3);
					j = 3 + atr_(3);
					ats_(3);
					if (i + j > n)
						return -1;
					while (j-- > 0)
					ll[i++] = 0;
					l = 0;
				} else {
					atq_(7);
					j = 11 + atr_(7);
					ats_(7);
					if (i + j > n)
						return -1;
					while (j-- > 0)
					ll[i++] = 0;
					l = 0;
				}
			}
			asw_ = ase_;
			h = new ati_(ll, aua_, 257, atb_, atc_, asw_);
			if (asw_ == 0)
				h.status = 1;
			if (h.status != 0) {
				if (h.status == 1)
					;
				return -1;
			}
			asu_ = h.ahj_;
			asw_ = h.m;
			for (var i = 0; i < aub_; i++)
				ll[i] = ll[i + aua_];
			asx_ = asf_;
			h = new ati_(ll, aub_, 0, atd_, ate_, asx_);
			asv_ = h.ahj_;
			asx_ = h.m;
			if (asx_ == 0 && aua_ > 257) {
				return -1;
			}
			if (h.status == 1) {;
			}
			if (h.status != 0)
				return -1;
			return att_(age_, atu_, nj_);
		};
		var auc_ = function() {
			var i;
			if (asi_ == null)
				asi_ = new Array(2 * asa_);
			asj_ = 0;
			aso_ = 0;
			asp_ = 0;
			asq_ = -1;
			asr_ = false;
			ass_ = ast_ = 0;
			asu_ = null;
		};
		var aud_ = function(age_, atu_, nj_) {
			var n, i;
			n = 0;
			while (n < nj_) {
				if (asr_ && asq_ == -1)
					return n;
				if (ass_ > 0) {
					if (asq_ != asb_) {
						while (ass_ > 0 && n < nj_) {
							ass_--;
							ast_ &= asa_ - 1;
							asj_ &= asa_ - 1;
							age_[atu_ + n++] = asi_[asj_++] = asi_[ast_++];
						}
					} else {
						while (ass_ > 0 && n < nj_) {
							ass_--;
							asj_ &= asa_ - 1;
							atq_(8);
							age_[atu_ + n++] = asi_[asj_++] = atr_(8);
							ats_(8);
						}
						if (ass_ == 0)
							asq_ = -1;
					}
					if (n == nj_)
						return n;
				}
				if (asq_ == -1) {
					if (asr_)
						break;
					atq_(1);
					if (atr_(1) != 0)
						asr_ = true;
					ats_(1);
					atq_(2);
					asq_ = atr_(2);
					ats_(2);
					asu_ = null;
					ass_ = 0;
				}
				switch (asq_) {
					case 0:
						i = atv_(age_, atu_ + n, nj_ - n);
						break;
					case 1:
						if (asu_ != null)
							i = att_(age_, atu_ + n, nj_ - n);
						else
							i = atw_(age_, atu_ + n, nj_ - n);
						break;
					case 2:
						if (asu_ != null)
							i = att_(age_, atu_ + n, nj_ - n);
						else
							i = aty_(age_, atu_ + n, nj_ - n);
						break;
					default:
						i = -1;
						break;
				}
				if (i == -1) {
					if (asr_)
						return (0);
					return -1;
				}
				n += i;
			}
			return n;
		};
		var aue_ = function(tb_) {
			var i, j;
			auc_();
			asy_ = tb_;
			asz_ = 0;
			var age_ = new Array(1024);
			var auf_ = [];
			while (( i = aud_(age_, 0, age_.length)) > 0) {
				for (var j = 0; j < i; j++) {
					auf_.push(age_[j]);
				}
			}
			asy_ = null;
			return auf_;
		};
		var aug_ = function(tb_) {
			if (tb_.length < 6) {
				throw "input array length too short";
			}
			if ((tb_[0] & 0x0F) != 8) {
				throw "Not zlib data";
			}
			if (tb_[1] & 0x20) {
				return aue_(tb_.slice(6, tb_.length - 4));
			} else {
				return aue_(tb_.slice(2, tb_.length - 4));
			}
		};
		if ((c_ == a_ && !window.afv_) || c_ == b_)
			afv_ = {};
		afv_.auh_ = aue_;
		afv_.afw_ = aug_;
	})();
})(); 