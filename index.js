import { InstanceBase, runEntrypoint, InstanceStatus, combineRgb } from '@companion-module/base'
import { upgradeScripts } from './upgrade.js'
import { setupActions } from './actions.js'
import { setupFeedbacks } from './feedbacks.js'
import { configFields } from './config.js'

import { Client, Server } from 'node-osc'
import { variables } from './variables.js'

class LightsharkInstance extends InstanceBase {
	isInitialized = false
	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)
		this.initActions()
		this.initFeedbacks()
		this.setVariableDefinitions(variables)

		this.setupOsc()
	}

	setupOsc() {
		this.destroy()

		if (this.client != null) {
			this.client.close()
		}
		if (this.server != null) {
			this.server.close()
		}
		if (this.config.targetIp == '' || !this.config.receivePort || !this.config.sendPort) {
			this.updateStatus(InstanceStatus.BadConfig)
			return
		}
		this.updateStatus(InstanceStatus.Connecting)
		this.initVariables()

		this.client = new Client(this.config.targetIp, this.config.sendPort)

		this.server = new Server(this.config.receivePort, '0.0.0.0', () => {
			this.send('/LS/Sync')
			this.updateStatus(InstanceStatus.Ok)
			this.startSendingSyncCommand()
		})

		this.server.on('message', (msg) => {
			this.parseOscInput(msg)
		})

		this.server.on('bundle', (bundle) => {
			bundle.elements.forEach((element, i) => {
				this.parseOscInput(element)
			})
		})

		if (this.server == null || this.client == null) {
			this.updateStatus(InstanceStatus.ConnectionFailure)
		}
	}

	parseOscInput(msg) {
		const args = msg[0].split('/')
		args.shift()
		if (args[0] == 'LS') {
			if (args[1] == 'Level') {
				if (args[2] == 'GM') {
					this.grandmaster = msg[1]
					this.setVariableValues({
						grandmaster_decimal: this.grandmaster,
						grandmaster_percent: Math.floor((this.grandmaster / 255) * 100),
					})
				} else if (args[2] == 'SmSize') {
					this.smSize = msg[1]
					this.setVariableValues({
						smSize: this.smSize,
					})
				} else if (args[2] == 'SmSpeed') {
					this.smSpeed = msg[1]
					this.setVariableValues({
						smSpeed: this.smSpeed,
					})
				} else if (args[2] == 'SmChase') {
					this.smChase = msg[1]
					this.setVariableValues({
						smChase: this.smChase,
					})
				} else if (args[2] == 'PB') {
					this.playbackFaders[parseInt(args[3] - 1)] = msg[1]
				}
			}
			if (args[0] == 'PB') {
				if (msg[0] == '/PB') {
					this.playbackFaders[msg[3].split('/')[1]] = msg[4]
				} else if (msg[2] == '/SmSize') {
					this.smSize = msg[3]
					this.setVariableValues({
						smSize: this.smSize,
					})
				} else if (msg[2] == '/SmSpeed') {
					this.smSpeed = msg[3]
					this.setVariableValues({
						smSpeed: this.smSpeed,
					})
				} else if (msg[2] == '/SmChase') {
					this.smChase = msg[3]
					this.setVariableValues({
						smChase: this.smChase,
					})
				} else if (msg[2] == '/GM') {
					this.grandmaster = msg[3]
					this.setVariableValues({
						grandmaster_decimal: this.grandmaster,
						grandmaster_percent: Math.floor((this.grandmaster / 255) * 100),
					})
				}
			} else if (args[1] == 'Executor') {
				var execPage = parseInt(args[2])
				var execX = parseInt(args[3])
				var execY = parseInt(args[4])
				var execVal = parseInt(msg[1])
				this.executors[execPage - 1][execX - 1][execY - 1] = execVal
			}
		}
		this.checkFeedbacks()
	}

	initVariables() {
		this.grandmaster = 0
		this.smSize = 0
		this.smSpeed = 0
		this.smChase = 0
		this.playbackFaders = new Array(30)
		this.executors = new Array(2)

		for (let i = 0; i < 30; i++) {
			this.playbackFaders[i] = 0
		}

		for (let i = 0; i < 2; i++) {
			this.executors[i] = new Array(6)

			for (let j = 0; j < 8; j++) {
				this.executors[i][j] = new Array(6)
				for (let k = 0; k < 6; k++) {
					this.executors[i][j][k] = 0
				}
			}
		}

		this.setVariableValues({
			grandmaster_percent: this.grandmaster,
			grandmaster_decimal: this.grandmaster,
			smSize: this.smSize,
			smSpeed: this.smSpeed,
			smChase: this.smChase,
		})
	}

	sendButtonPress(path) {
		this.client.send(path, 1)
		this.client.send(path, 0)
	}

	sendValue(path, value) {
		this.client.send(path, value)
	}

	send(path) {
		this.client.send(path)
	}

	startSendingSyncCommand() {
		if (this.config.enablePolling) {
			this.syncCommandInterval = setInterval(() => {
				this.send('/LS/Sync')
			}, this.config.pollingInterval)
		}
	}

	async destroy() {
		this.isInitialized = false
		if (this.syncCommandInterval) {
			clearInterval(this.syncCommandInterval)
		}
	}

	async configUpdated(config) {
		this.config = config
		this.setupOsc()
	}

	getConfigFields() {
		return configFields
	}

	initFeedbacks() {
		setupFeedbacks(this)
	}

	initActions() {
		setupActions(this)
	}
}

runEntrypoint(LightsharkInstance, upgradeScripts)
