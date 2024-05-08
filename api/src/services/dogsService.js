export const DogsService = (dao) => ({
    getAll: async () => await dao.getAll(),
    getById: async () => await dao.getById(),
    post: async () => await dao.post(),
    put: async () => await dao.put(),
    delete: async () => await dao.delete()
})