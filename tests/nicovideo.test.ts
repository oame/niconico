import assert from 'assert'
import { setup } from 'jest-playback'
import path from 'path'
import * as niconico from '../src/niconico'
import Nicovideo from '../src/nicovideo'

const EMAIL = process.env.NICONICO_EMAIL
const PASSWORD = process.env.NICONICO_PASSWORD
assert(EMAIL, 'set NICONICO_EMAIL')
assert(PASSWORD, 'set NICONICO_PASSWORD')
const VIDEO_ID = 'sm25434075'

setup(__dirname)

let client: Nicovideo

beforeAll(async () => {
  const session = await niconico.login(EMAIL, PASSWORD)
  client = new Nicovideo(session)
})

test('get watch data containers', async () => {
  const data = await client.watch(VIDEO_ID)
  expect(data.video.title).toEqual(
    'ゆめにっきワールド 10thアニバーサリー  birdmania reach'
  )
})

test('fail when invalid videoID given', async () => {
  await expect(client.watch('sm99999999999')).rejects.toThrow()
})

test('getthumbinfo', async () => {
  const thumbinfo = await new Nicovideo().thumbinfo(VIDEO_ID)
  expect(thumbinfo.watchURL).toEqual(
    `https://www.nicovideo.jp/watch/${VIDEO_ID}`
  )
})

test('invalid getthumbinfo', async () => {
  await expect(new Nicovideo().thumbinfo('sm99999999999')).rejects.toThrow()
})

test('fail to download video', async () => {
  await expect(client.download('sm99999999999', '.')).rejects.toThrow()
})

test('download video', async () => {
  const filePath = await client.download(VIDEO_ID, '.')
  expect(filePath).toEqual(
    path.resolve('./ゆめにっきワールド 10thアニバーサリー  birdmania reach.mp4')
  )
}, 60000)

test('stream video', async () => {
  const stream = await client.stream(VIDEO_ID)
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  expect(buffer.length).toBeGreaterThan(1048576)
}, 60000)
