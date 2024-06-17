export const Images = () => {
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => {
            images[item.replace('./', '').split('.')[0]] = r(item);
        });
        return images
    }
    const images = importAll(require.context('../../assets/img/slide', false, /\.(webp)$/));
    return images;
}