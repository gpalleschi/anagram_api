const express = require('express');
const cors = require('cors');
const pjson = require('./package.json');
const { Sequelize, DataTypes } = require('sequelize');

const Constants = require('./controllers/constants');
const { getAnagrams, checkBody } = require('./controllers/utility');

// App definition
const app = express();
// To read body correctly 
app.use(express.json());
// Access Permission between client and server
app.use(cors());

// Access DB
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/dictionaries.db',
  logging: false
});

const Dictionary = sequelize.define('Dictionary', {
  // Model attributes are defined here
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  length: {
    type: DataTypes.INTEGER,	
  },
  word_code: {
    type: DataTypes.INTEGER,	
  }
}, {
     sequelize, // We need to pass the connection instance
     modelName: 'Dictionary', // We need to choose the model name
     timestamps: false
  // Other model options go here
});

const port=process.env.PORT || Constants.DEFAULT_PORT;

app.get('/',(req,res)=>{
	res.send('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port);
})

// Return all languages managed
app.get('/languages',(req,res)=>{
	res.send({'languages' : Constants.LANGUAGES});
})

app.get('/anagram', async (req,res)=>{
  const { language, word } = req.body;
  const ret = checkBody(language.toLowerCase(), word);
  if ( ret.error === null ) {
     const anagrams = await getAnagrams(Dictionary, word.toUpperCase(), language.toLowerCase());
     if ( anagrams.hasOwnProperty('error') ) {
       res.status(400).json(anagrams);
     } else {
       res.status(200).json(anagrams);
     }
  } else {
     res.status(400).json(ret.error);
  }
})

console.log('Starting Server ...... ');

app.listen(port, async () => {
	console.log('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port);
  // For test only
	// const word_to_work = 'insperato';
  // getAnagrams(Dictionary, word_to_work.toUpperCase(), 'it');
});
