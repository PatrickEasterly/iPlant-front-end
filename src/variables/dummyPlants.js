const dummyPlants = [
  {
    id: 1,
    room: 'Kitchen',
    name: 'Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 2,
    room: 'Hall',
    name: 'Not Aloee',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 3,
    room: 'Kitchen',
    name: 'Not Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 4,
    room: 'LivingRoom',
    name: 'Not Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 5,
    room: 'LivingRoom',
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 6,
    room: 'Bedroom',
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 7,
    room: 'Bedroom',
    name: 'Not Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 8,
    room: 'Bedroom',
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 9,
    room: 'Bathroom',
    name: 'Not Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
]
export default dummyPlants;



// userid =>

// given a userid, it returns an object like 
// {
//   userid: 1,
//   plants: [
//     {
//       plantid: {
//         plantinfo: {
//         ...plantinfo[plantid]
//         },
//         roominfo: {
//           ...theRoomItsIn
//         },
//         waters: {
//           ...waters[plantid]
//         }
//       }
//     }
//   ]
// }