import { Regex } from '@companion-module/base'

export const configFields = [
	{
		type: 'textinput',
		id: 'targetIp',
		label: 'LightShark IP address',
		default: '192.168.42.1',
		width: 12,
		regex: Regex.IP,
	},
	{
		type: 'number',
		id: 'receivePort',
		label: 'Receive Port',
		default: 9000,
		width: 6,
		regex: Regex.PORT,
	},
	{
		type: 'number',
		id: 'sendPort',
		label: 'Send Port',
		default: 8000,
		width: 6,
		regex: Regex.PORT,
	},
	{
		type: 'checkbox',
		id: 'enablePolling',
		label: 'Enable Polling',
		default: true,
		width: 6,
	},
	{
		type: 'number',
		id: 'pollingInterval',
		label: 'Polling interval (ms)',
		default: 5000,
		width: 6,
		min: 1000,
		max: 60000,
	},
]
