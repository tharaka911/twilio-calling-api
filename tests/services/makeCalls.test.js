require('dotenv').config();
const axios = require('axios');
const makeCall = require('../../src/services/makeCalls');
const logger = require('../../src/config/logger');

jest.mock('axios');
jest.mock('../../src/config/logger');

describe('makeCall', () => {
    it('should log success message on successful API call', async () => {
        const responseData = { data: 'success' };
        axios.post.mockResolvedValue({ data: responseData });

        await makeCall('+94702294400');

        expect(logger.info).toHaveBeenCalledWith('API call successful', responseData);
    });

    it('should log error message on failed API call', async () => {
        const error = new Error('API call failed');
        axios.post.mockRejectedValue(error);

        await makeCall('+94702294400');

        expect(logger.error).toHaveBeenCalledWith('API call failed', error);
    });
});