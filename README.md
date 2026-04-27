## Media server for Signer and Protocol Agnostic Social Media (Spasm)

![spasm](https://github.com/degenrocket/spasm/blob/f00b5d86a7309a35867413293bbd95d9041077a5/static/pyramid-black.png?raw=true)

Mirrors: [Forgejo](https://git.spasm.network/spasm-network/spasm-media) [Codeberg](https://codeberg.org/spasm-network/spasm-media) [Github](https://github.com/spasm-network/spasm-media)

This repo is for serving media files for [Spasm](https://spasm.network).

For **spasm.js** library see: 
[github](https://github.com/degenrocket/spasm.js) /
[npm](https://www.npmjs.com/package/spasm.js)

### Run Spasm media server

- Install packages: `npm install`

- Create .env: `cp .env.example .env`

- Edit `.env` if necessary

- Run dev server: `npm run dev`

- Run prod server: `npm run prod`

### Add new files

- Add files to `toConvert/` directory

- Convert files: `npm run convert`

Files will be moved to `public/` directory with new Spasm-compatible names.

### License

MIT License
