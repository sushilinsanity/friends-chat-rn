export default {
  id: '1',
  users: [{
    id: 'u1',
    name: 'Vadim',
    imageUri: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102',
  }, {
    id: 'u2',
    name: 'Robert',
    imageUri: 'https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2020/05/19/file78t1uwxtc48ldc0s1z6-1879176103-1578811466.jpg?itok=e6uJpSj3',
  }],
  messages: [{
    id: 'm1',
    content: 'How are you, Robert!',
    createdAt: '2020-10-10T12:48:00.000Z',
    user: {
      id: 'u1',
      name: 'Vadim',
    },
  }, {
    id: 'm2',
    content: 'I am good, good',
    createdAt: '2020-10-03T14:49:00.000Z',
    user: {
      id: 'u2',
      name: 'Robert',
    },
  }, {
    id: 'm3',
    content: 'What about you?',
    createdAt: '2020-10-03T14:49:40.000Z',
    user: {
      id: 'u2',
      name: 'Robert',
    },
  }, {
    id: 'm4',
    content: 'Good as well, preparing for the stream now.',
    createdAt: '2020-10-03T14:50:00.000Z',
    user: {
      id: 'u1',
      name: 'Vadim',
    },
  }, {
    id: 'm5',
    content: 'How is your uni going?',
    createdAt: '2020-10-03T14:51:00.000Z',
    user: {
      id: 'u1',
      name: 'Vadim',
    },
  }, {
    id: 'm6',
    content: 'It is a bit tough, as I have 2 specializations. How about yours? Do you enjoy it?',
    createdAt: '2020-10-03T14:49:00.000Z',
    user: {
      id: 'u2',
      name: 'Robert',
    },
  }, {
    id: 'm7',
    content: 'Big Data is really interesting. Cannot wait to go through all the material.',
    createdAt: '2020-10-03T14:53:00.000Z',
    user: {
      id: 'u1',
      name: 'Vadim',
    },
  }]
}
