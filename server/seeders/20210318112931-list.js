'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const question = [
      {
        exercise: "Kota ini identik dengan menara eiffel?",
        answer: "PARIS",
        imageUrl: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/06/10/3042012612.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Ibukota negara yang identik dengan bunga sakura?",
        answer: "TOKYO",
        imageUrl: "https://www.dmarge.com/wp-content/uploads/2013/10/shinjuku_at_night_tokyo_japan.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota yang terkenal dengan menara pisa?",
        answer: "ROMA",
        imageUrl: "https://i.imgur.com/YDxg8JQ.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota yang identik dengan kota pahlawan di Indonesia?",
        answer: "SURABAYA",
        imageUrl: "https://akcdn.detik.net.id/visual/2020/03/05/d0f9cc37-e766-444e-b25a-f5d7babf84dd_169.jpeg?w=700&q=90",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota yang menjadi ibukota spanyol?",
        answer: "MADRID",
        imageUrl: "https://www.pes-patch.com/wp-content/uploads/2017/08/Santiago-Bernabeu-StartScreens-By-White-Demon-For-PES2017.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota ini identik dengan klub chelsea?",
        answer: "LONDON",
        imageUrl: "https://unsplash.com/photos/iXqTqC-f6jI",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota ini identik dengan makanan gudeg?",
        answer: "JOGJA",
        imageUrl: "https://wisatasejarah.files.wordpress.com/2012/06/gudeg.jpg?w=300&h=214",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Space needle ada di negara bagian mana di US?",
        answer: "SEATTLE",
        imageUrl: "https://img.sumytourism.com/img/trips/1582/14-top-rated-tourist-attractions-seattle-min.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota yang terkenal dengan soto dan masjid Kubanya?",
        answer: "MAKASAR",
        imageUrl: "https://i.imgur.com/TNeSTyT.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: "Kota terdinging di dunia?",
        answer: "YAKUTS",
        imageUrl: "https://blogpictures.99.co/kota-terdingin-dunia-yakuts.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('Questions', question, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
