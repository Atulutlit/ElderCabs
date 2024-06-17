import instance from './config';

const settingsApi = {
    update: (adminId, data) => instance.put(`/admin/updateCab/${adminId}`, data),
    updateConditions: (adminId, data) => instance.put(`/admin/termsAndConditions/${adminId}`, data),
    updateSurgeDates: (adminId, data) => instance.put(`/admin/surgeDates/${adminId}`, data),
};

export default settingsApi;