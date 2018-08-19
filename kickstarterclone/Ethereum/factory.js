import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xAee5dAcA749324b913bEf667Cfe56FfFc98626De'
);

export default instance;