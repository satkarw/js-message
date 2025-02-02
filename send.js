const { IgApiClient } = require('instagram-private-api');


async function sendMessage() {
  const ig = new IgApiClient();

  const username = "enter your user name"; // Set these in a .env file
  const password ="enter your password here";

  try {
    console.log('Logging in...');
    await ig.state.generateDevice(username);
    await ig.account.login(username, password);
    console.log('Logged in successfully!');

    const userId = await getUserId(ig, 'the_rishavadhikari'); // Pass the authenticated instance
    const thread = await ig.entity.directThread([userId]);

    const message = 'lado';

    // Loop to send the message once
    let count = 50;
    while (count > 0) {
      await thread.broadcastText(message);
      console.log('Message sent successfully!');
      count -= 1;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getUserId(ig, username) {
  const users = await ig.user.searchExact(username);
  return users.pk; // Correct way to access the user ID
}

sendMessage();
