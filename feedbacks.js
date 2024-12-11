export function setupFeedbacks(instance) {
	instance.setFeedbackDefinitions({
		execActive: {
			type: 'boolean',
			name: 'Executor active',
			description: 'Active, if the selected Executor is currently active',
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
			callback: (feedback, context) => {
				return instance.executors[feedback.options.execPage - 1][feedback.options.execColumn - 1][
					feedback.options.execRow - 1
				]
			},
		},
		grandmaster: {
			type: 'advanced',
			name: 'GrandMaster value',
			description: 'Displays the current GrandMaster value',
			options: [
				{
					type: 'dropdown',
					label: 'Display format',
					id: 'displayFormat',
					default: 0,
					choices: [
						{ id: 0, label: 'Decimal (0-255)' },
						{ id: 1, label: 'Percentage (0-100%)' },
					],
				},
			],
			callback: (feedback, context) => {
				switch (feedback.options.displayFormat) {
					case 0:
						return { text: instance.grandmaster + '' }
					case 1:
						return { text: Math.floor((instance.grandmaster / 255) * 100) + '%' }
				}
			},
		},
		playbackFaderLevel: {
			type: 'advanced',
			name: 'Playback fader level',
			description: 'Returns the current value of a playback fader',
			options: [
				{
					type: 'number',
					label: 'Playback fader',
					id: 'pbFader',
					min: 1,
					max: 30,
					default: 1,
				},
				{
					type: 'dropdown',
					label: 'Display format',
					id: 'displayFormat',
					default: 0,
					choices: [
						{ id: 0, label: 'Decimal (0-255)' },
						{ id: 1, label: 'Percentage (0-100%)' },
					],
				},
			],
			callback: (feedback, context) => {
				switch (feedback.options.displayFormat) {
					case 0:
						return { text: instance.playbackFaders[feedback.options.pbFader - 1] + '' }
					case 1:
						return { text: Math.floor((instance.playbackFaders[feedback.options.pbFader - 1] / 255) * 100) + '%' }
				}
			},
		},
		smSize: {
			type: 'advanced',
			name: 'FX Size',
			description: 'Returns the current FX Size',
			options: [
				{
					type: 'dropdown',
					label: 'Display format',
					id: 'displayFormat',
					default: 0,
					choices: [
						{ id: 0, label: 'Decimal (0-255)' },
						{ id: 1, label: 'Percentage (0-100%)' },
					],
				},
			],
			callback: (feedback, context) => {
				switch (feedback.options.displayFormat) {
					case 0:
						return { text: instance.smSize + '' }
					case 1:
						return { text: Math.floor((instance.smSize / 255) * 100) + '%' }
				}
			},
		},
		smSpeed: {
			type: 'advanced',
			name: 'FX Speed',
			description: 'Returns the current FX Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Display format',
					id: 'displayFormat',
					default: 0,
					choices: [
						{ id: 0, label: 'Decimal (0-255)' },
						{ id: 1, label: 'Percentage (0-100%)' },
					],
				},
			],
			callback: (feedback, context) => {
				switch (feedback.options.displayFormat) {
					case 0:
						return { text: instance.smSpeed + '' }
					case 1:
						return { text: Math.floor((instance.smSpeed / 255) * 100) + '%' }
				}
			},
		},
		smChase: {
			type: 'advanced',
			name: 'Chase Speed',
			description: 'Returns the current Chase Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Display format',
					id: 'displayFormat',
					default: 0,
					choices: [
						{ id: 0, label: 'Decimal (0-255)' },
						{ id: 1, label: 'Percentage (0-100%)' },
					],
				},
			],
			callback: (feedback, context) => {
				switch (feedback.options.displayFormat) {
					case 0:
						return { text: instance.smChase + '' }
					case 1:
						return { text: Math.floor((instance.smChase / 255) * 100) + '%' }
				}
			},
		},
	})
}
