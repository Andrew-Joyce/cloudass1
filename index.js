const admin = require('firebase-admin');

const serviceAccount = require('/path/to/your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collectionName = 'your-collection-name';

const addDocument = async (docId, data) => {
  try {
    await db.collection(collectionName).doc(docId).set(data);
    console.log(`Document with ID ${docId} added successfully.`);
  } catch (error) {
    console.error(`Error adding document with ID ${docId}:`, error);
  }
};

const studentBaseId = 's3876520'; 
for (let i = 0; i < 10; i++) {
  const userId = `${studentBaseId}${i}`;
  const userData = {
    user_name: `Firstname Lastname${i}`,
    password: `password${i}`,
  };
  addDocument(userId, userData);
}
