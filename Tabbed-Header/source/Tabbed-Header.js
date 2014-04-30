/********************************************************************************************
 *                                                                                          *
 *                             Enyo 2.0 Tabbed Header Component                             *
 *                                 developed by Alan Stice                                  *
 *                            Associative Intelligence Software                             *
 *                            http://associativeintelligence.org                            *
 *                                                                                          *
 *                                Copyright 2012 Alan Stice                                 *
 *                                                                                          *
 *             Licensed under the Apache License, Version 2.0 (the "License");              *
 *             you may not use this file except in compliance with the License.             *
 *                         You may obtain a copy of the License at                          *
 *                                                                                          *
 *                        http://www.apache.org/licenses/LICENSE-2.0                        *
 *                                                                                          *
 *           Unless required by applicable law or agreed to in writing, software            *
 *            distributed under the License is distributed on an "AS IS" BASIS,             *
 *         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.         *
 *           See the License for the specific language governing permissions and            *
 *                              limitations under the License.                              *
 *                                                                                          *
 ********************************************************************************************/

enyo.kind({
	name: "TabbedHeader",
	kind: "FittableColumns",
	stretch: true,
	classes: "tabbedHeader header",
	published: {
		tabs: "",
		activeTab: "First",
		caption: "",
		captionMixin: "",
		tabLocation: "left", // left, right
		color: "light", // light, dark, or color code
		tabWidth: "auto", // auto, px, %
		narrowFit: false,
		narrowWidth: 'auto'
	},
	styleNode: '',
	components: [
		{
			name: "pre",
			fit: true
		},
		{
			name: "post",
			fit: false
		}
	],
	constructor: function() {
		this.tabs = ["First", "Second", "Third"];
		this.caption = {content: ""};
		this.captionMixin = {};
		this.inherited(arguments);
	},
	create: function() {
		this.inherited(arguments);
		this.generateHeader();
	},
	tabsChanged: function() {
		this.refreshTabs();
	},
	activeTabChanged: function() {
		this.refreshTabs();
	},
	captionChanged: function() {
		this.generateHeader();
	},
	captionMixinChanged: function() {
		this.generateHeader();
	},
	tabWidthChanged: function() {
		this.refreshTabs();
	},
	tabLocationChanged: function() {
		this.generateHeader();
	},
	colorChanged: function() {
		this.generateHeader();
	},
	narrowFitChanged: function() {
		this.generateHeader();
	},
	narrowWidthChanged: function() {
		this.generateHeader();
	},
	generateHeader: function() {
		this.destroyComponents();
		this.createComponents([{
									name: "pre",
									fit: true
								},
								{
									name: "post",
									fit: false
								}], {owner: this});

		var tabContainer;
		var captionContainer;
		if (this.tabLocation === "left") {
			tabContainer = this.$.pre;
			captionContainer = this.$.post;		
		} else if (this.tabLocation === "right") {
			tabContainer = this.$.post;
			captionContainer = this.$.pre;
		}
		tabContainer.fit = true;
		tabContainer.createComponent({name: "tabGroup", kind: "onyx.RadioGroup", controlClasses: "tabbedHeader header onyx-tabbutton"}, {owner: this});
		if (this.caption === "") {
			captionContainer.destroy();
			this.addClass("stretchHeader");
		} else if (JSON.stringify(this.caption) === ('"' + this.caption + '"')) {
			captionContainer.createComponent({content: this.caption}, this.captionMixin);
			this.removeClass("stretchHeader");
		} else {
			captionContainer.createComponent(this.caption, this.captionMixin);
			this.removeClass("stretchHeader");
		}
		if (this.styleNode == '') {
			var style = document.createElement('style');
			style.type = 'text/css';
			document.head.appendChild(style);
			this.styleNode = style;
		}
		this.styleNode.innerHTML = '';
		if (this.narrowFit) {
			this.styleNode.innerHTML = '@media (max-width: 800px) { .tabbedHeader .onyx-tabbutton { width: ' + this.narrowWidth + ' !important; } }';
		}

		this.refreshTabs();

		this.addClass("tabbedHeader");
		if (this.color === "light") {
			this.addClass("header");
		} else if (this.color === "dark") {
			this.addClass("dark");
		} else {
			this.addClass("header");
			this.applyStyle("background-color", this.color);
			this.$.tabGroup.applyStyle("background-color", this.color);
		}
	},
	refreshTabs: function() {
		this.$.tabGroup.destroyClientControls();
		for (var tabIndex = 0; tabIndex < this.tabs.length; tabIndex++) {
			if (this.tabs[tabIndex] !== null) {
				var tab = this.tabs[tabIndex]
				this.$.tabGroup.createComponent({content: tab, active: (this.activeTab === tab), style: "width: " + this.tabWidth + ";", ontap: "tabTap"}, {owner: this});
			}
		}
		this.$.tabGroup.render();
	},
	tabTap: function(inSender, inEvent) {
		this.bubble("onChange", inSender);
	}
});