<template lang="html">
<div class="container">
  <div class="book-from">
    <form action="submit">
        <input class="input" type="text" v-model="book_id" placeholder="Insert book id" ref = "book_id">
        <input class="input" type="text" v-model="isbn" placeholder="Insert ISBN">
        <input class="input" type="text" v-model="book_name" placeholder="Insert book name">
        <input class="input" type="text" v-model="price" placeholder="Insert price">
        <input class="input" type="text" v-model="author" placeholder="Insert author">
        <button class="my-button button " @click="addBook(book_id,isbn,book_name,price,author)" >insert</button>
    </form>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>book_id</th>
        <th>isbn</th>
        <th>book_name</th>
        <th>price</th>
        <th>author</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books">
      <td><input type="text" placeholder="book_id"  v-model="book.book_id" v-bind:value="book.book_id"></td>
      <td><input type="text" placeholder="isbn" v-model="book.isbn"  v-bind:value="book.isbn"></td>
      <td><input type="text" placeholder="book_name" v-model="book.book_name"  v-bind:value="book.book_name"></td>
      <td><input type="text" placeholder="price" v-model="book.price" v-bind:value="book.price"></td>
      <td><input type="text" placeholder="author" v-model="book.author" v-bind:value="book.author"></td>
      <td><button @click="updateBook(book._id,book.book_id,book.isbn,book.book_name,book.price,book.author)">update</button></td>
      <td><button @click="deleteBook(book._id)">delete</button></td>
      </tr>
      </div>
    </tbody>
  </table>
</div>
</template>

<script>
const API = 'http://localhost:3005/v1/'
const BOOKSTORE_ENDPOINT = API +'bookstore/'
export default {
  data () {
    return {
      books:[]
    }
  },
  computed: {},
  mounted () {
    this.loadBook()
  },
  methods: {
    updateBook(_id,book_id,isbn,book_name,price,author){
      let data = {book_id,isbn,book_name,price,author}
      console.log(data);
      this.axios.put(BOOKSTORE_ENDPOINT+_id+'/',{book_id,isbn,book_name,price,author})
      .then((response) => {
        console.log(response)
        this.loadBook()

      }).catch((error) =>{
        console.log(error);
      })
    },
    addBook(book_id,isbn,book_name,price,author){
      event.preventDefault()
      let data = {book_id,isbn,book_name,price,author}
      this.axios.post(BOOKSTORE_ENDPOINT+'add/',data)
      .then((response) => {
        console.log(response.data)
        this.loadBook()
      }).catch((error) =>{
        console.log(error);
      })
    console.log('add');
    },
    deleteBook(_id){
      this.axios.delete(BOOKSTORE_ENDPOINT+_id+'/')
      .then((response) => {
        console.log(response)
        this.loadBook()

      }).catch((error) =>{
        console.log(error);
      })
    },
    loadBook(){
      this.axios.get(BOOKSTORE_ENDPOINT)
      .then((response) => {
        console.log(response.data)
        this.books = response.data
      }).catch((error) =>{
        console.log(error);
      })
    }
  },
  components: {}
}
</script>

<style scoped>
.table{
  margin: 1%;
}
.book-from{
  margin: 2%;
}
.book-from .button{
  align-items: center;
}
.input{
  margin-bottom: 1%;
}
</style>
