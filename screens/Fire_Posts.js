import firebase from 'firebase';
import 'firebase/firestore';

const fbConfig = {
  apiKey: "AIzaSyAxGIgIddf3AVto-rPUJqsYblrY0fro44s",
  authDomain: "mealsharingapp.firebaseapp.com",
  projectId: "mealsharingapp",
  storageBucket: "mealsharingapp.appspot.com",
  messagingSenderId: "690876875873",
  appId: "1:690876875873:web:e107d5fc22cfacbe909620",
  measurementId: "G-ZQJQVS00V0"
};

class Fire {
  constructor() {
    const firebaseApp = !firebase.apps.length
      ? firebase.initializeApp(fbConfig)
      : firebase.app()
  }

  // ユーザー情報の記録
  uploadUserInfo = async ({ userName, address }) => {
    const uploadRef = await this.userInfoCollection;
    uploadRef
      .set({
        iconImg: null,
        birth: null,
        userName,
        address,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert('ユーザー情報の登録が完了しました。');
        console.log('書き込み完了');
      });
  };

  // ユーザー情報の編集
  updateUserInfo = async ({ iconUrl, userName, birth, address }) => {
    const updateRef = await this.userInfoCollection;
    updateRef
      .update({
        iconImg: iconUrl,
        birth: birth,
        userName,
        address,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  // 投稿数の更新
  // 投稿数の取得
  // getTotalPost() {
  //   this.postCollection.get().then(snap => {
  //     const size = snap.size // will return the collection size
  //     return snap;
  //   });
  //}

  // 投稿時の処理
  uploadPost = async ({ url, shopName, text, category, prefecture, postIndex }) => {
    const uploadRef = await this.postCollection.doc(postIndex);
    uploadRef
      .set({
        imgUrl: url,
        shopName,
        text,
        category,
        prefecture,
        postIndex,
        itemHide: "false",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  // 投稿の削除
  deletePost = async ({ postIndex }) => {
    const deleteRef = await this.postCollection.doc(postIndex);
    deleteRef
      .delete()
  }

  // Firestoreに保存したユーザー情報を取得
  getUserInfo = async () => {
    const querySnapshot = await this.userInfoCollection.get();
    const res = [];
    querySnapshot.forEach(doc => {
      res.push(doc.data());
    });
    return res;
  };

  // Firestoreに保存した投稿情報を取得
  getPosts = async () => {
    const querySnapshot = await this.postCollection.get();
    const res = [];
    querySnapshot.forEach(postDoc => {
      res.push(postDoc.data());
      // console.log(postDoc.id, ' => ', JSON.stringify(postDoc.data()));
    });
    return res;
  };

  // お住まいの県の全ての投稿を取得
  getAllPosts = async () => {
    const querySnapshot = await this.allPosts.get();
    const res = [];
    querySnapshot.forEach(postDoc => {
      res.push(postDoc.data());
      // console.log(postDoc.id, ' => ', JSON.stringify(postDoc.data()));
    });
    return res;
  };

  get userCollection() {
    return firebase.firestore().collection('users');
  }
  get userInfoCollection() {
    return this.userCollection.doc(this.uid).collection('userInfo');
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