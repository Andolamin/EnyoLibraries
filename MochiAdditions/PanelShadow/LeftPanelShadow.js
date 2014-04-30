/**
 * Created by Alan on 1/21/14.
 */
enyo.kind({
	name: 'LeftPanelShadow',
	published: {
		grabber: false
	},
	components: [
		{
			name: 'top',
			classes: 'left-panel-shadow-top'
		},
		{
			name: 'fill',
			classes: 'left-panel-shadow'
		},
		{
			name: 'bottom',
			classes: 'left-panel-shadow-bottom'
		}
	],
	create: function() {
		this.inherited(arguments);
		this.grabberChanged();
	},
	grabberChanged: function() {
		this.$.bottom.addRemoveClass('grabber', this.grabber);
	}
});