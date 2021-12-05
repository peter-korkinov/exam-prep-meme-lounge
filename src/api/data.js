import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const pageSize = 4;

const endpoints = {
    allRecords: '/data/memes?sortBy=_createdOn%20desc',
    allRecordsCount: '/data/catalog?',
    recordById: '/data/memes/',
    productsOfUser: (userId) => `/data/catalog/?where=_ownerId%3D%22${userId}%22&pageSize=4&offset=`,
    productsOfUserCount: (userId) =>  `/data/catalog/?where=_ownerId%3D%22${userId}%22`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/catalog/'
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

// async function getAllProductsOfUserId(page, id, search) {
//     let url = endpoints.productsOfUser(id) + (page - 1) * pageSize
//
//     if (search) {
//         url += '&where=' + encodeURIComponent(`make LIKE "${search}"`);
//     }
//
//     return api.get(url);
// }

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
    // getAllProductsOfUserId,
    // getPagesCount,
    // getPagesCountOfUserProducts,
    pageSize
}