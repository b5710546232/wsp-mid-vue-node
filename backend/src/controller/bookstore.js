import mongoose from 'mongoose'
import {Router} from 'express'
import BookStore from '../model/bookstore'

export default({config,db})=>{
  const api = Router()

  // 'v1/bookstore/add'
  api.post('/add',(req,res)=>{
    let newBookStore = new BookStore()
    newBookStore.book_id = req.body.book_id
    newBookStore.isbn = req.body.isbn
    newBookStore.book_name = req.body.book_name
    newBookStore.price = req.body.price
    newBookStore.author = req.body.author
    newBookStore.save(err=>{
      if(err){
        res.send(err)
      }
      res.json({"message":"create successfully"})
    })
  })
  // 'v1/bookstore'
  api.get('/',(req,res)=>{
    BookStore.find({},(err,bookstore)=>{
      if(err){
        res.send(err)
      }
      res.json(bookstore)
    })
  })

  api.put('/:id',(req,res)=>{
    BookStore.findById(req.params.id,(err,bookstore)=>{
      console.log('req',req.body);
      if(err){
        res.send(err)
      }
      bookstore.book_id = req.body.book_id
      bookstore.isbn = req.body.isbn
      bookstore.book_name = req.body.book_name
      bookstore.price = req.body.price
      bookstore.author = req.body.author
      console.log(bookstore);
      bookstore.save(err=>{
        if(err){
          res.send(err)
        }
        res.json({"message":"info updated"})
      })
    })
  })

  api.delete('/:id',(req,res)=>{
  BookStore.remove({_id:req.params.id}
    ,(err,bookstore)=>{
      if(err){
        res.send(err)
      }
      res.json({"message":"delete successfully"})
    })
  })

  return api
}
