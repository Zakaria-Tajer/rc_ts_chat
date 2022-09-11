import {
  addDoc,
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";

const addFileFirestore = async (
  groupeCollection: CollectionReference<DocumentData>,
  imageUrl: string | any | undefined,
  currentUseruser: string | undefined | any,
  messageType: string | any
) => {
  addDoc(groupeCollection, {
    timestamp: serverTimestamp(),
    message: imageUrl,
    user: currentUseruser,
    messageType: messageType
  })
    .then((res) => console.log(res.id))
    .catch((err) => console.log(err));
};

const convertToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return blob
};

export { addFileFirestore, convertToBlob };
