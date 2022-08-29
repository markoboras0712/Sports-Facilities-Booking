import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useMemo } from 'react';
import { useToast } from 'shared/hooks';
import { createFirebaseApp } from '../initFirebase';

export const useFirebaseStorage = () => {
  const storage = useMemo(() => getStorage(createFirebaseApp()), []);
  const { errorToast, infoToast } = useToast();

  const getStorageReference = (facilityId: string) => ref(storage, facilityId);

  async function uploadBlobOrFile(
    file: Blob | Uint8Array | ArrayBuffer,
    facilityId: string,
    fileName: string,
  ) {
    const storageReference = getStorageReference(`${facilityId}/${fileName}`);

    try {
      await uploadBytes(storageReference, file);
      const url = await getDownloadURL(storageReference);
      infoToast(
        'Submit the form so you can successfully save updated pictures!',
      );
      return url;
    } catch (error) {
      errorToast('You have failed uploading image!');
    }

    return '';
  }

  return { getStorageReference, uploadBlobOrFile };
};
