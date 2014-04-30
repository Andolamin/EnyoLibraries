/**
 * Created by Alan on 4/14/2014.
 */
enyo.kind({
    name: 'mochi.Panel',
    kind: 'enyo.Control',
    classes: 'enyo-fit',
	published: {
		panelIndex: 1
	},
    tools: [
        {
            name: 'Grabber',
            tag: 'img',
            classes: 'mochi-grabber',
            ontap: 'handleGrabberTap'
        }
    ],
    initComponents: enyo.inherit(function(sup) {
        return function() {
            this.createChrome(this.tools);
            sup.apply(this, arguments);
        };
    }),
    updateGrabber: function() {
        this.addRemoveClass('collapsed', this.isCollapsed());
    },
	isDraggable: function() {
		return this.parent.draggable;
	},
    isCollapsed: function() {
		if(typeof this.hasNode().style.transform != 'undefined') {
        	return (this.hasNode().style.transform.indexOf('translateX') == -1);
		}
		return (this.hasNode().style.webkitTransform.indexOf('translateX') == -1);
    },
    handleGrabberTap: function() {
        // console.log(this);
		this.parent.setIndex(this.parent.index >= this.panelIndex ? this.panelIndex - 1 : this.panelIndex);
    }
});