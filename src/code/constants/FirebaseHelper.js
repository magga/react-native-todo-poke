import firebase from 'firebase';

export const FirebaseSignup = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export const FirebaseLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export const FirebaseLogout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export const FirebaseSetData = (path, value) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(path).set(value)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export const FirebaseDeleteData = (path) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(path).remove()
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};
