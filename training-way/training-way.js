const person = {
  name: 'Amin',

  introduce(age, city) {
    console.log(`I am ${this.name}, ${age}, from ${city}.`);

    function call(OtherObject, age, city) {
      console.log(`I am ${OtherObject.name}, ${age}, from ${city}.`);
    }
  },
};

const introduceOtherPerson = {
  name: 'Sara',
};

person.introduce(20, 'Frankfurt');

person.introduce.call(introduceOtherPerson, 22, 'Berlin');

const saraIntroduce = person.introduce.bind(introduceOtherPerson);

saraIntroduce(22, 'Berlin');
