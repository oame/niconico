# niconico

[![npm version]][npmjs] [![Build Status]][Travis] [![Coverage Status]][Coveralls]

[npm version]: https://badge.fury.io/js/niconico.svg
[npmjs]: https://www.npmjs.com/package/niconico
[Build Status]: https://travis-ci.org/uetchy/niconico.svg?branch=master
[Travis]: https://travis-ci.org/uetchy/niconico
[Coverage Status]: https://coveralls.io/repos/github/uetchy/niconico/badge.svg?branch=master
[Coveralls]: https://coveralls.io/github/uetchy/niconico?branch=master

niconico API library for Node.JS, armed with Promises.

## Usage

```
npm install niconico
```

```js
const { niconico, Nicovideo } = require('niconico')

const baseDir = './videos'

async function downloadVideo(videoID) {
  try {
    const session = await niconico.login(
      process.env.EMAIL,
      process.env.PASSWORD
    )
    const client = new Nicovideo(session)
    const filePath = await client.download(videoID, baseDir)

    console.log('Downloaded:', filePath)
  } catch (err) {
    console.log('Error:', err)
  }
}

downloadVideo('sm28222588')
```

## API

[API Documents](http://uetchy.github.io/niconico/)

The APIs return Promises. You can chain them with `then` and `catch`.

### niconico.login(email, password)

Returns a session cookie.

#### email

Type: `string`

#### password

Type: `string`

### new Nicovideo([session])

Returns a nicovideo agent. If a session is given, the agent will be authenticated and act as a signed user.

#### session

a session cookie given by `niconico.login`.

### nicovideo.download(videoID, outputDir)

Download a video to local dir.

#### videoID

Type: `string`

#### outputDir

Type: `string`

### nicovideo.watch(videoID)

Fetch a /watch/ page and returns its metadata.

#### videoID

Type: `string`

### nicovideo.thumbinfo(videoID)

Returns thumbinfo. This doesn't requires `session`.

#### videoID

Type: `string`

### nicovideo.httpExport(url, outputPath)

Download the video from `url` to `outputPath`.

#### url

Type: `string`

#### outputPath

Type: `string`

## Contributing

Before create a pull-request, you need to test using `npm test`.

```
NICONICO_EMAIL=<email> NICONICO_PASSWORD=<password> npm test
```

### Contributors

- Yasuaki Uechi
- Yuta Hiroto
