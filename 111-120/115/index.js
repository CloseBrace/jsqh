const filterUsers = (users, filter) => {
  const filteredUsers = users.filter(user => {
    switch (filter) {
      case 'name':
        return user.name;
      case 'age':
        return user.age;
      case 'email':
        return user.email;
      default:
        return true;
    }
  });
  return filteredUsers;
}

module.exports = filterUsers;
