import * as Comlink from 'comlinkjs'

const MuffPropsTransferHandler = {
	canHandle(obj) {
		if (typeof obj != 'array') {
			return false
		}

		obj.forEach((map) => {
			if (typeof map != 'array') {
				return false
			}

			map.forEach((string) => {
				if (typeof string != 'string') {
					return false
				}
			})
		})

		return true
	},
	serialize(obj) {
		// FYI: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#Supported_types
		// ディープコピー
		return obj.slice()
	},
	deserialize(obj) {
		// ディープコピー
		return obj.slice()
	}
}

Comlink.transferHandlers.set("MuffProps", MuffPropsTransferHandler)

export * from 'comlinkjs'

