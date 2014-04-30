/**
 * Created by Alan on 4/16/14.
 */
enyo.kind({
	name: 'mochi.Groupbox',
	kind: 'enyo.Control',
	published: {
		headerText: 'Groupbox'
	},
	tools: [
		{
			kind: 'enyo.Control',
			classes: 'mochi-groupbox',
			components: [
				{
					kind: 'TopPanelShadow'
				},
				{
					name: 'header',
					kind: 'mochi.Subheader',
					style: 'font-weigth: bold;'
				},
				{
					name: 'client'
				},
				{
					kind: 'BottomPanelShadow'
				}
			]
		}
	],
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.createChrome(this.tools);
			sup.apply(this, arguments);
			this.$.header.setContent(this.headerText);
		};
	})
});