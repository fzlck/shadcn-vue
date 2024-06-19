import router from "."

const navigate = {
    profil: () => {
        router.push('/profil');
    },
    orders: () => {
        router.push('/');
    },
    order: (id: any) => {
        router.push(`/details/${id}`);
    },
    settings: () => {
        router.push('/settings');
    }
}
export default navigate;