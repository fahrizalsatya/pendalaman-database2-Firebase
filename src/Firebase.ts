/*import admin from 'firebase-admin'
// Menggunakan kurung kurawal karena file serviceAccountKey memiliki
// definisi objek berbentuk struct
import { serviceAccountCredentials } from './serviceAccountKey'
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount
// Inisialisasi koneksi ke database Firebase Firestore
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://pendalaman-database-2.firebaseio.com'
 })
const QueueCS = admin.firestore().collection('queueCS')
const QueueTL = admin.firestore().collection('queueTL')
export default { QueueCS, QueueTL}
var FbApp = admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://pendalaman-database-2.firebaseio.com'
})
module.exports.QueueTL = FbApp.database().ref
module.exports.QueueCS = FbApp.firestore().collection('queueCS')*/