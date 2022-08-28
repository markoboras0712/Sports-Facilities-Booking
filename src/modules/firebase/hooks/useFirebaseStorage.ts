import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useMemo } from 'react';
import { useToast } from 'shared/hooks';
import { createFirebaseApp } from '../initFirebase';

export const useFirebaseStorage = () => {
  const storage = useMemo(() => getStorage(createFirebaseApp()), []);
  const { errorToast, successToast } = useToast();

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
      successToast('You have successfully uploaded image!');
      return url;
    } catch (error) {
      errorToast('You have failed uploading image!');
    }

    return '';
  }

  return { getStorageReference, uploadBlobOrFile };
};