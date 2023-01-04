# anagram_api

Anagram API RESTful Node.js based Multilingual (English, Italian and Spanish) is a free, open source anagram api to get all anagrams from a word or a  group of letter. The search id done on dictionaries on sqlite3 db. Api is superfast and extensible with another language.

## API Reference

- [Languages](#Languages)  
- [Anagram](#Anagram)  
- [Error Managment](#Error-Managment)


<hr/>

## Languages

```HTTP
GET /languages
```

Return all languages managed.  

**Body**

None  

**Response**  

```ts
{
    languages: array<String>
}
```
**Examples**

`http://localhost:35907/languages`

```
Response :  

{
	"languages": ["it",
	              "en",
		      "es"]
}

```

<hr/>

## Anagram

**Body**

```
{
	languages: string,
	word: string
}

```  

**Response**  

```ts
{
    language: string,
    word: string,
    anagrams: array<String>

}
```
**Examples**

`http://localhost:35907/anagram`

```
Body : 

{
	"languages": "en",
	"word": "AEKST"
}

``` 
```
Response :

{
	"language":"en",
	"word":"AEKST",
	"anagrams":["KEATS",
	            "SKATE",
		    "STAKE",
		    "STEAK",
		    "TAKES"]
}
```

<hr/>

## Error Managment

**Error Response**  
```ts
{
    // Language code
    error: number,
    // Description error
    description: string
}
```    

## DB Reference  

Dictionaries are loaded on sqlite3 DB in a single table named dictionaries :  

| Column Name     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| id | `Integer`    | Incremental key | Yes | 
| word | `text`    | String in uppercase format represent the word | Yes | 
| language | `text`    | Language code [en, es or it] | Yes | 
| length | `integer`    | Word number of characters | Yes | 
| word_code | `text`    | Word index generated with the sum of integer value of each unicode character of the word | Yes | 

### Prerequisites  

* Node v19.3.0 or upper
* npm  v9.2.0 or upper

### Built With  
* [Visual Code Editor](https://code.visualstudio.com)  

### NPM Modules
npm install  

### Run
npm start

### Authors  

* **Giovanni Palleschi** - [gpalleschi](https://github.com/gpalleschi)  


### License

This project is licensed under the GNU GENERAL PUBLIC LICENSE 3.0 License - see the [LICENSE](LICENSE) file for details 
