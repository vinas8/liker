const googleDatabase = [
  'cast.com',
  'souprecipies.com',
  'tavamama.com',
  'castas.com',
  'cataclysm.com',
  'cacaca.com',
  'miau.lt',
  'fakeee',
  'mockMeee'
];


const googleSearch = (searchInput, db) => {
  const matches = db.filter(website => {
    return website.includes(searchInput)
  });

  return (matches.length > 3) ? matches.slice(0, 3) : matches
}

// console.log(googleSearch('ca', googleDatabase));

module.exports = googleSearch