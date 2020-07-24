let searchform = document.getElementById('searchform');
let searchInput = document.getElementById('searchInput');
let sumUsers = document.getElementById('sumUsers');
let list = document.getElementById('list');
let sumMaleUsers = document.getElementById('sumMaleUsers');
let sumFemaleUsers = document.getElementById('sumFemaleUsers');
let sumAges = document.getElementById('sumAges');
let avarageAges = document.getElementById('avarageAges');

let users = [];
let filteredUsers = [];

window.addEventListener('load', () => {
  fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((element) => {
        users.push({
          gender: element.gender,
          name: element.name.first + ' ' + element.name.last,
          age: element.dob.age,
          picture: element.picture.thumbnail,
        });
      });
      filteredUsers = users;
      renderUsers(filteredUsers);
    });
});

let renderUsers = (filteredUsers) => {
  sumUsers.innerHTML = filteredUsers.length;
  let agesSum = 0;
  list.innerHTML = '';
  sumMaleUsers.innerHTML = 0;
  sumFemaleUsers.innerHTML = 0;

  filteredUsers.forEach((element) => {
    listItem = `<li><img src="${element.picture}"/><p>${element.name}, ${element.age} anos </p></li>`;
    list.innerHTML = list.innerHTML + listItem;

    if (element.gender == 'male') {
      sumMaleUsers.innerHTML++;
    } else {
      sumFemaleUsers.innerHTML++;
    }

    agesSum = agesSum + parseInt(element.age);
  });

  sumAges.innerHTML = agesSum;
  avarageAges.innerHTML = agesSum / filteredUsers.length;
};

let filterUsers = (evt) => {
  evt.preventDefault();
  filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderUsers(filteredUsers);
};

searchform.addEventListener('submit', filterUsers);
