import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const pageSize = 4;

const endpoints = {
    allRecords: '/data/memes?sortBy=_createdOn%20desc',
    // allRecordsCount: '/data/catalog?',
    recordById: '/data/memes/',
    recordsOfUser: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    // productsOfUserCount: (userId) =>  `/data/catalog/?where=_ownerId%3D%22${userId}%22`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/memes/'
};

// async function getPagesCount(search) {
//     let url = endpoints.allRecordsCount;
//
//     if (search) {
//         url += 'where=' + encodeURIComponent(`make LIKE "${search}"`) + '&count';
//     } else {
//         url += 'count';
//     }
//
//     return api.get(url);
// }

async function getAllRecords() {
    let url = endpoints.allRecords;

    return api.get(url);
}

// async function getPagesCountOfUserProducts(id, search) {
//     let url = endpoints.productsOfUserCount(id);
//
//     if (search) {
//         url += '&where=' + encodeURIComponent(`make LIKE "${search}"`) + '&count';
//     } else {
//         url += '&count';
//     }
//
//     return api.get(url);
// }

async function getAllRecordsOfUserId(id) {
    return api.get(endpoints.recordsOfUser(id));
}

async function getRecordById(id) {
    return api.get(endpoints.recordById + id);
}

async function createRecord(data) {
    return api.post(endpoints.create, data);
}

async function editRecordById(id, data) {
    return api.put(endpoints.edit + id, data);
}

async function deleteRecordById(id) {
    return api.del(endpoints.delete + id);
}

export {
    login,
    register,
    logout,
    getRecordById,
    getAllRecords,
    createRecord,
    editRecordById,
    deleteRecordById,
    getAllRecordsOfUserId,
    // getPagesCount,
    // getPagesCountOfUserProducts,
    pageSize
}