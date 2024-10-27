// userModel.js
const addUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addUser, getUsers };
