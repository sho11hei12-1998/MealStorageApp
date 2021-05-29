import firebase from 'firebase';
import 'firebase/firestore';

const fbConfig = {
  apiKey: "AIzaSyDojAMWtmp583FkKn2bkmgqVEDUtEWuats",
  authDomain: "foodiary-app-ebaa5.firebaseapp.com",
  projectId: "foodiary-app-ebaa5",
  storageBucket: "foodiary-app-ebaa5.appspot.com",
  messagingSenderId: "1083319042430",
  appId: "1:1083319042430:web:7286d107c0951b6980f32f",
  measurementId: "G-N0V7FQFLY3"
};

class Fire {
  constructor() {
    const firebaseApp = !firebase.apps.length
      ? firebase.initializeApp(fbConfig)
      : firebase.app()
  }

  // 投稿時の処理
  uploadPost = async ({ url, shopName, text, postIndex }) => {
    const uploadRef = await this.postCollection.doc(postIndex);
    uploadRef
      .set({
        imgUrl: url,
        shopName,
        text,
        postIndex,
        itemHide: false,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .then(() => {
        alert('投稿が完了しました');
        console.log('書き込みができました');
      });
  };

  // 投稿の編集（投稿の非表示）
  notDisplayPost = async ({ postIndex }) => {
    const updateRef = await this.postCollection.doc(postIndex);
    // const item_status = updateRef.get('itemHide');
    // console.log(item_status);
    updateRef
      .update({
        itemHide: true,
        updatedAt: new Date().toLocaleString(),
      });
  }

  // 投稿の削除
  deletePost = async ({ postIndex }) => {
    const deleteRef = await this.postCollection.doc(postIndex);
    deleteRef
      .delete()
  }

  // Firestoreに保存した情報をPostScreenで取得し、setStateする際の処理
  getPosts = async () => {
    const querySnapshot = await this.postCollection.get();
    const res = [];
    querySnapshot.forEach(doc => {
      res.push(doc.data());
    });
    return res;
  };

  get userCollection() {
    return firebase.firestore().collection('users');
  }
  get postCollection() {
    return this.userCollection.doc(this.uid).collection('posts');
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}
Fire.shared = new Fire();
export default Fire;