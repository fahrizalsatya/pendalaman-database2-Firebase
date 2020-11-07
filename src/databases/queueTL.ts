import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalent-be-21.firebaseio.com', 
}, "secondary");

const queueTLRef = admin.firestore().collection('queueTL');

function adFunction(num: number, adStr: string, num2: number) {
    var str = num.toString()
    while (str.length < num2)
        str = adStr + str;
    return str
}

export class QueueTlClient {
    private queueTLRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor() {
        this.queueTLRef = queueTLRef;
    }

    async addData(counter: number) {
        const time = firestore.Timestamp.now().seconds
        const data = {
            queue_number: "TL" + adFunction(counter, "0", 3),
            waiting_time: time
        }

        try {
            await queueTLRef.add(data);
        } catch (error) {
            throw error
        }

        return;
    }

    async getData() {
        let snapshot;
        try {
            snapshot = await this.queueTLRef.orderBy('queue_number').get();
        } catch (error) {
            throw error;
        }

        console.log(snapshot);
        return snapshot.docs.map(doc => doc.data());
    }

    async getDataById(id: string) {
        let snapshot;
        try {
            snapshot = await queueTLRef.doc(id).get();
        } catch (error) {
            throw error;
        }

        return snapshot.data();
    }

    async deleteData() {
        let queue
        let batch = admin.firestore().batch()
        try {
            queue = await this.queueTLRef.get()
            queue.docs.forEach((doc) => {
                batch.delete(doc.ref)
            })
        } catch (error) {
            throw error
        }
        return batch.commit()
    }

    async deleteDataById(id: string) {
        try {
            await queueTLRef.doc(id).delete()
        } catch (error) {
            throw error
        }
        return
    }
}
