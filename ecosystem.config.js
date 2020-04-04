module.exports = {
    apps : [
      {
        name: "RemoteFaces",
        //script: "./start.js",
        script: 'npm',
        env: {
            HOST: "localhost",
            PORT: 3000
        }
      }
    ]
}