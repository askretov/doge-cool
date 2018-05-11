module.exports = (bot, blockIo) => {

  const getAddresses = (...args) => new Promise((resolve, reject) => {
    blockIo.get_my_addresses_without_balances(...args, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    })
  });

  const getNewAddress = (...args) => new Promise((resolve, reject) => {
    blockIo.get_new_address(...args, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });

  const createAddresses = async () => {
    const addressesResponse = await getAddresses({});
    const addresses = addressesResponse.data.addresses;
    console.log('addr', addresses);

    // const {members} = await bot.getAllUserList(); 
    const {members} = await bot.getAllConversationMembers('GANB38LD8');
    console.log('members', members);

    const existingLabels = addresses.map(a => a.label);

    const addresslessMembers = members.filter(m => !existingLabels.includes(m/*.id*/));

    console.log('noaddr', addresslessMembers);

    return Promise.all(addresslessMembers.map(m => getNewAddress({label: m/*.id*/})));
  };

  return createAddresses;
};
