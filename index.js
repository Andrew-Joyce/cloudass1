const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const serviceAccount = require('./cloudass1-b7215-firebase-adminsdk-vhn62-ab7c7bcb91.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collectionName = 'users'; 

const hashPassword = async (password) => {
  const saltRounds = 10; 
  return await bcrypt.hash(password, saltRounds);
};

const addDocument = async (docId, data) => {
  try {
    data.password = await hashPassword(data.password);
    await db.collection(collectionName).doc(docId).set(data);
    console.log(`Document with ID ${docId} added successfully.`);
  } catch (error) {
    console.error(`Error adding document with ID ${docId}:`, error);
  }
};

const studentBaseId = 's3876520';
const basePassword = '12345';
for (let i = 0; i < 10; i++) {
  const userId = `${studentBaseId}${i}`;
  const userData = {
    user_name: `Andrew Joyce${i}`,
    password: `${i}${basePassword}`,
  };
  addDocument(userId, userData);
}
