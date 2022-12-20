var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};
instance.prototype.init = function() {
	var self = this;

	self.status(self.STATE_OK);

	debug = self.debug;
	log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Console IP',
			width: 8,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'OSC Port',
			width: 4,
			default: 8000,
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug('destroy');
};

instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {
		'pageup': {
			label: 'Page Up',
			options: []
		},
		'pagedown': {
			label: 'Page Down',
			options: []
		},
		'DBO': {
			label: 'DBO',
			options: []
		},
		'edit': {
			label: 'Update',
			options: []
		},
		'update': {
			label: 'Update',
			options: []
		},
		'delete': {
			label: 'Delete',
			options: []
		},
		'copy': {
			label: 'Copy',
			options: []
		},
		'move': {
			label: 'Move',
			options: []
		},
		'set': {
			label: 'Set',
			options: []
		},
		'fan': {
			label: 'Fan',
			options: []
		},
		'find': {
			label: 'Find',
			options: []
		},
		'clear': {
			label: 'Clear',
			options: []
		},
		'rec': {
			label: 'Rec',
			options: []
		},
	    'playbackSelection': {
			label: 'Playback Selection',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},
		'playbackGo': {
			label: 'Playback Go',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},
		'playbackFlash': {
			label: 'Playback Flash',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},
		'playbackStop': {
			label: 'Playback Stop',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},'playbackPrev': {
			label: 'Playback Prev',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},
		'playbackNext': {
			label: 'Playback Next',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},'playbackPause': {
			label: 'Playback Pause',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
			]
		},
		'playbackFaderLevel': {
			label: 'Playback Fader Level',
			options: [
				{
					type: 'number',
					label: 'Playback Number',
					id: 'playbackNumber',
					min: 1,
					max: 30,
					default: 1,
					required: true,
					range: true
			   	},
				{
					type: 'number',
					label: 'Fader Level',
					id: 'float',
					min: 0,
					max: 255,
					default: 255,
					required: true,
					range: true
			   }
			]
		},
		'mainPlaybackGo': {
			label: 'Main Playback Go',
			options: []
		},
		'mainPlaybackStop': {
			label: 'Main Playback Stop',
			options: []
		},
		'mainPlaybackPrev': {
			label: 'Main Playback Prev',
			options: []
		},
		'mainPlaybackNext': {
			label: 'Main Playback Next',
			options: []
		},
		'mainPlaybackPause': {
			label: 'Main Playback Pause',
			options: []
		},
		'setGMLevel': {
			label: 'Set GM Level',
			options: [
				{
					type: 'number',
					label: 'GM Level',
					id: 'float',
					min: 0,
					max: 255,
					default: 255,
					required: true,
					range: true
			   }
			]
		},
		'encoders': {
			label: 'Encoders',
			options: [
				{
					type: 'number',
					label: 'Select Executor',
					id: 'encoderNumber',
					min: 1,
					max: 4,
					default: 1,
					required: true,
					range: true
			   	},
			   	{
					type: 'number',
					label: 'Encoder Position',
					id: 'float',
					min: -1,
					max: 1,
					default: 0,
					required: true,
					range: true
		   		}	
			]
		},
		'selectFixture': {
			label: 'Select Fixture',
			options: []
		},
		'selectGroup': {
			label: 'Select Group',
			options: []
		},
		'selectionNext': {
			label: 'Selection Next',
			options: []
		},
		'selectionPrev': {
			label: 'Selection Prev',
			options: []
		},
		'intensity': {
			label: 'Intensity',
			options: []
		},
		'position': {
			label: 'Position',
			options: []
		},
		'color': {
			label: 'Color',
			options: []
		},
		'color': {
			label: 'Color',
			options: []
		},
		'beam': {
			label: 'Beam',
			options: []
		},
		'advanced': {
			label: 'Advanced',
			options: []
		},
		'gobo': {
			label: 'Gobo',
			options: []
		},
		'fx': {
			label: 'Fx',
			options: []
		},
		'executorPushMode': {
			label: 'Executor Push Mode',
			options: [
				{
					type: 'number',
					label: 'Executor Page',
					id: 'executorPage',
					min: 1,
					max: 2,
					default: 1,
					required: true,
					range: true
			   	},
				{
					type: 'number',
					label: 'Select X Position',
					id: 'xpos',
					min: 1,
					max: 8,
					default: 1,
					required: true,
					range: true
			   	},
				{
					type: 'number',
					label: 'Select Y Position',
					id: 'ypos',
					min: 1,
					max: 6,
					default: 1,
					required: true,
					range: true
			   }
			]
		},
		'executorToggleMode': {
			label: 'Executor Push Mode',
			options: [
				{
					type: 'number',
					label: 'Executor Page',
					id: 'executorPage',
					min: 1,
					max: 2,
					default: 1,
					required: true,
					range: true
			   	},
				{
					type: 'number',
					label: 'Select X Position',
					id: 'xpos',
					min: 1,
					max: 8,
					default: 1,
					required: true,
					range: true
			   	},
				{
					type: 'number',
					label: 'Select Y Position',
					id: 'ypos',
					min: 1,
					max: 6,
					default: 1,
					required: true,
					range: true
			   }
			]
		},
		'triggerExecutorRow': {
			label: 'Trigger Executor Row',
			options: [
				{
					type: 'number',
					label: 'Select Executor Row',
					id: 'float',
					min: 1,
					max: 6,
					default: 1,
					required: true,
					range: true
			   }
			]
		},
		'syncAll': {
			label: 'Sync All',
			options: []
		},
		'syncOnlyParameters': {
			label: 'Sync Only Parameters',
			options: []
		},
		'syncOnlyExecutors': {
			label: 'Sync Only Executors',
			options: []
		}
	});
}

instance.prototype.action = function(action) {
	var self = this;

	var args = null;

	debug('action: ', action);

	switch(action.action) {
		case 'pageup':
			oscPath = '/LS/Page/Up';
			args = [];
			break;
		case 'pagedown':
			oscPath = '/LS/Page/Down';
			args = [];
			break;
		case 'DBO':
			oscPath = '/LS/DBO';
			args = [];
			break;
		case 'edit':
			oscPath = '/LS/edit';
			args = [];
			break;
		case 'update':
			oscPath = '/LS/Update';
			args = [];
			break;
		case 'delete':
			oscPath = '/LS/Delete';
			args = [];
			break;
		case 'copy':
			oscPath = '/LS/Copy';
			args = [];
			break;
		case 'move':
			oscPath = '/LS/Move';
			args = [];
			break;
		case 'set':
			oscPath = '/LS/Set';
			args = [];
			break;
		case 'fan':
			oscPath = '/LS/Fan';
			args = [];
			break;
		case 'find':
			oscPath = '/LS/Find';
			args = [];
			break;
		case 'clear':
			oscPath = '/LS/Clear';
			args = [];
			break;
		case 'rec':
			oscPath = '/LS/Rec';
			args = [];
			break;
		case 'playbackSelection':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackGO':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackFlash':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackStop':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackPrev':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackNext':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackPause':
			oscPath = '/LS/Select/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'playbackFaderLevel':
			oscPath = '/LS/Level/PB/' + action.options.playbackNumber;
			args = [{
				type: 'f',
				value: parseFloat(action.options.float)
			}];
			break;
		case 'mainPlaybackGo':
			oscPath = '/LS/Go/Main';
			args = [];
			break;
		case 'mainPlaybackStop':
			oscPath = '/LS/Stop/Main';
			args = [];
			break;
		case 'mainPlaybackPrev':
			oscPath = '/LS/Prev/Main';
			args = [];
			break;
		case 'mainPlaybackNext':
			oscPath = '/LS/Next/Main';
			args = [];
			break;
		case 'mainPlaybackPause':
			oscPath = '/LS/Pause/Main';
			args = [];
			break;
		case 'setGMLevel':
			oscPath = '/LS/Level/GM';
			args = [{
				type: 'f',
				value: parseFloat(action.options.float)
			}];
			break;
		case 'encoders':
			oscPath = '/LS/Encoder/' + action.options.encoderNumber;
			console.log(oscPath);
			args = [{
				type: 'f',
				value: parseFloat(action.options.float)
			}];
			break;
		case 'selectFixture':
			oscPath = '/LS/SelectFixture';
			args = [];
			break;
		case 'selectGroup':
			oscPath = '/LS/SelectGroup';
			args = [];
			break;
		case 'selectionNext':
			oscPath = '/LS/SelectionNext';
			args = [];
			break;
		case 'selectionPrev':
			oscPath = '/LS/SelectionPrevious';
			args = [];
			break;
		case 'intensity':
			oscPath = '/LS/Intensity';
			args = [];
			break;
		case 'position':
			oscPath = '/LS/Position';
			args = [];
			break;
		case 'color':
			oscPath = '/LS/Color';
			args = [];
			break;
		case 'beam':
			oscPath = '/LS/Beam';
			args = [];
			break;
		case 'advanced':
			oscPath = '/LS/Advance';
			args = [];
			break;
		case 'gobo':
			oscPath = '/LS/Gobo';
			args = [];
			break;
		case 'Fx':
			oscPath = '/LS/Gobo';
			args = [];
			break;
		case 'executorPushMode':
			executorPage = action.options.executorPage;
			xpos = action.options.xpos;
			ypos = action.options.ypos;
			oscPath = '/LS/Executor/' + executorPage + '/' + xpos + '/' + ypos;
			args = [{
				type: 'f',
				value: 1
			}];
			break;
		case 'executorToggleMode':
			executorPage = action.options.executorPage;
			xpos = action.options.xpos;
			ypos = action.options.ypos;
			oscPath = '/LS/Executor/' + executorPage + '/' + xpos + '/' + ypos;
			args = [{
				type: 'f',
				value: 0
			}];
			break;
		case 'triggerExecutorRow':
			oscPath = '/LS/ExecutorLine/'
			args = [{
				type: 'f',
				value: parseFloat(action.options.float)
			}];
			break;
		case 'syncAll':
			oscPath = '/LS/Sync';
			args = [];
			break;
		case 'syncOnlyParameters':
			oscPath = '/LS/Sync/Playbacks';
			args = [];
			break;
		case 'syncOnltExecutors':
			oscPath = '/LS/Sync/Executors';
			args = [];
			break;
		case 'releaseAll':
			oscPath = '/LS/StopAll';
			args = [];
			break;
		default:
			break;
	}

	if (args !== null) {
		debug('Sending OSC',self.config.host, self.config.port, oscPath);
		console.log('sending osc');
		console.log(args);
		self.system.emit('osc_send', self.config.host, self.config.port, oscPath, args);
	}


};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
