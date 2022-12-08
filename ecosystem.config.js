module.exports = {
	apps: [
		{
			name: "fman",
			script: "/home/barzegar/project/file-manager/build/server.js",
			instance: "max",
			exec_mode: "cluster",
			autorestart: true
		}
	]
}
