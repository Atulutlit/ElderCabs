
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const useMail = () => {
    const mailFunc = async (path, mailData) => {
        const res = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            body: JSON.stringify(mailData),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${API_KEY}`
            }
        });

        return await res.json();
    }
    return [mailFunc];
}

export default useMail;