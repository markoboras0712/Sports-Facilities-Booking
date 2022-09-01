import {region} from 'firebase-functions';
import {firestore} from 'firebase-admin';
import cors = require('cors');

export const getFacilitiesTest = region('europe-west2').https.onRequest(
    (req, res) =>
      cors({origin: true})(req, res, async () => {
        try {
          console.log('TEST FUNKCIJE');
          await firestore()
              .listCollections()
              .then((snap) => {
                snap.forEach((collection) => {
                  const {id} = collection;
                  console.log('idddd', id);
                  //   const entitiesCollection = collection
                  //     .doc('units')
                  //     .collection('entities');
                  //   const documentIds: string[] = [];

                  //   entitiesCollection.get().then(data => {
                  //     data.forEach(({ id }) => {
                  //       documentIds.push(id);
                  //     });
                  //     collection
                  //       .doc('units')
                  //       .set({ positions: documentIds }, { merge: true });
                  //   });
                });
              });
        } catch (e) {
          console.log(e);
          return res.status(500).send();
        }

        return res.status(200).send();
      }),
);
