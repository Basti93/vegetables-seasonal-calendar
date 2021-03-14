import path from 'path'
import fs from 'fs'
import {remote} from 'electron'
import low from 'lowdb'

import FileSync from 'lowdb/adapters/FileSync'


const userFilePath = path.join(remote.app.getPath('userData'), '/db.json');

console.log("Trying to read database from path " + userFilePath)

if (fs.existsSync(userFilePath)) {
    console.log('Using existing database');
} else {
    // eslint-disable-next-line no-undef
    let fileContents = fs.readFileSync(path.join(__static, '/db.json'), 'utf8')
    fs.appendFileSync(userFilePath, fileContents);
    console.log('New database created');
}

const adapter = new FileSync(path.join(remote.app.getPath('userData'), '/db.json'))
const db = low(adapter)



export default db