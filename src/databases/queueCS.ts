import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalent-be-21.firebaseio.com',
});

const queueCSRef = admin.firestore().collection('queueCS');

function adFunction(num: number, adStr: string, num2:number){
var str = num.toString()
while (str.length < num2)
str = adStr +str;
return str
}

export class QueueCsClient {
    private queueCSRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor() {
        this.queueCSRef = queueCSRef;
    }

    async addData(counter: number) {
        const time = firestore.Timestamp.now().seconds
        const data = {
            queue_number:"CS"+adFunction(counter, "0", 3),
            waiting_time: time
        }

        try {
            await queueCSRef.add(data);
        } catch (error) {
            throw error
        }

        return;
    }

    async getData() {
        let snapshot;
        try {
            snapshot = await this.queueCSRef.orderBy('queue_number').get();
        } catch (error) {
            throw error;
        }

        console.log(snapshot);
        return snapshot.docs.map(doc => doc.data());
    }

    async getDataById(id: string) {
        let snapshot;
        try {
            snapshot = await queueCSRef.doc(id).get();
        } catch (error) {
            throw error;
        }

        return snapshot.data();
    }

    async deleteData() {
        let queue
        let batch = admin.firestore().batch()
        try {
            queue = await this.queueCSRef.get()
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
            await queueCSRef.doc(id).delete()
        } catch (error) {
            throw error
        }
        return
    }
}
