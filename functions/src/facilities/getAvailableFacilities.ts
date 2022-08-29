/* eslint-disable max-len */
import {firestore} from 'firebase-admin';
import {region} from 'firebase-functions';

interface GetAvailableFacilities {
  userUid: string;
}

export const getAvailableFacilities = region('europe-west2').https.onCall(
    async ({userUid}: GetAvailableFacilities) => {
      try {
        const allCollectionsReference = await firestore().listCollections();
        const availableFacilitiesIds = allCollectionsReference
            .filter((collection) => collection.id !== userUid)
            .map((collection) => collection.id);

        return availableFacilitiesIds;
      } catch (e) {
        return e;
      }
    },
);
