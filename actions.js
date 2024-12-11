export function setupActions(instance) {
	instance.setActionDefinitions({
		pageUp: {
			name: 'Button: Page Up',
			description: 'Presses the Page Up button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Page/Up')
			},
		},
		pageDown: {
			name: 'Button: Page Down',
			description: 'Presses the Page Down button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Page/Down')
			},
		},
		syncAll: {
			name: 'Sync: All',
			description: 'Get all current information from the console',
			options: [],
			callback: async (action, context) => {
				instance.send('/LS/Sync')
			},
		},
		syncPlaybacks: {
			name: 'Sync: Playbacks',
			description: 'Get all current playback information from the console',
			options: [],
			callback: async (action, context) => {
				instance.send('/LS/Sync/Playbacks')
			},
		},
		syncExecutors: {
			name: 'Sync: Executors',
			description: 'Get all current executor information from the console',
			options: [],
			callback: async (action, context) => {
				instance.send('/LS/Sync/Executors')
			},
		},
		dbo: {
			name: 'Button: DBO',
			description: 'Turns the DBO on/off',
			options: [
				{
					type: 'dropdown',
					label: 'Action',
					id: 'selectedAction',
					default: 1,
					choices: [
						{ id: 1, label: 'DBO On (press)' },
						{ id: 0, label: 'DBO Off (release)' },
					],
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/DBO', action.options.selectedAction)
			},
		},
		edit: {
			name: 'Button: Edit',
			description: 'Presses the Edit button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Edit')
			},
		},
		update: {
			name: 'Button: Update',
			description: 'Presses the Update button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Update')
			},
		},
		delete: {
			name: 'Button: Delete',
			description: 'Presses the Delete button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Delete')
			},
		},
		copy: {
			name: 'Button: Copy',
			description: 'Presses the Copy button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Copy')
			},
		},
		move: {
			name: 'Button: Move',
			description: 'Presses the Move button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Move')
			},
		},
		set: {
			name: 'Button: Set',
			description: 'Presses the Set button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Set')
			},
		},
		fan: {
			name: 'Button: Fan',
			description: 'Presses the Fan button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Fan')
			},
		},
		find: {
			name: 'Button: Find',
			description: 'Presses the Find button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Find')
			},
		},
		clear: {
			name: 'Button: Clear',
			description: 'Presses the Clear button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Clear')
			},
		},
		rec: {
			name: 'Button: Rec',
			description: 'Presses the Rec button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Rec')
			},
		},
		playbackGo: {
			name: 'Playback Control (Select, Go, etc.)',
			description: 'Performs an action on a specific playback number',
			options: [
				{
					type: 'number',
					label: 'Playback number',
					id: 'targetPlayback',
					default: 1,
					min: 1,
					max: 30,
					required: true,
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'selectedAction',
					default: 'Select',
					choices: [
						{ id: 'Select', label: 'Select' },
						{ id: 'Go', label: 'Go' },
						{ id: 'Flash On', label: 'Flash On' },
						{ id: 'Flash Off', label: 'Flash Off' },
						{ id: 'Stop', label: 'Stop' },
						{ id: 'Prev', label: 'Previous' },
						{ id: 'Next', label: 'Next' },
						{ id: 'Pause', label: 'Pause' },
						{ id: 'TAP', label: 'TAP' },
					],
				},
			],
			callback: async (action, context) => {
				if (action.options.selectedAction == 'Flash On') {
					instance.sendValue('/LS/Flash/PB/' + action.options.targetPlayback, 1)
				} else if (action.options.selectedAction == 'Flash Off') {
					instance.sendValue('/LS/Flash/PB/' + action.options.targetPlayback, 0)
				} else if (action.options.selectedAction == 'TAP') {
					instance.sendValue('/LS/TAP/PB/' + action.options.targetPlayback, 0)
				} else {
					instance.sendButtonPress('/LS/' + action.options.selectedAction + '/PB/' + action.options.targetPlayback)
				}
			},
		},
		playbackFaderLevelAbs: {
			name: 'Playback Fader Level [absolute]',
			description: 'Sets the fader level for a specific playback number',
			options: [
				{
					type: 'number',
					label: 'Playback number',
					id: 'targetPlayback',
					default: 1,
					min: 1,
					max: 30,
					required: true,
				},
				{
					type: 'number',
					label: 'Fader Level',
					id: 'targetFaderLevel',
					default: 127,
					min: 0,
					max: 255,
					required: true,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Level/PB/' + action.options.targetPlayback, action.options.targetFaderLevel)
			},
		},
		playbackFaderLevelRel: {
			name: 'Playback Fader Level [relative]',
			description: 'Increments or decrements the fader level for a specific playback number',
			options: [
				{
					type: 'number',
					label: 'Playback number',
					id: 'targetPlayback',
					default: 1,
					min: 1,
					max: 30,
					required: true,
				},
				{
					type: 'number',
					label: 'Fader Level',
					id: 'targetFaderLevel',
					default: 10,
					min: -255,
					max: 255,
					required: true,
				},
			],
			callback: async (action, context) => {
				var newValue = instance.playbackFaders[action.options.targetPlayback] + action.options.targetFaderLevel
				if (newValue < 0) newValue = 0
				if (newValue > 255) newValue = 255
				console.log('New value: ' + newValue)
				instance.sendValue('/LS/Level/PB/' + action.options.targetPlayback, newValue)
			},
		},
		playbackChaseSpeed: {
			name: 'Playback Chase Speed',
			description: 'Sets the chase speed for a specific playback number',
			options: [
				{
					type: 'number',
					label: 'Playback number',
					id: 'targetPlayback',
					default: 1,
					min: 1,
					max: 30,
					required: true,
				},
				{
					type: 'number',
					label: 'Speed',
					id: 'targetSpeed',
					default: 128,
					min: 5,
					max: 200,
					required: true,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/ChaseValue/PB/' + action.options.targetPlayback, action.options.targetSpeed)
			},
		},
		mainPlaybackControl: {
			name: 'Main Playback Control (Go, Stop, etc.)',
			description: 'Performs an action on a the main playback',
			options: [
				{
					type: 'dropdown',
					label: 'Action',
					id: 'selectedAction',
					default: 'Go',
					choices: [
						{ id: 'Go', label: 'Go' },
						{ id: 'Stop', label: 'Stop' },
						{ id: 'Prev', label: 'Previous' },
						{ id: 'Next', label: 'Next' },
						{ id: 'Pause', label: 'Pause' },
					],
				},
			],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/' + action.options.selectedAction + '/Main')
			},
		},
		grandmasterFaderLevelAbsolute: {
			name: 'GrandMaster Fader Level [absolute]',
			description: 'Sets the fader level for the grandmaster',
			options: [
				{
					type: 'number',
					label: 'Fader Level',
					id: 'targetFaderLevel',
					default: 255,
					min: 0,
					max: 255,
					required: true,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Level/GM', action.options.targetFaderLevel)
			},
		},
		grandmasterFaderLevelRelative: {
			name: 'GrandMaster Fader Level [relative]',
			description: 'Increment or decrement the fader level for the grandmaster',
			options: [
				{
					type: 'number',
					label: 'Level',
					id: 'targetValue',
					default: 10,
					min: -255,
					max: 255,
					required: true,
				},
			],
			callback: async (action, context) => {
				var newValue = (instance.grandmaster += action.options.targetValue)
				if (newValue < 0) newValue = 0
				if (newValue > 255) newValue = 255
				instance.sendValue('/LS/Level/GM', newValue)
			},
		},
		encoders: {
			name: 'Encoders Control',
			description: 'Sets a value for a specific encoder',
			options: [
				{
					type: 'dropdown',
					label: 'Encoder',
					id: 'selectedEncoder',
					default: 1,
					choices: [
						{ id: 1, label: 'Encoder A' },
						{ id: 2, label: 'Encoder B' },
						{ id: 3, label: 'Encoder C' },
						{ id: 4, label: 'Encoder D' },
					],
				},
				{
					type: 'number',
					label: 'Encoder Value',
					id: 'targetValue',
					default: 0,
					min: -255,
					max: 255,
					required: true,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Encoder/' + action.options.selectedEncoder, action.options.targetValue)
			},
		},
		selectFixture: {
			name: 'Button: Select Fixture',
			description: 'Presses the Select Fixture button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/SelectFixture')
			},
		},
		selectGroup: {
			name: 'Button: Select Group',
			description: 'Presses the Select Group button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/SelectGroup')
			},
		},
		selectionNext: {
			name: 'Button: Selection Next',
			description: 'Presses the Selection Next button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/SelectionNext')
			},
		},
		selectionPrev: {
			name: 'Button: Selection Previous',
			description: 'Presses the Selection Previous button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/SelectionPrevious')
			},
		},
		intensity: {
			name: 'Button: Intensity',
			description: 'Presses the Intensity button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Intensity')
			},
		},
		position: {
			name: 'Button: Position',
			description: 'Presses the Position button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Position')
			},
		},
		colour: {
			name: 'Button: Colour',
			description: 'Presses the Colour button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Colour')
			},
		},
		beam: {
			name: 'Button: Beam',
			description: 'Presses the Beam button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Beam')
			},
		},
		advanced: {
			name: 'Button: Advanced',
			description: 'Presses the Advanced button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Advanced')
			},
		},
		gobo: {
			name: 'Button: Gobo',
			description: 'Presses the Gobo button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Gobo')
			},
		},
		fx: {
			name: 'Button: Fx',
			description: 'Presses the Fx button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/Fx')
			},
		},
		triggerExecRow: {
			name: 'Trigger Executor Row',
			description: 'Triggers a specific Executor row',
			options: [
				{
					type: 'dropdown',
					label: 'Executor Page',
					id: 'execPage',
					default: 1,
					choices: [
						{ id: 1, label: 'Page 1' },
						{ id: 2, label: 'Page 2' },
					],
				},
				{
					type: 'number',
					label: 'Row',
					id: 'execRow',
					default: 1,
					min: 1,
					max: 6,
					required: true,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/ExecutorLine/' + action.options.execPage + '/' + action.options.execRow, 0)
			},
		},
		triggerExec: {
			name: 'Trigger Executor',
			description: 'Triggers a specific Executor',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'execMode',
					default: 0,
					choices: [
						{ id: 0, label: 'Toggle' },
						{ id: 1, label: 'Flash: Press' },
						{ id: 2, label: 'Flash: Release' },
					],
				},
				{
					type: 'dropdown',
					label: 'Executor Page',
					id: 'execPage',
					default: 1,
					choices: [
						{ id: 1, label: 'Page 1' },
						{ id: 2, label: 'Page 2' },
					],
				},
				{
					type: 'number',
					label: 'Executor Row',
					id: 'execRow',
					min: 1,
					max: 6,
					default: 1,
				},
				{
					type: 'number',
					label: 'Executor Column',
					id: 'execColumn',
					min: 1,
					max: 8,
					default: 1,
				},
			],
			callback: async (action, context) => {
				switch (action.options.execMode) {
					case 0:
					case 2:
						instance.sendValue(
							'/LS/Executor/' +
								action.options.execPage +
								'/' +
								action.options.execColumn +
								'/' +
								action.options.execRow,
							0
						)
						break
					case 1:
						instance.sendValue(
							'/LS/Executor/' +
								action.options.execPage +
								'/' +
								action.options.execColumn +
								'/' +
								action.options.execRow,
							1
						)
						break
				}
			},
		},
		releaseAll: {
			name: 'Button: Release All',
			description: 'Presses the Release All button',
			options: [],
			callback: async (action, context) => {
				instance.sendButtonPress('/LS/StopAll')
			},
		},
		masterChaseTap: {
			name: 'TAP Master Chase Speed',
			description: 'TAPs the master chase speed',
			options: [],
			callback: async (action, context) => {
				instance.sendValue('/LS/Tap', 0)
			},
		},
		masterChaseReset: {
			name: 'Reset Master Chase Speed',
			description: 'Resets the master chase speed',
			options: [],
			callback: async (action, context) => {
				instance.sendValue('/LS/Reset/SmChase', 0)
			},
		},
		masterChaseSet: {
			name: 'Set Master Chase Speed',
			description: 'Sets the master chase speed to a specific value',
			options: [
				{
					type: 'number',
					label: 'Speed',
					id: 'targetSpeed',
					min: 0,
					max: 255,
					default: 128,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Level/SmChase', action.options.targetSpeed)
			},
		},
		masterFxSizeReset: {
			name: 'Reset Master FX Size',
			description: 'Resets the master fx size',
			options: [],
			callback: async (action, context) => {
				instance.sendValue('/LS/Reset/SmSize', 0)
			},
		},
		masterFxSizeSet: {
			name: 'Set Master FX Size',
			description: 'Sets the master fx size to a specific value',
			options: [
				{
					type: 'number',
					label: 'Size',
					id: 'targetSize',
					min: 0,
					max: 255,
					default: 128,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Level/SmSize', action.options.targetSize)
			},
		},
		masterFxSpeedReset: {
			name: 'Reset Master FX Speed',
			description: 'Resets the master fx speed',
			options: [],
			callback: async (action, context) => {
				instance.sendValue('/LS/Reset/SmSpeed', 0)
			},
		},
		masterFxSpeedTap: {
			name: 'TAP Master FX Speed',
			description: 'TAPs the master fx speed',
			options: [],
			callback: async (action, context) => {
				instance.sendValue('/LS/FxTap', 0)
			},
		},
		masterFxSpeedSet: {
			name: 'Set Master FX Speed',
			description: 'Sets the master fx speed to a specific value',
			options: [
				{
					type: 'number',
					label: 'Speed',
					id: 'targetSpeed',
					min: 0,
					max: 255,
					default: 128,
				},
			],
			callback: async (action, context) => {
				instance.sendValue('/LS/Level/SmSpeed', action.options.targetSpeed)
			},
		},
		gotoAndLoadCue: {
			name: 'GoTo/Load Cue',
			description: 'GoTo or load a specific cue in a playback',
			options: [
				{
					type: 'number',
					label: 'Playback',
					id: 'targetPlayback',
					min: 1,
					max: 30,
					default: 1,
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'targetAction',
					default: 'GotoCue',
					choices: [
						{ id: 'GotoCue', label: 'GoTo Cue' },
						{ id: 'PreloadCue', label: 'Preload Cue' },
					],
				},
				{
					type: 'number',
					label: 'Cue',
					id: 'targetCue',
					min: 0,
					default: 1,
				},
				{
					type: 'number',
					label: 'Sub Cue',
					id: 'targetSubCue',
					min: 10,
					default: 10,
				},
			],
			callback: async (action, context) => {
				instance.sendValue(
					'/LS/' + action.options.targetAction + '/PB/' + action.options.targetPlayback,
					action.options.targetCue * 100 + action.options.targetSubCue
				)
			},
		},
	})
}
