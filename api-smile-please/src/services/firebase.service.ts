import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { isArray, map } from 'lodash';

@Injectable()
export class FirebaseService {
    private readonly logger = new Logger(FirebaseService.name);

    private firebaseAdminInstance;
    private initFirebaseInstance = () => {
        if(process.env.NODE_ENV === 'dev') 
        {
            const serviceAccount = require("../../firebase_service_account.json");
            this.firebaseAdminInstance = process.env.IS_FIREBASE_ACTIVE === 'true' 
            && admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            this.firebaseAdminInstance = admin.initializeApp();
        }
     
    }
    constructor() {
        this.initFirebaseInstance();
    }

    async save(data) {
        if(!this.firebaseAdminInstance) {
            this.logger.error('firebase not loaded');
        }
        const fireStore = this.firebaseAdminInstance.firestore();
        const batch = fireStore.batch();

        for (let [key, value] of Object.entries(data)) {
            let nycRef = fireStore.collection('memes').doc(key);
            if(isArray(value)) {
                map(value,(item => {
                    nycRef.add(item);
                })); 
            } else {
                nycRef.set(value)
            }
             batch.set(nycRef, value);
          }
       return batch.commit();
    }
   async get (path): Promise<any> {
        if(process.env.IS_FIREBASE_ACTIVE !== 'true') {
            return ;
        }   
        const fireStore = this.firebaseAdminInstance.firestore();
        return new Promise((resolve,rejects) => {
            fireStore.collection('memes')
            .doc(path).get().then((doc) => {
                if (doc.exists) {
                    resolve(doc.data());
                } else {
                    resolve({});
                }
            }).catch((error) => {
                this.logger.error("Error getting document:", error);
                resolve({});
            });
        })
   } 
}