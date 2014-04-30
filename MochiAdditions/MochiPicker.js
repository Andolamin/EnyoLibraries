/**
 * Created by Alan on 4/16/14.
 */
enyo.kind({
	name: 'mochi.Picker',
	kind: 'mochi.ContextualPopupDecorator',
	classes: 'mochi-picker mochi-contextual-popup-decorator enyo-unselectable',
	published: {
		options: ['Picker'],
		selected: 'Picker'
	},
	events: {
		onChange: ''
	},
	components: [
		{
			name: 'pickerButton',
			kind: 'mochi.Button',
			content: "Picker"
		},
		{
			name: 'ContextualPopup',
			classes: 'mochi-picker-popup',
			kind: "mochi.ContextualPopup",
			maxHeight: 800,
			title: "",
			floating: true,
			noDefer: true,
			actionButtons: [],
			components: []
		}
	],
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			// this.selectedChanged();
			this.optionsChanged();
		};
	}),
	setOptions: function(inNewOptions) {
		if (typeof inNewOptions == 'object') {
			var optionsTemp = this.options;
			this.options = inNewOptions;
			this.optionsChanged(optionsTemp);
		}
	},
	optionsChanged: function(inOldValue) {
		this.$.ContextualPopup.destroyClientControls();
		for (var i = 0; i < this.options.length; i++) {
			this.$.ContextualPopup.createComponent(
				{
					kind: 'mochi.Button',
					content: this.options[i],
					decoratorLeft: '',
					decoratorRight: '',
					style: 'display: block;',
					ontap: 'handleOptionButtonTap'
				},
				{
					owner: this
				}
			);
		}
	},
    setDisabled: function(inDisabled) {
        this.$.pickerButton.setDisabled(inDisabled);
    },
	selectedChanged: function(inOldValue) {
		this.$.pickerButton.setContent(this.selected);
		this.doChange();
	},
	handleOptionButtonTap: function(inSender, inEvent) {
		this.$.ContextualPopup.hide();
		this.setSelected(inSender.content);
		return true;
	}
})