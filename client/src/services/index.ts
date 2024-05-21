export const Services = {
    auth: {
        signUp: 'createUser',
        signIn: '',
        signOut: '',
    },
    user: {
        getById: '',
        updateById: '',
    },
    dog: {
        getAll: 'dogs',
        getById: 'dog/:id',
    }
} as const